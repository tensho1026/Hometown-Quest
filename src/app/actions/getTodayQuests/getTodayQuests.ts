"use server";

import { prisma } from "@/lib/prisma";

export const getTodayQuests = async (userId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 既存のクエストを検索
  const existingQuests = await prisma.quest.findMany({
    where: {
      assignedDate: {
        gte: today,
      },
      userId: userId,
      mstTodaysQuestId: {
        not: null,
      },
    },
    include: {
      mstTodaysQuest: true,
    },
  });

  // 既存のクエストがあれば、idをstringに変換して返す
  if (existingQuests.length > 0) {
    return existingQuests.map((quest) => ({
      isCompleted: quest.isCompleted,
      ...quest.mstTodaysQuest,
      id: String(quest.mstTodaysQuest?.id),
    }));
  } else {
    const allTodaysQuests = await prisma.mstTodaysQuest.findMany();
    if (allTodaysQuests.length === 0) {
      return [];
    }
    const randomFive = allTodaysQuests
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    await prisma.$transaction(
      randomFive.map((quest) =>
        prisma.quest.create({
          data: {
            userId: userId,
            isCompleted: false,
            mstTodaysQuestId: quest.id,
          },
        })
      )
    );

    // 新しく作成したクエストのidをstringに変換して返す
    return randomFive.map((quest) => ({
      isCompleted: false,
      id: String(quest.id),
    }));
  }

  // 既存のクエストがなければ、新規に作成して返す
};
