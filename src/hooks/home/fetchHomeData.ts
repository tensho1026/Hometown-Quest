"use client";

import { getTodayQuests } from "@/app/actions/getTodayQuests/getTodayQuests";
import { getMyHomeTownImage } from "@/app/actions/homeTownImage/getMyHomeTown";
import { dailyQuestType } from "@/types/todayQuest";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useFetchHomeData = () => {
  const { user, isLoaded } = useUser();
  const [dailyQuests, setDailyQuests] = useState<dailyQuestType[]>([]);
  const [hometownImage, setMyHometownImage] = useState<string | null>(null);
  useEffect(() => {
    if (isLoaded && user) {
      const fetchHomeData = async () => {
        try {
          const dailyQuest = await getTodayQuests(user.id);
          const myhomeTown = await getMyHomeTownImage(user.id);
          setDailyQuests(dailyQuest);
          setMyHometownImage(myhomeTown ?? null);
        } catch (error) {
          console.error("データ取得エラー:", error);
          setMyHometownImage(null);
        }
      };

      fetchHomeData();
    }
  }, [isLoaded, user]);

  return { dailyQuests, hometownImage };
};
