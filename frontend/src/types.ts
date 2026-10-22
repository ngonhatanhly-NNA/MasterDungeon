export type Direction = 'up' | 'down' | 'left' | 'right';
export type TileCode = '#' | '.' | 'g' | '~';

export interface Position {
  x: number;
  y: number;
}

export interface MapExit extends Position {
  targetMapId: string;
  targetX: number;
  targetY: number;
  label: string;
}

export interface ItemSpawn extends Position {
  id: string;
  itemId: string;
  name: string;
  icon: string;
  description?: string;
}

export interface GameMap {
  id: string;
  name: string;
  subtitle: string;
  tiles: string[];
  exits: MapExit[];
  items: ItemSpawn[];
  safe: boolean;
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  mapId: string;
  x: number;
  y: number;
  icon: string;
}

export interface ItemDefinition {
  id: string;
  name: string;
  icon: string;
  description: string;
  stackable: boolean;
}

export interface QuestState {
  started: boolean;
  foundKey: boolean;
  completed: boolean;
}

export interface DialogueChoice {
  id: string;
  text: string;
}

export interface DialogueState {
  npcId: string;
  lines: string[];
  index: number;
  choices?: DialogueChoice[];
}

export interface GameState {
  mapId: string;
  player: Position;
  direction: Direction;
  inventory: Record<string, number>;
  collectedItems: string[];
  flags: Record<string, boolean>;
  quest: QuestState;
  dialogue: DialogueState | null;
  journal: string[];
  bond: number;
  toast: string;
}

export interface SaveData {
  version: 1;
  savedAt: string;
  state: Omit<GameState, 'dialogue' | 'toast'>;
}
