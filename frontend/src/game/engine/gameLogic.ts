import type { Direction, GameMap, GameState, Position } from '../../types';
import { isWalkable, manhattanDistance } from './collision';
import { NPCS } from '../../data/npcs';
import { ITEMS } from '../../data/items';
import { MAPS } from '../../data/maps';

export const SAVE_KEY = 'zombie-rpg-save-v2';

export function createInitialState(): GameState {
  return {
    mapId: 'safe-haven', player: { x: 2, y: 7 }, direction: 'down',
    inventory: { bread: 2, water: 2 }, collectedItems: [], flags: {},
    quest: { started: false, foundKey: false, completed: false },
    dialogue: null, journal: ['Đêm 412: một tín hiệu vô danh phát đi tọa độ của bệnh viện St. Oran.'], bond: 2, toast: 'WASD / phím mũi tên để di chuyển · E để tương tác',
  };
}

export function movePoint(point: Position, direction: Direction): Position {
  if (direction === 'up') return { x: point.x, y: point.y - 1 };
  if (direction === 'down') return { x: point.x, y: point.y + 1 };
  if (direction === 'left') return { x: point.x - 1, y: point.y };
  return { x: point.x + 1, y: point.y };
}

function addItem(inventory: Record<string, number>, itemId: string, count = 1): Record<string, number> {
  return { ...inventory, [itemId]: (inventory[itemId] ?? 0) + count };
}

export function stepGame(state: GameState, direction: Direction): GameState {
  if (state.dialogue) return state;
  const map = MAPS[state.mapId];
  const destination = movePoint(state.player, direction);
  const base: GameState = { ...state, direction, toast: '' };
  if (!isWalkable(map, destination)) return { ...base, toast: 'Lối này bị chặn.' };

  const exit = map.exits.find((candidate) => candidate.x === destination.x && candidate.y === destination.y);
  if (exit) {
    const targetMap = MAPS[exit.targetMapId];
    return { ...base, mapId: exit.targetMapId, player: { x: exit.targetX, y: exit.targetY }, toast: `Đã đến ${targetMap.name}.` };
  }

  let next: GameState = { ...base, player: destination };
  const pickup = map.items.find((item) => item.x === destination.x && item.y === destination.y && !state.collectedItems.includes(item.id));
  if (pickup) {
    next = {
      ...next,
      inventory: addItem(next.inventory, pickup.itemId),
      collectedItems: [...next.collectedItems, pickup.id],
      quest: pickup.itemId === 'old-key' ? { ...next.quest, foundKey: true } : next.quest,
      toast: `Nhặt được ${pickup.name}.`,
      journal: [...next.journal, `Đã nhặt: ${pickup.name}.`],
    };
  }
  return next;
}

function linesForNPC(npcId: string, state: GameState): string[] {
  if (npcId === 'sarah') {
    if (state.quest.completed) return ['Sarah: Cậu đã làm đủ rồi. Hãy giữ chiếc chìa khóa, có thể nó mở ra nhiều thứ hơn chúng ta nghĩ.', 'Sarah: Còn chuyện tín hiệu kia… Kai sẽ kể khi cậu ấy sẵn sàng.'];
    if (state.quest.foundKey) return ['Sarah: Cậu tìm thấy nó rồi! Ký hiệu này thuộc về Ward 0 — nơi không tồn tại trong hồ sơ chính thức.', 'Sarah: Đây là phần thưởng nhỏ. Đêm nay cậu và Kai nên nghỉ ngơi trước khi đi tiếp.'];
    if (state.quest.started) return ['Sarah: Old Road nằm phía đông. Cẩn thận, bộ đàm ở đó thường bắt được những giọng nói không có người phát.', 'Sarah: Hãy tìm chiếc chìa khóa có khắc biểu tượng hình vòng tròn.'];
    return ['Sarah: Karin, cậu cũng nghe thấy tín hiệu lúc 03:17 chứ?', 'Sarah: Nó nhắc đến St. Oran và một căn phòng bị xóa khỏi bản đồ. Hãy tìm chiếc chìa khóa cũ trên Old Road.', 'Sarah: Mang nó về cho tôi. Tôi sẽ nói cho cậu biết điều mình tìm được trong hồ sơ bệnh viện.'];
  }
  if (npcId === 'kai') {
    if (state.flags.kaiTruth) return ['Kai: Tôi đã nói hết những gì mình biết. Phần còn lại, chúng ta sẽ tìm trong hồ sơ gốc.', 'Kai: Nếu sau này cậu giận tôi, tôi sẽ không đổ lỗi cho cậu. Tôi chỉ mong cậu để tôi cùng chịu trách nhiệm.'];
    if (state.flags.kaiSpoke) return ['Kai: Tôi nợ cậu sự thật. Đội cứu hộ của tôi nhận lệnh đến St. Oran trước khi còi báo động vang lên.', 'Kai: Báo cáo chính thức ghi rằng chúng tôi chưa từng đến đó. Tôi đã im lặng vì nghĩ mình đang bảo vệ những người còn sống.', 'Kai: Tôi không biết ai ra lệnh. Nhưng lần này, tôi sẽ không tự quyết định thay cậu nữa.'];
    return ['Kai: Đường phía đông không an toàn. Tôi sẽ đi cùng cậu.', 'Kai: Tôi từng làm cứu hộ. Tôi biết cách đưa người sống sót ra ngoài… nhưng có một chuyện về St. Oran tôi chưa thể kể.', 'Kai: Không phải vì tôi không tin cậu. Tôi chỉ sợ điều cậu sẽ nghĩ về tôi.'];
  }
  if (npcId === 'mira') return ['Mira: Những người nhiễm bệnh không chỉ lao vào chúng ta.', 'Mira: Đôi khi họ lặp lại câu cuối cùng đã nghe, dù nó không liên quan gì đến chúng ta.', 'Mira: Nếu cậu đến bệnh viện, đừng tin mọi thứ được ghi trong hồ sơ.'];
  return ['Người gác hồ sơ: Khu Ward 0 không có trong sơ đồ bệnh viện.', 'Người gác hồ sơ: Nếu cậu tìm thấy một chiếc chìa khóa, hãy tự hỏi ai đã cố tình để nó bên ngoài.'];
}

