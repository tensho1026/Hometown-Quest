"use server";

export const runtime = "nodejs"; // ← Prismaを確実にNodeで

import { prisma } from "@/lib/prisma";

type Input = {
  id: string;
  username: string | null;
  imageUrl: string | null;
};

export async function saveUserToDatabase(user: Input) {
  // 失敗がわかった方が良いのでtry/catchでロギング
  try {
    // 1発で済む upsert に変更（既存のカスタム保護ロジックは維持）
    const existing = await prisma.user.findUnique({ where: { id: user.id } });

    if (existing) {
      const shouldUpdateUsername =
        !existing.username || existing.username === user.username;
      const shouldUpdateImageUrl =
        !existing.imageUrl || existing.imageUrl === user.imageUrl;

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
      return { ok: true, created: false };
    }

    await prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        imageUrl: user.imageUrl,
      },
    });

    return { ok: true, created: true };
  } catch (e) {
    console.error("[saveUserToDatabase] error:", e);
    // エラーを飲み込むとデバッグ不能になるので投げ直す
    throw e;
  }
}
