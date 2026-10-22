export interface DialogueChoice {
  id: string;
  text: string;
  effects: {
    bond?: number;
    flags?: string[];
    journalEntry?: string;
  };
}

export interface DialogueNode {
  id: string;
  speakerId: string;
  text: string;
  choices?: DialogueChoice[];
  nextNodeId?: string;
}
