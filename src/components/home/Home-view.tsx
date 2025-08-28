"use client";

import { useEffect, useState } from "react";

import { dailyQuestType } from "@/types/todayQuest";
import { useUser } from "@clerk/nextjs";
import { getTodayQuests } from "@/app/actions/getTodayQuests/getTodayQuests";
import { getMyHomeTownImage } from "@/app/actions/homeTownImage/getMyHomeTown";
import HomeHeader from "./HomeHeader";
import HomeTownImage from "./HomeTownImage";
import TodaysRecord from "./TodaysRecord";
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

  const weeklyQuests = [
    {
      id: 4,
      title: "地元の新しいお店を発見",
      type: "探索",
      points: 100,
      difficulty: "普通",
      duration: "1時間",
      description: "まだ行ったことのない地元のお店を見つけて訪れてみよう",
      icon: "🏪",
      category: "exploration",
    },
    {
      id: 5,
      title: "地元の写真を3枚撮る",
      type: "記録",
      points: 80,
      difficulty: "普通",
      duration: "45分",
      description: "地元の素敵な風景や建物を3枚撮影しよう",
      icon: "📸",
      category: "photo",
    },
  ];

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

          {/* Weekly Quests */}
          <QuestList
            title="今週のチャレンジ"
            badgeText="週替わり"
            quests={weeklyQuests as any[]} // weeklyQuestsの型がdailyQuestTypeと異なるため、キャスト
            type="weekly"
          />
          <TodaysRecord />
        </div>
      </div>
    </div>
  );
}
