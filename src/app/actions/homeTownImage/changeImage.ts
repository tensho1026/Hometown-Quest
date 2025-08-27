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
import { supabase } from "@/supabase/supabase.config";


export const changeMyHomeTownImage = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const file = formData.get("image") as File;

  if (!userId || !file) {
    throw new Error("userIdまたは画像ファイルがありません。");
  }

  // 1. 画像ファイルをSupabase Storageにアップロード
  const { data, error } = await supabase.storage
    .from("myHomeTown") 
    .upload(`${userId}/${file.name}`, file);

  if (error) {
    throw new Error("画像のアップロードに失敗しました。");
  }

  // 2. アップロードした画像の公開URLを取得
  const { data: publicUrlData } = supabase.storage
    .from("myHomeTown")
    .getPublicUrl(data.path);

  // 3. ユーザーのデータベースレコードにURLを保存
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
};
