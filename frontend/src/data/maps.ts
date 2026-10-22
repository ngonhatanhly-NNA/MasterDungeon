import { GameMap } from '../types';

/**
 * MÃ TILE (TILE ID):
 * 0: Sàn gỗ lớp học / Đường lát đá
 * 1: Tường gạch / Hàng rào (Có va chạm - Solid)
 * 2: Cỏ xanh tự nhiên (Đi được)
 * 3: Bàn học / Chướng ngại vật (Solid)
 * 4: Cửa chuyển cảnh / Cầu thang (Portal)
 * 5: Vết Nứt Không Gian / Hố Nổ Dị Biến (Hiệu ứng phát sáng tím, Solid hoặc Sự kiện)
 * 6: Cây cổ thụ sân trường (Solid)
 * 7: Đống đổ nát / Lửa cháy (Solid)
 */
export const MAPS: Record<string, GameMap> = {
  classroom_day0: {
    id: 'classroom_day0',
    name: 'Phòng Học 10A - Trường THPT Hoàng Hôn',
    dayLabel: 'NGÀY 0 - 17:45 CHIỀU',
    width: 12,
    height: 10,
    ambientDarkness: 0.15,
    tiles: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    portals: [
      { x: 10, y: 8, targetMap: 'school_gate_day0', targetX: 7, targetY: 2 }
    ]
  },

  school_gate_day0: {
    id: 'school_gate_day0',
    name: 'Khuôn Viên & Cổng Trường (Tâm Chấn Vụ Nổ)',
    dayLabel: 'NGÀY 0 - HIỆN TƯỢNG DỊ BIẾN',
    width: 15,
    height: 12,
    ambientDarkness: 0.35,
    tiles: [
      [1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1],
      [1, 6, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 6, 1],
      [1, 2, 2, 6, 2, 2, 0, 0, 0, 2, 2, 6, 2, 2, 1],
      [1, 2, 2, 2, 2, 7, 0, 0, 0, 2, 2, 2, 2, 2, 1],
      [1, 6, 2, 2, 2, 2, 0, 0, 0, 7, 2, 2, 2, 6, 1],
      [1, 2, 2, 7, 2, 0, 0, 0, 0, 0, 2, 7, 2, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1],
      [1, 6, 2, 2, 7, 0, 5, 5, 5, 0, 7, 2, 2, 6, 1],
      [1, 1, 1, 1, 1, 0, 5, 5, 5, 0, 1, 1, 1, 1, 1],
      [1, 7, 2, 2, 2, 0, 0, 5, 0, 0, 2, 2, 2, 7, 1],
      [1, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    portals: [
      { x: 7, y: 0, targetMap: 'classroom_day0', targetX: 10, targetY: 7 }
    ]
  },

  sanctuary_day432: {
    id: 'sanctuary_day432',
    name: 'Phế Tích Cổng Trường - Tiền Đồn Hầm Ngục',
    dayLabel: 'NGÀY 432 - HẬU ĐẠI DỊ BIẾN',
    width: 15,
    height: 12,
    ambientDarkness: 0.5,
    tiles: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 7, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 7, 1],
      [1, 2, 6, 2, 0, 3, 3, 0, 3, 3, 0, 2, 6, 2, 1],
      [1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
      [1, 7, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 7, 1],
      [1, 2, 2, 0, 0, 0, 5, 5, 5, 0, 0, 0, 2, 2, 1],
      [1, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 1],
      [1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 0, 0, 4, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    portals: []
  }
};