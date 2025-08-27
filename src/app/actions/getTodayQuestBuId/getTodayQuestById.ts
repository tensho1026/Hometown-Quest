'use server'
import { prisma } from "@/lib/prisma"

export const getTodayQuestById = async (questId:number) => {
  const todayQuest = await prisma.mstTodaysQuest.findFirst({
    where:{id:questId}
  })
  return todayQuest
}