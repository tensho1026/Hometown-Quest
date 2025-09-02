export type dailyQuestType = {
  id: string;
  icon?: string;
  title?: string;
  description?: string;
  type?: string;
  timer?: string;
  level?: string;
  point?: number;
  category?: string;
  isCompleted: boolean;
  completedDate?: string; // For completed quests display
  assignedTo?: {
    id: string;
    isCompleted: boolean;
    assignedDate: Date;
    userId: string;
    mstTodaysQuestId: number | null;
    mstThisWeekQuestId: number | null;
  }[];
};

// Completed quest shape used on My Page where assignedDate is flattened on top-level
export type completedQuestType = dailyQuestType & {
  assignedDate?: string | Date;
};
