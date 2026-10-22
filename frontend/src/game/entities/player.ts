import type { Direction, Position } from '../../types';

export interface PlayerEntity extends Position {
  name: 'Karin';
  height: '1,70 m';
  direction: Direction;
  icon: '🧑';
}

export const PLAYER_PROFILE = {
  name: 'Karin', height: '1,70 m', age: 22,
  description: 'Nhanh trí, nhạy với âm thanh và tín hiệu radio. Dùng sự hài hước để che giấu nỗi sợ bị bỏ lại.',
};
