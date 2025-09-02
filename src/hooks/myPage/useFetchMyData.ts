"use client";

import { getCompletedQuests } from "@/app/actions/getMypPageInfo/getQuest";
import { completedQuestType } from "@/types/todayQuest";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useFetchMyData = () => {
  const [quests, setQuests] = useState<completedQuestType[]>([]);
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (user && isLoaded) {
      const fetchQuestData = async () => {
        const questsData = await getCompletedQuests(user?.id);
        setQuests(questsData);
      };
      fetchQuestData();
    }
  }, [user, isLoaded]);

  const totalPoints = quests.reduce((sum, quest) => {
    return sum + (quest.point ?? 0);
  }, 0);

  return {quests,totalPoints};
};
