import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Direction } from '../../types';
import { MAPS } from '../../data/maps';
import { STORY_SCRIPTS, DialogueLine } from '../../data/storyPrologue';
import { drawPokemonStyleSprite, PALETTES } from '../../game/renderer/PixelSprite';
import { renderBeautifulTileMap } from '../../game/renderer/TileMapRenderer';
import { PokemonDialogueBox } from '../ui/PokemonDialogueBox';

const TILE_SIZE = 48;

export const GameViewport: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // State bản đồ & nhân vật chính (Karin)
  const [currentMapId, setCurrentMapId] = useState<string>('classroom_day0');
  const [playerPos, setPlayerPos] = useState({ x: 5, y: 4 });
  const [playerDir, setPlayerDir] = useState<Direction>('DOWN');
  const [walkFrame, setWalkFrame] = useState<number>(0);

  // Vị trí Kai đi theo sau lưng Karin (Follower System như Pokémon HGSS/Yellow)
  const [followerPos, setFollowerPos] = useState({ x: 5, y: 3 });
  const [followerDir, setFollowerDir] = useState<Direction>('DOWN');

  // State cốt truyện & hội thoại
  const [dialogueQueue, setDialogueQueue] = useState<DialogueLine[]>(
    STORY_SCRIPTS.classroom_explosion_intro
  );
  const [isTimeskipScreen, setIsTimeskipScreen] = useState(false);
  const [questObjective, setQuestObjective] = useState<string>(
    'Rời khỏi Phòng học 10A và kiểm tra vụ nổ ở Cổng Trường'
  );

  const currentMap = MAPS[currentMapId];
  const activeDialogue = dialogueQueue.length > 0 ? dialogueQueue[0] : null;

  // Chuyển câu thoại tiếp theo
  const advanceDialogue = useCallback(() => {
    setDialogueQueue((prev) => {
      const next = prev.slice(1);
      // Nếu vừa kết thúc đoạn thoại bị hút vào Vết Nứt ở cổng trường -> Chuyển sang màn hình giải thích Ngày 432
      if (
        prev.length === 1 &&
        currentMapId === 'school_gate_day0' &&
        prev[0].text.includes('Nắm chặt tay tớ Karin')
      ) {
        setIsTimeskipScreen(true);
        return STORY_SCRIPTS.timeskip_explanation;
      }
      // Nếu vừa kết thúc màn giải thích Ngày 432 -> Tỉnh dậy ở Map Ngày 432
      if (prev.length === 1 && isTimeskipScreen) {
        setIsTimeskipScreen(false);
        setCurrentMapId('sanctuary_day432');
        setPlayerPos({ x: 7, y: 6 });
        setFollowerPos({ x: 6, y: 6 });
        setQuestObjective('Ngày 432: Trò chuyện với Chỉ huy Rook và khám phá Tiền Đồn');
        return STORY_SCRIPTS.day432_awakening;
      }
      return next;
    });
  }, [currentMapId, isTimeskipScreen]);

  // Xử lý di chuyển 4 hướng kiểu Pokémon
  const movePlayer = useCallback(
    (dx: number, dy: number, dir: Direction) => {
      if (activeDialogue || isTimeskipScreen) return;

      setPlayerDir(dir);
      setWalkFrame((prev) => (prev + 1) % 4);

      const nextX = playerPos.x + dx;
      const nextY = playerPos.y + dy;

      // Kiểm tra giới hạn bản đồ
      if (nextX < 0 || nextX >= currentMap.width || nextY < 0 || nextY >= currentMap.height) {
        return;
      }

      const targetTile = currentMap.tiles[nextY][nextX];

      // Nếu bước tới Vết Nứt (Tile 5) ở Cổng Trường Ngày 0 -> Kích hoạt cốt truyện nổ cổng trường
      if (currentMapId === 'school_gate_day0' && targetTile === 5) {
        setDialogueQueue(STORY_SCRIPTS.gate_anomaly_trigger);
        return;
      }

      // Kiểm tra va chạm (Tường = 1, Bàn = 3, Cây = 6, Đống đổ nát = 7, Vết nứt = 5)
      if ([1, 3, 5, 6, 7].includes(targetTile)) {
        return;
      }

      // Kiểm tra Cổng chuyển Map (Tile 4 hoặc Portal)
      const portal = currentMap.portals.find((p) => p.x === nextX && p.y === nextY);
      if (portal) {
        setCurrentMapId(portal.targetMap);
        setPlayerPos({ x: portal.targetX, y: portal.targetY });
        setFollowerPos({ x: portal.targetX, y: Math.max(1, portal.targetY - 1) });
        if (portal.targetMap === 'school_gate_day0') {
          setQuestObjective('Tiến xuống phía Cổng Trường (vùng Vết Nứt màu tím) để kiểm tra');
        }
        return;
      }

      // Cập nhật Kai đi theo vị trí cũ của Karin
      setFollowerPos({ x: playerPos.x, y: playerPos.y });
      setFollowerDir(playerDir);
      setPlayerPos({ x: nextX, y: nextY });
    },
    [activeDialogue, isTimeskipScreen, playerPos, playerDir, currentMap, currentMapId]
  );

  // Lắng nghe bàn phím (WASD / Mũi tên / Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (activeDialogue) advanceDialogue();
        return;
      }
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          movePlayer(0, -1, 'UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          movePlayer(0, 1, 'DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          movePlayer(-1, 0, 'LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          movePlayer(1, 0, 'RIGHT');
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, activeDialogue, advanceDialogue]);

  // Vòng lặp Render 60FPS lên Canvas
  useEffect(() => {
    let animationFrameId: number;
    let tick = 0;

    const render = () => {
      tick++;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Vẽ Tilemap
      renderBeautifulTileMap(ctx, currentMap, TILE_SIZE, tick);

      // 2. Vẽ NPC Rook nếu đang ở Ngày 432
      if (currentMapId === 'sanctuary_day432') {
        drawPokemonStyleSprite(ctx, 8 * TILE_SIZE, 6 * TILE_SIZE, TILE_SIZE, 'LEFT', 0, PALETTES.rook);
        drawPokemonStyleSprite(ctx, 4 * TILE_SIZE, 4 * TILE_SIZE, TILE_SIZE, 'DOWN', 0, PALETTES.sarah);
      }

      // 3. Vẽ Kai (Follower đi theo sau)
      drawPokemonStyleSprite(
        ctx,
        followerPos.x * TILE_SIZE,
        followerPos.y * TILE_SIZE,
        TILE_SIZE,
        followerDir,
        walkFrame,
        PALETTES.kai
      );

      // 4. Vẽ Karin (Nhân vật chính)
      drawPokemonStyleSprite(
        ctx,
        playerPos.x * TILE_SIZE,
        playerPos.y * TILE_SIZE,
        TILE_SIZE,
        playerDir,
        walkFrame,
        PALETTES.karin
      );

      // 5. Lớp phủ ánh sáng / bầu không khí (Ambient Lighting)
      if (currentMap.ambientDarkness > 0) {
        ctx.fillStyle = `rgba(15, 10, 35, ${currentMap.ambientDarkness})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentMap, currentMapId, playerPos, playerDir, followerPos, followerDir, walkFrame]);

  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden flex items-center justify-center select-none font-mono">
      {/* HUD Góc Trên Trái: Thời gian & Địa điểm (Kiểu Game Handheld) */}
      <div className="fixed top-4 left-4 z-30 bg-slate-900/90 border-2 border-slate-400 px-4 py-2 rounded shadow-lg">
        <div className="text-xs text-rose-400 font-bold tracking-widest">{currentMap.dayLabel}</div>
        <div className="text-sm text-white font-bold">{currentMap.name}</div>
      </div>

      {/* HUD Góc Trên Phải: Mục tiêu nhiệm vụ hiện tại */}
      <div className="fixed top-4 right-4 z-30 bg-slate-900/90 border-2 border-amber-400/80 px-4 py-2 rounded shadow-lg max-w-xs">
        <div className="text-[11px] text-amber-300 uppercase font-bold">Mục tiêu hiện tại</div>
        <div className="text-xs text-slate-100 mt-0.5">{questObjective}</div>
      </div>

      {/* Màn hình Cutscene Chuyển Giao Ngày 0 -> Ngày 432 */}
      {isTimeskipScreen ? (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center p-8 text-center">
          <div className="text-purple-400 text-sm tracking-[0.3em] uppercase mb-3 animate-pulse">
            [ TRẠNG THÁI: PHONG ẤN TRONG KÉN THỜI GIAN ]
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wider mb-6">
            NGÀY 0 ➔ NGÀY 432
          </h1>
        </div>
      ) : (
        /* Khung Canvas Game Chính */
        <div
          className={`border-4 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.9)] rounded overflow-hidden ${
            activeDialogue?.shakeScreen ? 'animate-bounce' : ''
          }`}
        >
          <canvas
            ref={canvasRef}
            width={currentMap.width * TILE_SIZE}
            height={currentMap.height * TILE_SIZE}
            className="block bg-black"
          />
        </div>
      )}

      {/* Hộp thoại RPG cổ điển */}
      {activeDialogue && <PokemonDialogueBox line={activeDialogue} onNext={advanceDialogue} />}
    </div>
  );
};