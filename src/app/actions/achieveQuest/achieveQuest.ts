'use server'

import { prisma } from "@/lib/prisma"

export const achieveQuest = async (userId:string,questId:number) => {
  const today = new Date()
  today.setHours(0,0,0,0)

  const questToUpdate = await prisma.quest.findFirst({
    where:{
      mstTodaysQuestId:questId,
      assignedDate:{
        gte:today,
      },
      userId:userId
    },
  })
  if(!questToUpdate) {
    return
  }
  await prisma.quest.update({
    where:{
      id:questToUpdate.id,
    },
    data:{
      isCompleted:true
    }
  })
}