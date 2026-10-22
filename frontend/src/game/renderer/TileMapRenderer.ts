import { GameMap } from '../../types';

export function renderBeautifulTileMap(
  ctx: CanvasRenderingContext2D,
  map: GameMap,
  tileSize: number,
  tick: number
) {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const tile = map.tiles[y][x];
      const px = x * tileSize;
      const py = y * tileSize;

      // Vẽ nền cơ bản cho mọi ô
      if (map.id === 'classroom_day0') {
        // Sàn gỗ lớp học ấm áp
        ctx.fillStyle = (x + y) % 2 === 0 ? '#b45309' : '#92400e';
        ctx.fillRect(px, py, tileSize, tileSize);
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.strokeRect(px, py, tileSize, tileSize);
      } else {
        // Nền cỏ / đất đá ngoài trời
        ctx.fillStyle = (x + y) % 2 === 0 ? '#15803d' : '#166534';
        ctx.fillRect(px, py, tileSize, tileSize);
      }

      // Chi tiết từng loại Tile
      switch (tile) {
        case 0: // Đường lát đá (nếu ở ngoài trời)
          if (map.id !== 'classroom_day0') {
            ctx.fillStyle = '#475569';
            ctx.fillRect(px, py, tileSize, tileSize);
            ctx.fillStyle = '#64748b';
            ctx.fillRect(px + 4, py + 4, tileSize - 8, tileSize - 8);
          }
          break;

        case 1: // Tường gạch / Hàng rào trường học
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(px, py, tileSize, tileSize);
          ctx.fillStyle = '#334155';
          ctx.fillRect(px + 2, py + 2, tileSize - 4, tileSize / 2 - 4);
          ctx.fillRect(px + 2, py + tileSize / 2 + 2, tileSize - 4, tileSize / 2 - 4);
          break;

        case 2: // Cỏ chi tiết (Pixel grass blades)
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(px + 8, py + 10, 4, 8);
          ctx.fillRect(px + 14, py + 12, 4, 6);
          ctx.fillRect(px + 30, py + 26, 4, 8);
          break;

        case 3: // Bàn học / Thùng tiếp tế
          ctx.fillStyle = '#451a03';
          ctx.fillRect(px + 4, py + 8, tileSize - 8, tileSize - 12);
          ctx.fillStyle = '#d97706';
          ctx.fillRect(px + 6, py + 6, tileSize - 12, tileSize - 18);
          // Sách vở trên bàn
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(px + 12, py + 10, 10, 8);
          break;

        case 4: // Cổng chuyển Map (Phát sáng nhẹ)
          ctx.fillStyle = '#fbbf24';
          ctx.fillRect(px + 4, py + 4, tileSize - 8, tileSize - 8);
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(px + 12, py + 12, tileSize - 24, tileSize - 24);
          break;

        case 5: // Vết Nứt Không Gian ở Cổng Trường (Hiệu ứng động)
          const pulse = Math.sin(tick * 0.08) * 6;
          ctx.fillStyle = '#2e1065';
          ctx.fillRect(px, py, tileSize, tileSize);
          ctx.fillStyle = '#9333ea';
          ctx.fillRect(px + 6 - pulse / 2, py + 6 - pulse / 2, tileSize - 12 + pulse, tileSize - 12 + pulse);
          ctx.fillStyle = '#f0abfc';
          ctx.fillRect(px + 16, py + 16, tileSize - 32, tileSize - 32);
          break;

        case 6: // Cây cổ thụ sân trường
          ctx.fillStyle = '#451a03';
          ctx.fillRect(px + 16, py + 28, 16, 18);
          ctx.fillStyle = '#064e3b';
          ctx.fillRect(px + 4, py + 4, tileSize - 8, tileSize - 16);
          ctx.fillStyle = '#047857';
          ctx.fillRect(px + 8, py + 8, tileSize - 16, tileSize - 24);
          break;

        case 7: // Đống đổ nát / Lửa cháy sau vụ nổ
          ctx.fillStyle = '#374151';
          ctx.fillRect(px + 6, py + 14, tileSize - 12, tileSize - 18);
          ctx.fillStyle = tick % 20 < 10 ? '#ef4444' : '#f97316';
          ctx.fillRect(px + 14, py + 8, 20, 16);
          ctx.fillStyle = '#fde047';
          ctx.fillRect(px + 20, py + 12, 8, 10);
          break;
      }
    }
  }
}