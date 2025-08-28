"use client";

import Link from "next/link";
import { Clock, CheckCircle } from "lucide-react"; // CheckCircleをインポート
import { dailyQuestType } from "@/types/todayQuest";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface QuestColProps {
  quest: dailyQuestType;
  type: "daily" | "weekly";
  isCompleted?: boolean; // 💡 isCompletedプロパティを追加
}

export function QuestCol({ quest, type, isCompleted }: QuestColProps) {
  // タイプと達成状態に応じてスタイルを動的に設定
  const isDaily = type === "daily";
  const cardBorderColor = isCompleted
    ? "border-green-200"
    : isDaily
    ? "border-amber-200"
    : "border-green-200";

  const cardBgColor = isCompleted
    ? "bg-green-50/50"
    : "bg-white/95";

  const iconBgGradient = isCompleted
    ? "bg-gradient-to-br from-green-400 to-teal-500"
    : isDaily
    ? "bg-gradient-to-br from-amber-400 to-orange-500"
    : "bg-gradient-to-br from-green-400 to-teal-500";

  const iconColor = isCompleted ? "text-green-600" : isDaily ? "text-amber-600" : "text-green-600";
  const pointClass = isCompleted ? "bg-green-500" : isDaily ? "bg-amber-500" : "bg-green-500";
  const points = (quest as any).points ?? quest.point;
  const duration = (quest as any).duration ?? quest.timer;

  return (
    <Link href={`/QuestDetail/${quest.id}`} key={`${type}-${quest.id}`}>
      <Card
        className={`border-2 ${cardBorderColor} ${cardBgColor} shadow-lg backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-[1.02]`}
      >
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 ${iconBgGradient} rounded-full flex items-center justify-center text-2xl relative`}
            >
              {quest.icon}
              {isCompleted && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-gray-800">{quest.title}</h4>
                {isCompleted && (
                  <Badge className="bg-green-500 text-white text-xs">完了</Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{quest.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className={`flex items-center gap-1 ${iconColor}`}>
                  <Clock className="w-3 h-3" />
                  {duration}
                </span>
                <span className="flex items-center gap-1">
                  <span className={`w-3 h-3 ${pointClass} rounded-full`}></span>
                  {points}pt
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}