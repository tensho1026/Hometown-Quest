"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { List, Clock, CheckCircle, Star } from 'lucide-react'

interface QuestListProps {
  onQuestSelect: (quest: any) => void
  onViewChange: (view: "quest") => void
}

export function QuestList({ onQuestSelect, onViewChange }: QuestListProps) {
  const activeQuests = [
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
      progress: 0,
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
      progress: 0,
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
      progress: 0,
    },
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
      progress: 0,
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
      progress: 0,
    },
  ]

  const completedQuests = [
    {
      id: 101,
      title: "朝の散歩",
      type: "運動",
      points: 30,
      difficulty: "簡単",
      duration: "15分",
      description: "朝の新鮮な空気を吸いながら散歩しました",
      icon: "🌅",
      category: "daily",
      completedDate: "2024-03-15",
    },
    {
      id: 102,
      title: "地元カフェでコーヒー",
      type: "生活",
      points: 50,
      difficulty: "簡単",
      duration: "30分",
      description: "地元のカフェで美味しいコーヒーを楽しみました",
      icon: "☕",
      category: "shopping",
      completedDate: "2024-03-14",
    },
    {
      id: 103,
      title: "公園のベンチで読書",
      type: "学習",
      points: 40,
      difficulty: "簡単",
      duration: "25分",
      description: "公園のベンチで小説を読みました",
      icon: "📖",
      category: "learning",
      completedDate: "2024-03-13",
    },
    {
      id: 104,
      title: "商店街の老舗発見",
      type: "探索",
      points: 100,
      difficulty: "普通",
      duration: "1時間",
      description: "50年続く老舗の和菓子屋さんを発見しました",
      icon: "🍡",
      category: "exploration",
      completedDate: "2024-03-12",
    },
  ]

  const handleQuestClick = (quest: any) => {
    onQuestSelect(quest)
    onViewChange("quest")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "簡単":
        return "bg-green-100 text-green-700"
      case "普通":
        return "bg-yellow-100 text-yellow-700"
      case "難しい":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

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
              <TabsTrigger value="active" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                進行中のクエスト
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                達成済みクエスト
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="p-4">
              <div className="space-y-4">
                {activeQuests.map((quest) => (
                  <Card
                    key={quest.id}
                    className="border border-amber-200 shadow-md bg-white cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    onClick={() => handleQuestClick(quest)}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                          {quest.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-gray-800 truncate">{quest.title}</h3>
                            <Badge variant="outline" className="border-amber-400 text-amber-700 text-xs flex-shrink-0">
                              {quest.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{quest.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {quest.duration}
                              </span>
                              <Badge className={`text-xs ${getDifficultyColor(quest.difficulty)}`}>
                                {quest.difficulty}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-500" />
                              <span className="font-bold text-amber-600">{quest.points}pt</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="p-4">
              <div className="space-y-4">
                {completedQuests.map((quest) => (
                  <Card
                    key={quest.id}
                    className="border border-green-200 shadow-md bg-green-50/50 cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={() => handleQuestClick(quest)}
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
                            <h3 className="font-bold text-gray-800 truncate">{quest.title}</h3>
                            <Badge variant="outline" className="border-green-400 text-green-700 text-xs flex-shrink-0">
                              {quest.type}
                            </Badge>
                            <Badge className="bg-green-500 text-white text-xs flex-shrink-0">完了</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{quest.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {quest.completedDate}
                              </span>
                              <Badge className={`text-xs ${getDifficultyColor(quest.difficulty)}`}>
                                {quest.difficulty}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-green-500" />
                              <span className="font-bold text-green-600">+{quest.points}pt</span>
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
  )
}
