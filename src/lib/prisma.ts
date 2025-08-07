// src/lib/prisma.ts
// lib/prisma.ts
import { PrismaClient } from "@/generated/prisma"; // ← @prisma/client ではない

// グローバル変数にキャッシュして多重생성を防ぐ（開発中のホットリロード対策）
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// すでに存在するならそれを使う。なければ新しく作る
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
