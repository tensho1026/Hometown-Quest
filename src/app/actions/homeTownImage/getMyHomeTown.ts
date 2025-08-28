"use server";

import { prisma } from "@/lib/prisma";

export const getMyHomeTownImage = async (userId: string) => {
  try {
    const myHomeTown = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        myHometown: true,
      },
    });

    // ユーザーが見つからなかった場合
    if (!myHomeTown) {
      return null;
    }

    // myHometownプロパティの値を確認して返す
    if (myHomeTown.myHometown) {
      return myHomeTown.myHometown;
    } else {
      return null;
    }
  } catch (error) {
    console.error("getMyHomeTownImageエラー:", error);
    // エラー時はnullを返す
    return null;
  }
};
