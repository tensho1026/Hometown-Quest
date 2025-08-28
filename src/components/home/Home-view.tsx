"use client";

import { useEffect, useState } from "react";
import { dailyQuestType } from "@/types/todayQuest";
import { useUser } from "@clerk/nextjs";
import { getTodayQuests } from "@/app/actions/getTodayQuests/getTodayQuests";
import { getMyHomeTownImage } from "@/app/actions/homeTownImage/getMyHomeTown";
import HomeHeader from "./HomeHeader";
import HomeTownImage from "./HomeTownImage";
import { QuestList } from "./QuestList";

export function HomeView() {
  const [dailyQuests, setDailyQuests] = useState<dailyQuestType[]>([]);
  const [hometownImage, setMyHometownImage] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <HomeHeader />
      <div className="flex-1 overflow-y-auto pb-20">
        <HomeTownImage user={user} currentImage={hometownImage} />

        <div className="p-4 space-y-6">
          {/* Daily Quests */}
          <QuestList
            title="今日のクエスト"
            badgeText="毎日更新"
            quests={dailyQuests}
            type="daily"
            
          />

          {/* 未完成なためコメントアウト */}
          {/* Weekly Quests */}
          {/* <QuestList
            title="今週のチャレンジ"
            badgeText="週替わり"
            quests={weeklyQuests as any[]}
            type="weekly"
          /> */}

          {/* 未完成なためコメントアウト */}
          {/* <TodaysRecord /> */}
        </div>
      </div>
    </div>
  );
}
