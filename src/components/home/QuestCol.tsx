// src/components/QuestCard.tsx
"use client";

import Link from "next/link";

import { Badge, Clock } from "lucide-react";
import { dailyQuestType } from "@/types/todayQuest";
import { Card } from "../ui/card";

interface QuestCardProps {
  quest: dailyQuestType;
  type: "daily" | "weekly";
}

export function QuestCol({ quest, type }: QuestCardProps) {
  // タイプに応じてスタイルを動的に設定
  const cardBorderColor =
    type === "daily" ? "border-amber-200" : "border-green-200";
  const cardShadow = type === "daily" ? "shadow-lg" : "shadow-lg";
  const cardHoverShadow =
    type === "daily" ? "hover:shadow-xl" : "hover:shadow-xl";

  const iconBgGradient =
    type === "daily"
      ? "bg-gradient-to-br from-amber-400 to-orange-500"
      : "bg-gradient-to-br from-green-400 to-teal-500";

  const typeBadgeClass =
    type === "daily"
      ? "border-amber-400 text-amber-700"
      : "border-green-400 text-green-700";

  const pointClass = type === "daily" ? "bg-amber-500" : "bg-green-500";
  const points = (quest as any).points ?? quest.point; // 週替わりクエストのプロパティ名に対応

  return (
    <Link href={`/QuestDetail/${quest.id}`} key={`${type}-${quest.id}`}>
      <Card
        className={`border-2 ${cardBorderColor} ${cardShadow} bg-white/95 backdrop-blur-sm cursor-pointer ${cardHoverShadow} transition-all duration-200 hover:scale-[1.02]`}
      >
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 ${iconBgGradient} rounded-full flex items-center justify-center text-2xl`}
            >
              {quest.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-gray-800">{quest.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">{quest.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {(quest as any).duration ?? quest.timer}
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
