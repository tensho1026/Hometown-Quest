'use client'

import { getTodayQuestById } from "@/app/actions/getTodayQuestBuId/getTodayQuestById";
import { dailyQuestType } from "@/types/todayQuest";
import { useEffect, useState } from "react";

export const useFetchDetail = (questId:number | null) => {
    const [quest, setQuest] = useState<dailyQuestType | null>();
     useEffect(() => {
        if (questId) {
          const getQuestFunction = async () => {
            const questDetail = await getTodayQuestById(questId);
            if (questDetail) {
              // idをnumberからstringに変換
              const questWithStringId = {
                ...questDetail,
                id: String(questDetail.id),
              };
              setQuest(questWithStringId);
            }
          };
          getQuestFunction();
        }
      }, []);

      return quest
    
}