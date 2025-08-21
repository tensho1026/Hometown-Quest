"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  User,
  Camera,
  Heart,
  Clock,
  Footprints,
  BookOpen,
} from "lucide-react";

interface HomeViewProps {
  onQuestSelect: (quest: any) => void;
  onViewChange: (view: "quest") => void;
}

export function HomeView() {
  const [backgroundImage, setBackgroundImage] = useState(
    "/placeholder.svg?height=400&width=600"
  );

  const dailyQuests = [
    {
      id: 1,
      title: "15分お散歩",
      type: "運動",
      points: 30,
      difficulty: "簡単",
      duration: "15分",
      description: "近所を15分間お散歩して、リフレッシュしよう",
      icon: "🚶‍♀️",
      category: "daily",
    },
    {
      id: 2,
      title: "地元でお買い物",
      type: "生活",
      points: 50,
      difficulty: "簡単",
      duration: "30分",
      description: "地元のお店で何か一つお買い物をしよう",
      icon: "🛒",
      category: "shopping",
    },
    {
      id: 3,
      title: "本を10ページ読む",
      type: "学習",
      points: 40,
      difficulty: "簡単",
      duration: "20分",
      description: "好きな本を10ページ読んでみよう",
      icon: "📚",
      category: "learning",
    },
  ];

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

  // const handleQuestClick = (quest: any) => {
  //   onQuestSelect(quest)
  //   onViewChange("quest")
  // }

  const handleBackgroundChange = () => {
    // 実際の実装では、ユーザーが写真を選択できるようになります
    const newImages = [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ];
    const randomImage = newImages[Math.floor(Math.random() * newImages.length)];
    setBackgroundImage(randomImage);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            <div>
              <h1 className="font-bold text-lg">わたしの地元</h1>
              <p className="text-sm opacity-90">今日も素敵な一日を！</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Local Photo Section */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="absolute bottom-4 right-4">
            <Button
              onClick={handleBackgroundChange}
              size="sm"
              className="bg-white/90 text-gray-700 hover:bg-white"
            >
              <Camera className="w-4 h-4 mr-2" />
              写真を変更
            </Button>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold drop-shadow-lg">今日の地元</h2>
            <p className="text-sm opacity-90 drop-shadow-lg">
              あなたの大切な場所
            </p>
          </div>
        </div>

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
                <Card
                  key={quest.id}
                  className="border-2 border-amber-200 shadow-lg bg-white/95 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                  // onClick={() => handleQuestClick(quest)}
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
                            className="border-amber-400 text-amber-700 text-xs"
                          >
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
                            <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
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
                  // onClick={() => handleQuestClick(quest)}
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
                            className="border-green-400 text-green-700 text-xs"
                          >
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
