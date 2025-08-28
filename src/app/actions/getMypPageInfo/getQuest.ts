'use server'
import { prisma } from "@/lib/prisma";

export const getCompletedQuests = async (userId: string) => {
  const completedQuests = await prisma.quest.findMany({
    where: {
      userId: userId,
      isCompleted: true,
    },
    include:{
      mstTodaysQuest:true
    }
  });
return completedQuests.map(quest => ({
    ...quest.mstTodaysQuest, // 💡 mstTodaysQuestのプロパティをトップレベルに展開
    ...quest, // 💡 questテーブルのプロパティを上書き
    id: quest.id, // 💡 IDはquestテーブルのIDを使用

    assignedDate: quest.assignedDate.toISOString(), 
  }));
};