export function interact(state: GameState): GameState {
  if (state.dialogue) {
    const { npcId, lines, index } = state.dialogue;
    if (state.dialogue.choices?.length) return state;
    if (index < lines.length - 1) return { ...state, dialogue: { ...state.dialogue, index: index + 1 }, toast: '' };
    if (npcId === 'kai' && !state.flags.kaiSpoke && !state.flags.kaiChoiceMade) {
      return {
        ...state,
        dialogue: {
          ...state.dialogue,
          choices: [
            { id: 'trust-kai', text: '“Tôi tin cậu. Nhưng đừng giấu tôi nữa.”' },
            { id: 'keep-distance', text: '“Tôi sẽ tự tìm sự thật.”' },
          ],
        },
        toast: '',
      };
    }
    let next: GameState = { ...state, dialogue: null, toast: '' };
    if (npcId === 'sarah' && !state.quest.started) {
      next = { ...next, quest: { ...next.quest, started: true }, journal: [...next.journal, 'Quest mới: The Old Key.'] };
    } else if (npcId === 'sarah' && state.quest.foundKey && !state.quest.completed) {
      const water = next.inventory.water ?? 0;
      next = { ...next, quest: { ...next.quest, completed: true }, inventory: { ...next.inventory, water: water + 1 }, journal: [...next.journal, 'Hoàn thành quest: The Old Key. Nhận Water ×1.'], toast: 'Quest hoàn thành! Nhận Water ×1.' };
    } else if (npcId === 'kai' && !state.flags.kaiSpoke) {
      next = { ...next, flags: { ...next.flags, kaiSpoke: true }, journal: [...next.journal, 'Kai thừa nhận có điều chưa kể về nhiệm vụ ở St. Oran.'] };
    } else if (npcId === 'kai' && state.flags.kaiSpoke && !state.flags.kaiTruth) {
      next = { ...next, flags: { ...next.flags, kaiTruth: true }, bond: Math.min(10, next.bond + 1), journal: [...next.journal, 'Kai kể sự thật về nhiệm vụ cuối cùng của đội cứu hộ.'] };
    }
    return next;
  }
  const nearby = NPCS.filter((npc) => npc.mapId === state.mapId && manhattanDistance(state.player, npc) <= 1)
    .sort((a, b) => manhattanDistance(state.player, a) - manhattanDistance(state.player, b))[0];
  if (!nearby) return { ...state, toast: 'Không có ai đủ gần để trò chuyện. Hãy đứng cạnh NPC rồi nhấn E.' };
  return { ...state, dialogue: { npcId: nearby.id, lines: linesForNPC(nearby.id, state), index: 0 }, toast: '' };
}

export function chooseDialogue(state: GameState, choiceId: string): GameState {
  if (state.dialogue?.npcId !== 'kai' || !state.dialogue.choices?.some((choice) => choice.id === choiceId)) return state;
  const trustsKai = choiceId === 'trust-kai';
  return {
    ...state,
    dialogue: null,
    flags: { ...state.flags, kaiSpoke: true, kaiChoiceMade: true, kaiTrustingResponse: trustsKai },
    bond: trustsKai ? Math.min(10, state.bond + 2) : Math.max(0, state.bond - 1),
    journal: [...state.journal, trustsKai
      ? 'Karin chọn tin Kai, nhưng yêu cầu cậu ấy không che giấu sự thật nữa.'
      : 'Karin quyết định giữ khoảng cách và tự tìm câu trả lời.'],
    toast: trustsKai ? 'Karin đã trao cho Kai thêm một chút niềm tin. Liên kết +2.' : 'Karin quyết định tự tìm sự thật. Liên kết −1.',
  };
}

export function currentMap(state: GameState): GameMap {
  return MAPS[state.mapId];
}

export function inventoryLabel(itemId: string): string {
  return ITEMS[itemId]?.name ?? itemId;
}
