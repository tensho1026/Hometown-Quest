"use server";

import { prisma } from "@/lib/prisma";

export const getOneQuest = async () => {
  try {
    const quest = await prisma.mstTodaysQuest.findFirst({
      include: {
        assignedTo: true,
      },
    });
    return quest;
  } catch (error) {
    console.error("データ取得エラー:", error);
    return null;
  }
};
