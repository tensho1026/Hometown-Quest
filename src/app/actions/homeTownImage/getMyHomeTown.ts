"use server";

import { prisma } from "@/lib/prisma";

export const getMyHomeTownImage = async (userId:string) => {
  const myHomeTown = await prisma.user.findFirst({
    where:{
      id:userId
    },
  })
  return myHomeTown?.myHometown
}