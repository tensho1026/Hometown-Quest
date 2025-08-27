// "use server";

// type changeImageProps = {
//   userId?: string;
//   imageUrl: string;
// };
// import { prisma } from "@/lib/prisma";
// export const changeMyHomeTownImage = async ({
//   userId,
//   imageUrl,
// }: changeImageProps) => {
//   if (typeof userId !== "string" || !imageUrl) {
//     throw new Error("userIdまたはimageUrlが不正です。");
//   }

//   await prisma.user.upsert({
//     where: {
//       id: userId,
//     },
//     update: {
//       myHometown: imageUrl,
//     },
//     create: {
//       id: userId,
//       myHometown: imageUrl,
//     },
//   });
// };
// app/actions/changeImage.ts
"use server";

import { prisma } from "@/lib/prisma";
import { supabaseServer } from "@/supabase/supabase.config";

export const changeMyHomeTownImage = async (formData: FormData) => {
  try {
    const userId = formData.get("userId") as string;
    const file = formData.get("image") as File;

    console.log("changeMyHomeTownImage called with:", {
      userId,
      fileName: file?.name,
      fileSize: file?.size,
    });

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

    console.log(`Uploading file: ${uniqueFileName} for user: ${userId}`);

    // 0. バケットが公開設定になっているか確認・修正
    try {
      const { data: updateData, error: updateError } =
        await supabaseServer.storage.updateBucket("myHomeTown", {
          public: true,
        });
      if (updateError) {
        console.warn("Failed to update bucket to public:", updateError);
      } else {
        console.log("Bucket set to public:", updateData);
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
          console.log(`Removed old file: ${oldFilePath}`);
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

    console.log("Upload successful:", data);

    // 3. アップロードした画像の公開URLを取得
    const { data: publicUrlData } = supabaseServer.storage
      .from("myHomeTown")
      .getPublicUrl(data.path);

    console.log("Public URL:", publicUrlData.publicUrl);

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

    console.log("Database updated successfully");

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
