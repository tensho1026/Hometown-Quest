"use server";

import { prisma } from "@/lib/prisma";
import { supabaseServer } from "@/supabase/supabase.config";

export const changeMyHomeTownImage = async (formData: FormData) => {
  try {
    const userId = formData.get("userId") as string;
    const file = formData.get("image") as File;

    if (!userId || !file) {
      throw new Error("userIdまたは画像ファイルがありません。");
    }

    // ファイルサイズチェック（5MB制限）
    if (file.size > 5 * 1024 * 1024) {
      throw new Error(
        "ファイルサイズが大きすぎます。5MB以下のファイルを選択してください。"
      );
    }

    // ファイル形式チェック
    if (!file.type.startsWith("image/")) {
      throw new Error("画像ファイルを選択してください。");
    }

    // ユニークなファイル名を生成（タイムスタンプ付き）
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const uniqueFileName = `${timestamp}.${fileExtension}`;

    // 0. バケットが公開設定になっているか確認・修正
    try {
      const { data: updateData, error: updateError } =
        await supabaseServer.storage.updateBucket("myHomeTown", {
          public: true,
        });
      if (updateError) {
        console.warn("Failed to update bucket to public:", updateError);
      }
    } catch (bucketError) {
      console.warn("Bucket update error:", bucketError);
    }

    // 1. 既存ファイルがある場合は削除
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (existingUser?.myHometown) {
      try {
        // 既存の画像URLからファイルパスを抽出して削除
        const url = new URL(existingUser.myHometown);
        const pathParts = url.pathname.split("/");
        const oldFilePath = pathParts
          .slice(pathParts.indexOf("myHomeTown") + 1)
          .join("/");

        if (oldFilePath) {
          await supabaseServer.storage.from("myHomeTown").remove([oldFilePath]);
        }
      } catch (removeError) {
        console.warn(
          "既存ファイルの削除に失敗しましたが、処理を続行します:",
          removeError
        );
      }
    }

    // 2. 新しい画像ファイルをSupabase Storageにアップロード
    const { data, error } = await supabaseServer.storage
      .from("myHomeTown")
      .upload(`${userId}/${uniqueFileName}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw new Error(`画像のアップロードに失敗しました: ${error.message}`);
    }

    // 3. アップロードした画像の公開URLを取得
    const { data: publicUrlData } = supabaseServer.storage
      .from("myHomeTown")
      .getPublicUrl(data.path);

    // 4. ユーザーのデータベースレコードにURLを保存
    await prisma.user.upsert({
      where: {
        id: userId,
      },
      update: {
        myHometown: publicUrlData.publicUrl,
      },
      create: {
        id: userId,
        myHometown: publicUrlData.publicUrl,
      },
    });
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("changeMyHomeTownImage error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "画像のアップロードに失敗しました。"
    );
  }
};
