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
  assignedTo: {
    id: string;
    isCompleted: boolean;
    assignedDate: Date;
    userId: string;
    mstTodaysQuestId: number | null;
    mstThisWeekQuestId: number | null;
  }[];
};
