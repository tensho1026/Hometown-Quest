"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Trophy, MapPin, Calendar, Crown } from "lucide-react";
import MyPageHeader from "./myPage/myPageHeader";
import { useFetchMyData } from "@/hooks/myPage/useFetchMyData";

export function MyPage() {
  const { quests, totalPoints } = useFetchMyData();
  const badges = [
    { id: 1, name: "散歩マスター", icon: "🚶‍♀️", rarity: "common" },
    { id: 2, name: "地元愛好家", icon: "❤️", rarity: "rare" },
    { id: 3, name: "継続の達人", icon: "🔥", rarity: "epic" },
    { id: 4, name: "写真コレクター", icon: "📸", rarity: "common" },
    { id: 5, name: "早起き習慣", icon: "🌅", rarity: "rare" },
    { id: 6, name: "読書家", icon: "📚", rarity: "epic" },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "rare":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "epic":
        return "bg-purple-100 text-purple-700 border-purple-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <MyPageHeader />

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Profile Card */}
        <Card className="border-2 border-amber-200 shadow-xl bg-white/95 backdrop-blur-sm mb-4">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                🧑‍🚀
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-800">
                    冒険者ふうこ
                  </h2>
                  <Crown className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <Star className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-700">レベル</p>
                <p className="text-2xl font-bold text-amber-600">
                  {quests.length}
                </p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Trophy className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-700">総ポイント</p>
                <p className="text-2xl font-bold text-green-600">
                  {totalPoints}
                </p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-700">
                  達成クエスト
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {quests.length}
                </p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <Badge className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-700">バッジ数</p>
                <p className="text-2xl font-bold text-purple-600">
                  {quests.length}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Card className="border-2 border-amber-200 shadow-xl bg-white/95 backdrop-blur-sm">
          <Tabs defaultValue="quests" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-amber-100">
              <TabsTrigger
                value="quests"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                達成クエスト
              </TabsTrigger>
              <TabsTrigger
                value="badges"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                バッジコレクション
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quests" className="p-4">
              <div className="space-y-3">
                {quests.map((quest) => (
                  <div
                    key={quest.id}
                    className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <span className="text-2xl">{quest.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{quest.title}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {quest.assignedDate
                            ? new Date(quest.assignedDate).toLocaleDateString()
                            : "No date"}
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      +{quest.point}pt
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="badges" className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-lg border-2 text-center ${getRarityColor(
                      badge.rarity
                    )}`}>
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <p className="font-medium text-sm">{badge.name}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
