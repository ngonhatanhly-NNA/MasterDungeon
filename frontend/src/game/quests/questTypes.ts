export type QuestStatus = 'locked' | 'active' | 'completed' | 'failed';

export interface QuestObjective {
  id: string;
  text: string;
  complete: boolean;
}

export interface QuestRecord {
  id: string;
  title: string;
  status: QuestStatus;
  objectives: QuestObjective[];
  rewards: Array<{ itemId: string; quantity: number }>;
}
