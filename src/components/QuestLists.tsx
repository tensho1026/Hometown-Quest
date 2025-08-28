"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Clock, CheckCircle, Star } from "lucide-react";
import Link from "next/link";
import { dailyQuestType } from "@/types/todayQuest";
import { useUser } from "@clerk/nextjs";
import { getTodayQuests } from "@/app/actions/getTodayQuests/getTodayQuests";

interface QuestListProps {
  onQuestSelect: (quest: any) => void;
  onViewChange: (view: "quest") => void;
}

export function QuestList() {
  const [dailyQuests, setDailyQuests] = useState<dailyQuestType[]>([]);
  const [completedQuests, setCompletedQuests] = useState<dailyQuestType[]>([]);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      // isLoadedのチェックを追加
      const fetchtodayQuestsData = async () => {
        const dailyQuest = await getTodayQuests(user.id);
        setDailyQuests(dailyQuest.filter((quest) => !quest.isCompleted));

        // isCompletedがtrueのものをcompletedQuestsにセット
        setCompletedQuests(dailyQuest.filter((quest) => quest.isCompleted));
      };
      fetchtodayQuestsData();
    }
  }, [isLoaded, user]); // 依存配列にisLoadedとuserを追加

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "簡単":
        return "bg-green-100 text-green-700";
      case "普通":
        return "bg-yellow-100 text-yellow-700";
      case "難しい":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <List className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">クエスト一覧</h1>
            <p className="text-sm opacity-90">あなたの冒険を管理しよう</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto pb-20">
        <Card className="border-2 border-amber-200 shadow-xl bg-white/95 backdrop-blur-sm">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-amber-100">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
              >
                進行中のクエスト
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
              >
                達成済みクエスト
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="p-4">
              <div className="space-y-4">
                {dailyQuests.map((quest) => (
                  <Link
                    href={`/QuestDetail/${quest.id}`}
                    key={`daily-${quest.id}`}
                  >
                    <Card
                      key={quest.id}
                      className="border border-amber-200 shadow-md bg-white cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                      // onClick={() => handleQuestClick(quest)}
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                            {quest.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-gray-800 truncate">
                                {quest.title}
                              </h3>
                              <Badge
                                variant="outline"
                                className="border-amber-400 text-amber-700 text-xs flex-shrink-0"
                              >
                                {quest.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {quest.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {quest.timer}
                                </span>
                                <Badge
                                  className={`text-xs ${getDifficultyColor(
                                    quest.level
                                  )}`}
                                >
                                  {quest.level}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-500" />
                                <span className="font-bold text-amber-600">
                                  {quest.point}pt
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="p-4">
              <div className="space-y-4">
                {completedQuests.map((quest) => (
                  <Card
                    key={quest.id}
                    className="border border-green-200 shadow-md bg-green-50/50 cursor-pointer hover:shadow-lg transition-all duration-200"
                    // onClick={() => handleQuestClick(quest)}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0 relative">
                          {quest.icon}
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-gray-800 truncate">
                              {quest.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className="border-green-400 text-green-700 text-xs flex-shrink-0"
                            >
                              {quest.type}
                            </Badge>
                            <Badge className="bg-green-500 text-white text-xs flex-shrink-0">
                              完了
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {quest.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {quest.completedDate}
                              </span>
                              <Badge
                                className={`text-xs ${getDifficultyColor(
                                  quest.level
                                )}`}
                              >
                                {quest.level}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-green-500" />
                              <span className="font-bold text-green-600">
                                +{quest.point}pt
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
