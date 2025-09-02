"use client";
import HomeHeader from "./HomeHeader";
import HomeTownImage from "./HomeTownImage";
import { QuestList } from "./QuestList";
import { SaveUser } from "@/hooks/home/saveUser";
import { useFetchHomeData } from "@/hooks/home/fetchHomeData";
import { Toaster } from "react-hot-toast";

export function HomeView() {
  SaveUser();
  const { dailyQuests, hometownImage } = useFetchHomeData();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Toaster position="top-center" />

      <HomeHeader />
      <div className="flex-1 overflow-y-auto pb-20">
        <HomeTownImage currentImage={hometownImage} />

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
