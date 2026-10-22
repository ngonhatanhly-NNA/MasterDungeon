export type Direction = 'DOWN' | 'UP' | 'LEFT' | 'RIGHT';

export type GamePhase = 'TITLE' | 'PROLOGUE_INTRO' | 'PLAYING' | 'TIMESKIP_CUTSCENE';

export interface Position {
  x: number;
  y: number;
}

export interface CharacterPalette {
  hair: string;
  skin: string;
  shirt: string;
  pants: string;
  accent: string;
}

export interface NPCData {
  id: string;
  name: string;
  role: string;
  mapId: string;
  x: number;
  y: number;
  direction: Direction;
  palette: CharacterPalette;
  dialogueId: string;
}

export interface TilePortal {
  x: number;
  y: number;
  targetMap: string;
  targetX: number;
  targetY: number;
  requiredQuestFlag?: string;
}

export interface GameMap {
  id: string;
  name: string;
  dayLabel: string;
  width: number;
  height: number;
  ambientDarkness: number; // 0 = sáng, 0.4 = chiều tà, 0.65 = hầm ngục / dị biến
  tiles: number[][];
  portals: TilePortal[];
}