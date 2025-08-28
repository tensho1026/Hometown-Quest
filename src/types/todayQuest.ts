export type dailyQuestType = {
  isCompleted?:boolean
  assignedDate:string
  id: string;
  icon?: string; // string | undefined と同じ意味
  title?: string;
  description?: string;
  type?: string;
  timer?: string;
  level?: string;
  point?: number;
  category?: string;
  assignTo:{
    isCompleted:Boolean
  }
};
