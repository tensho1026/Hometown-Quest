"use client";

import { getTodayQuestById } from "@/app/actions/getTodayQuestBuId/getTodayQuestById";
import { dailyQuestType } from "@/types/todayQuest";
import { useEffect, useState } from "react";

export const useFetchDetail = (questId: number | null) => {
  const [quest, setQuest] = useState<dailyQuestType | null>(null);

  useEffect(() => {
    if (questId == null) {
      setQuest(null);
      return;
    }

    const getQuestFunction = async () => {
      const questDetail = await getTodayQuestById(questId);
      if (!questDetail) {
        setQuest(null);
        return;
      }

      const questWithStringId = {
        ...questDetail,
        id: String(questDetail.id),
        isCompleted:
          questDetail.assignedTo?.some(
            (assignment) => assignment.isCompleted
          ) ?? false,
      };

      setQuest(questWithStringId);
    };

    getQuestFunction();
  }, [questId]);

  return quest;
};
