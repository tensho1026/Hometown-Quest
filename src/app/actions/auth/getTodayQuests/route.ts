'use server'

import { prisma } from "@/lib/prisma"

export const getTodayQuests = async () => {
  const quests = await prisma.mstTodaysQuest.findMany()
  return quests
}