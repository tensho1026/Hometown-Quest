// src/components/QuestList.tsx

import { Clock, Footprints } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { dailyQuestType } from "@/types/todayQuest";
import { QuestCol } from "./QuestCol";

interface QuestListProps {
  title: string;
  badgeText: string;
  quests: dailyQuestType[];
  type: "daily" | "weekly";
}

export function QuestList({ title, badgeText, quests, type }: QuestListProps) {
  const isDaily = type === "daily";
  const icon = isDaily ? <Clock className="w-5 h-5 text-amber-600" /> : <Footprints className="w-5 h-5 text-green-600" />;
  const badgeClass = isDaily ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700";

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <Badge className={badgeClass}>{badgeText}</Badge>
      </div>
      <div className="space-y-3">
        {quests.map((quest) => (
          <QuestCol key={quest.id} quest={quest} type={type} />
        ))}
      </div>
    </div>
  );
}