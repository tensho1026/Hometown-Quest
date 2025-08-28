"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  User,
  Heart,
  Clock,
  Footprints,
  BookOpen,
} from "lucide-react";

import { dailyQuestType } from "@/types/todayQuest";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getTodayQuests } from "@/app/actions/getTodayQuests/getTodayQuests";
import { getMyHomeTownImage } from "@/app/actions/homeTownImage/getMyHomeTown";
import HomeHeader from "./HomeHeader";
import HomeTownImage from "./HomeTownImage";

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
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-bold text-gray-800">
                今日のクエスト
              </h3>
              <Badge className="bg-amber-100 text-amber-700">毎日更新</Badge>
            </div>
            <div className="space-y-3">
              {dailyQuests.map((quest) => (
                <Link href={`/QuestDetail/${quest.id}`} key={`daily-${quest.id}`}>
                  <Card
                    className="border-2 border-amber-200 shadow-lg bg-white/95 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                          {quest.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-800">
                              {quest.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className="border-amber-400 text-amber-700 text-xs">
                              {quest.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {quest.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {quest.timer}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                              {quest.point}pt
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Weekly Quests */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Footprints className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800">
                今週のチャレンジ
              </h3>
              <Badge className="bg-green-100 text-green-700">週替わり</Badge>
            </div>
            <div className="space-y-3">
              {weeklyQuests.map((quest) => (
                <Card
                  key={quest.id}
                  className="border-2 border-green-200 shadow-lg bg-white/95 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-2xl">
                        {quest.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-800">
                            {quest.title}
                          </h4>
                          <Badge
                            variant="outline"
                            className="border-green-400 text-green-700 text-xs">
                            {quest.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {quest.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {quest.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            {quest.points}pt
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <Card className="border-2 border-purple-200 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                今日の記録
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">3</p>
                  <p className="text-xs text-gray-600">達成クエスト</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">180</p>
                  <p className="text-xs text-gray-600">獲得ポイント</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">7</p>
                  <p className="text-xs text-gray-600">連続日数</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}