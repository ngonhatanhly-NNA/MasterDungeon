import { CharacterPalette, Direction } from '../../types';

export const PALETTES: Record<string, CharacterPalette> = {
  karin: { hair: '#e11d48', skin: '#fde68a', shirt: '#1e3a8a', pants: '#1f2937', accent: '#f43f5e' },
  kai:   { hair: '#2563eb', skin: '#fde68a', shirt: '#1e293b', pants: '#0f172a', accent: '#38bdf8' },
  rook:  { hair: '#4b5563', skin: '#fcd34d', shirt: '#3f6212', pants: '#1c1917', accent: '#a3e635' },
  sarah: { hair: '#d97706', skin: '#fde68a', shirt: '#7c2d12', pants: '#292524', accent: '#fbbf24' },
  yuna:  { hair: '#9333ea', skin: '#fef3c7', shirt: '#4c1d95', pants: '#1e1b4b', accent: '#c084fc' },
};

/**
 * Vẽ nhân vật Pixel 16x16 phóng đại theo kích thước ô (tileSize = 48px -> 1 pixel = 3px)
 */
export function drawPokemonStyleSprite(
  ctx: CanvasRenderingContext2D,
  screenX: number,
  screenY: number,
  tileSize: number,
  direction: Direction,
  walkFrame: number, // 0: đứng yên, 1: bước trái, 2: đứng yên, 3: bước phải
  palette: CharacterPalette
) {
  const p = tileSize / 16; // Kích thước 1 hạt pixel
  const bobOffset = (walkFrame === 1 || walkFrame === 3) ? -p : 0; // Nhấp nhô đầu khi bước đi

  ctx.save();
  ctx.translate(screenX, screenY);

  // 1. Bóng đổ dưới chân (Shadow)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.fillRect(3 * p, 13 * p, 10 * p, 2 * p);

  // 2. Đôi chân (Di chuyển theo walkFrame như Pokémon)
  ctx.fillStyle = palette.pants;
  const leftLegY = walkFrame === 1 ? 11 * p : 12 * p;
  const rightLegY = walkFrame === 3 ? 11 * p : 12 * p;
  ctx.fillRect(5 * p, leftLegY, 2.5 * p, 2.5 * p);
  ctx.fillRect(8.5 * p, rightLegY, 2.5 * p, 2.5 * p);

  // 3. Thân áo (Đồng phục học sinh / Giáp)
  ctx.fillStyle = palette.shirt;
  ctx.fillRect(4 * p, 8 * p + bobOffset, 8 * p, 4.5 * p);

  // Cổ áo / Khăn quàng học sinh
  ctx.fillStyle = palette.accent;
  if (direction !== 'UP') {
    ctx.fillRect(6 * p, 8 * p + bobOffset, 4 * p, 1.5 * p);
  }

  // 4. Đôi tay vung vẩy theo nhịp bước
  ctx.fillStyle = palette.shirt;
  const leftArmY = walkFrame === 3 ? 7.5 * p : 8.5 * p;
  const rightArmY = walkFrame === 1 ? 7.5 * p : 8.5 * p;
  ctx.fillRect(2.5 * p, leftArmY + bobOffset, 1.5 * p, 3.5 * p);
  ctx.fillRect(12 * p, rightArmY + bobOffset, 1.5 * p, 3.5 * p);

  // Bàn tay
  ctx.fillStyle = palette.skin;
  ctx.fillRect(2.5 * p, leftArmY + 3 * p + bobOffset, 1.5 * p, 1 * p);
  ctx.fillRect(12 * p, rightArmY + 3 * p + bobOffset, 1.5 * p, 1 * p);

  // 5. Phần Đầu & Khuôn mặt
  ctx.fillStyle = palette.skin;
  ctx.fillRect(4 * p, 3 * p + bobOffset, 8 * p, 5 * p);

  // 6. Mái tóc & Đôi mắt theo 4 hướng (DOWN, UP, LEFT, RIGHT)
  ctx.fillStyle = palette.hair;
  // Đỉnh tóc
  ctx.fillRect(3.5 * p, 1.5 * p + bobOffset, 9 * p, 2.5 * p);

  if (direction === 'DOWN') {
    // Tóc mai hai bên
    ctx.fillRect(3.5 * p, 3.5 * p + bobOffset, 1.5 * p, 3 * p);
    ctx.fillRect(11 * p, 3.5 * p + bobOffset, 1.5 * p, 3 * p);
    // Đôi mắt nhìn thẳng
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(5.5 * p, 5 * p + bobOffset, 1.2 * p, 1.8 * p);
    ctx.fillRect(9.3 * p, 5 * p + bobOffset, 1.2 * p, 1.8 * p);
  } else if (direction === 'UP') {
    // Tóc che kín sau gáy
    ctx.fillRect(3.5 * p, 3 * p + bobOffset, 9 * p, 4.5 * p);
  } else if (direction === 'LEFT') {
    // Tóc phía sau đầu (bên phải)
    ctx.fillRect(8 * p, 3 * p + bobOffset, 4.5 * p, 4 * p);
    // Mắt nhìn sang trái
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(4.8 * p, 5 * p + bobOffset, 1.2 * p, 1.8 * p);
  } else if (direction === 'RIGHT') {
    // Tóc phía sau đầu (bên trái)
    ctx.fillRect(3.5 * p, 3 * p + bobOffset, 4.5 * p, 4 * p);
    // Mắt nhìn sang phải
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(10 * p, 5 * p + bobOffset, 1.2 * p, 1.8 * p);
  }

  ctx.restore();
}