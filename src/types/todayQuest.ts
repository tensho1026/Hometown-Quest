export type dailyQuestType = {
  isCompleted?:boolean
  completedDate?:string
  id: string;
  icon?: string; // string | undefined と同じ意味
  title?: string;
  description?: string;
  type?: string;
  timer?: string;
  level?: string;
  point?: number;
  category?: string;
};
