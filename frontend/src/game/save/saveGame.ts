import type { GameState, SaveData } from '../../types';
import { SAVE_KEY } from '../engine/gameLogic';

export function saveGame(state: GameState): boolean {
  try {
    const persisted = {
      mapId: state.mapId, player: state.player, direction: state.direction,
      inventory: state.inventory, collectedItems: state.collectedItems, flags: state.flags,
      quest: state.quest, journal: state.journal, bond: state.bond,
    };
    const data: SaveData = { version: 1, savedAt: new Date().toISOString(), state: persisted };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SaveData;
    if (parsed.version !== 1 || !parsed.state || typeof parsed.state.mapId !== 'string') return null;
    return { ...parsed.state, dialogue: null, toast: `Đã tải save (${new Date(parsed.savedAt).toLocaleString('vi-VN')}).` };
  } catch {
    return null;
  }
}
