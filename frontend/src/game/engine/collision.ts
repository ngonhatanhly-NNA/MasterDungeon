import type { GameMap, Position } from '../../types';

export function isInsideMap(map: GameMap, point: Position): boolean {
  return point.y >= 0 && point.y < map.tiles.length && point.x >= 0 && point.x < (map.tiles[point.y]?.length ?? 0);
}

export function isWalkable(map: GameMap, point: Position): boolean {
  if (!isInsideMap(map, point)) return false;
  if (map.exits.some((exit) => exit.x === point.x && exit.y === point.y)) return true;
  return map.tiles[point.y][point.x] !== '#';
}

export function manhattanDistance(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
