"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Clock, Camera } from "lucide-react"

interface QuestDetailProps {
  quest: any
  onBack: () => void
}

export function QuestDetail({ quest, onBack }: QuestDetailProps) {
  if (!quest) return null

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-bold text-lg">クエスト詳細</h1>
            <p className="text-sm opacity-90">冒険の準備をしよう</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Card className="border-2 border-amber-200 shadow-xl bg-white/95 backdrop-blur-sm">
          {/* Quest Image */}
          <div className="relative h-48 bg-gradient-to-br from-pink-200 to-orange-200 rounded-t-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl opacity-80">{quest.icon}</span>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-amber-500 text-white font-bold">{quest.points} pt</Badge>
            </div>
          </div>

          <div className="p-6">
            {/* Quest Title & Type */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-amber-400 text-amber-700">
                  {quest.type}
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {quest.difficulty}
                </Badge>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{quest.title}</h2>
              <p className="text-gray-600 leading-relaxed">{quest.description}</p>
            </div>

            {/* Quest Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-700">所要時間</p>
                <p className="text-lg font-bold text-amber-600">{quest.duration}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <span className="w-6 h-6 text-blue-600 mx-auto mb-1 block text-xl">⭐</span>
                <p className="text-sm font-medium text-gray-700">難易度</p>
                <p className="text-lg font-bold text-blue-600">{quest.difficulty}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <span className="w-6 h-6 text-green-600 mx-auto mb-1 block text-xl">🎯</span>
                <p className="text-sm font-medium text-gray-700">ポイント</p>
                <p className="text-lg font-bold text-green-600">{quest.points}pt</p>
              </div>
            </div>

            {/* Rewards */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                獲得できる報酬
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700">ポイント</span>
                  <span className="font-bold text-yellow-600">{quest.points} pt</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">バッジ</span>
                  <span className="font-bold text-purple-600">「{quest.type}マスター」</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 text-lg shadow-lg">
                <span className="mr-2">✅</span>
                クエスト開始
              </Button>
              <Button
                variant="outline"
                className="w-full border-2 border-amber-400 text-amber-700 hover:bg-amber-50 font-bold py-3 bg-transparent"
              >
                <Camera className="w-5 h-5 mr-2" />
                達成報告（写真撮影）
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
