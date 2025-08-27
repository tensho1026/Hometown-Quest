"use server";

import { prisma } from "@/lib/prisma";



export const saveUserToDatabase = async (user: {
  id: string;
  username: string | null;
  imageUrl: string | null;
}) => {
  // 既存ユーザーの確認
  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (existingUser) {
    // 既存ユーザーの場合は、カスタムプロフィールを保護
    // usernameやmyselfが設定されている場合は上書きしない
    const shouldUpdateUsername =
      !existingUser.username || existingUser.username === user.username;
    const shouldUpdateImageUrl =
      !existingUser.imageUrl || existingUser.imageUrl === user.imageUrl;

    if (shouldUpdateUsername || shouldUpdateImageUrl) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(shouldUpdateUsername && { username: user.username }),
          ...(shouldUpdateImageUrl && { imageUrl: user.imageUrl }),
          updatedAt: new Date(),
        },
      });
    }
  } else {
    // 新規ユーザーの場合は、Clerkの情報で作成
    await prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        imageUrl: user.imageUrl,
      },
    });
  }
};