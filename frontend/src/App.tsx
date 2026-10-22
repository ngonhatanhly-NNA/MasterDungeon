import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookOpen, Heart, Map as MapIcon, Package, Save, RotateCcw, Volume2, VolumeX, Users, Radio } from 'lucide-react';
import { MAPS } from './data/maps';
import { NPCS } from './data/npcs';
import { ITEMS } from './data/items';
import { QUESTS } from './data/quests';
import type { Direction, GameState } from './types';
import { createInitialState, interact, stepGame, chooseDialogue } from './game/engine/gameLogic';
import { loadGame, saveGame } from './game/save/saveGame';

const CHARACTER_ART: Record<string, string> = {
  karin: '/assets/characters/karin-portrait.webp',
  kai: '/assets/characters/kai-portrait.webp',
  sarah: '/assets/characters/sarah-portrait.webp',
  mira: '/assets/characters/mira-portrait.webp',
  archivist: '/assets/characters/nadiya-portrait.webp',
};

const COMPANIONS = [
  { id: 'sarah', name: 'Sarah', role: 'Bác sĩ', image: '/assets/characters/sarah-portrait.webp' },
  { id: 'mira', name: 'Mira', role: 'Người đưa tin', image: '/assets/characters/mira-portrait.webp' },
  { id: 'jun', name: 'Jun', role: 'Thợ máy', image: '/assets/characters/jun-portrait.webp' },
  { id: 'nadiya', name: 'Dr. Nadiya', role: 'Nhà nghiên cứu', image: '/assets/characters/nadiya-portrait.webp' },
  { id: 'rook', name: 'Rook', role: 'Cựu Meridian', image: '/assets/characters/rook-portrait.webp' },
  { id: 'yuna', name: 'Yuna', role: 'Người vẽ bản đồ', image: '/assets/characters/yuna-portrait.webp' },
];

const DIR_KEYS: Record<string, Direction> = {
  w: 'up', arrowup: 'up', a: 'left', arrowleft: 'left', s: 'down', arrowdown: 'down', d: 'right', arrowright: 'right',
};

export default function App() {
  const [state, setState] = useState<GameState>(() => createInitialState());
  const [panel, setPanel] = useState<'quest' | 'inventory' | 'journal' | null>('quest');
  const [musicOn, setMusicOn] = useState(false);
  const [hasSave, setHasSave] = useState(() => Boolean(localStorage.getItem('zombie-rpg-save-v2')));

  const map = MAPS[state.mapId];
  const activeNPCs = useMemo(() => NPCS.filter((npc) => npc.mapId === state.mapId), [state.mapId]);
  const currentLine = state.dialogue?.lines[state.dialogue.index] ?? '';
  const speaker = activeNPCs.find((npc) => npc.id === state.dialogue?.npcId);

  const onKey = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) event.preventDefault();
    if (key === 'e' || key === 'enter' || key === ' ') {
      setState((previous) => interact(previous));
      return;
    }
    const direction = DIR_KEYS[key];
    if (direction) setState((previous) => stepGame(previous, direction));
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  const handleSave = () => {
    const ok = saveGame(state);
    setHasSave(ok || hasSave);
    setState((previous) => ({ ...previous, toast: ok ? 'Đã lưu game vào localStorage.' : 'Không thể lưu. Hãy kiểm tra chế độ riêng tư của trình duyệt.' }));
  };

  const handleLoad = () => {
    const loaded = loadGame();
    if (loaded) { setState(loaded); setHasSave(true); }
    else setState((previous) => ({ ...previous, toast: 'Không tìm thấy save hợp lệ.' }));
  };

  const handleReset = () => {
    setState(createInitialState());
    setPanel('quest');
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup"><span className="brand-mark">ZR</span><div><div className="eyebrow">STORY-DRIVEN SURVIVAL RPG</div><h1>ECHOES OF THE DEAD</h1></div></div>
        <div className="top-actions">
          <button className="icon-button" title="Bật/tắt âm thanh (placeholder)" onClick={() => setMusicOn((v) => !v)}>{musicOn ? <Volume2 size={17} /> : <VolumeX size={17} />}<span>{musicOn ? 'Âm thanh' : 'Im lặng'}</span></button>
          <button className="icon-button" onClick={handleSave}><Save size={17} /><span>Save</span></button>
          <button className="icon-button" onClick={handleLoad} disabled={!hasSave}><RotateCcw size={17} /><span>Load</span></button>
        </div>
      </header>

      <div className="layout-grid">
        <section className="main-column">
          <div className="location-heading">
            <div><div className="eyebrow">CHAPTER 01 · THE SIGNAL</div><h2>{map.name}</h2><p>{map.subtitle}</p></div>
            <div className="chapter-badge"><span className="pulse-dot" /> DAY 412 <span>·</span> 03:17 AM</div>
          </div>

          <section className="relationship-banner" aria-label="Cốt truyện Karin và Kai">
            <div className="relationship-copy">
              <div className="eyebrow"><Radio size={13} /> THE SIGNAL · 03:17</div>
              <h3>Hai người sống sót. Một bí mật.</h3>
              <p>“Dù thế giới có sụp đổ, anh vẫn muốn đi cùng em.”</p>
              <div className="relationship-tags"><span><Heart size={12} /> KARIN × KAI</span><span>CHAPTER 01</span></div>
            </div>
            <img src="/assets/characters/karin-kai-bond.webp" alt="Karin và Kai ở gần nhau giữa thế giới hậu tận thế" />
          </section>

          <div className="game-frame">
            <div className="scene-skyline"><span>GREYBRIDGE QUARANTINE ZONE</span><span>NO SIGNAL / NO RESCUE</span></div>
            <div className="world-grid" style={{ gridTemplateColumns: `repeat(${map.tiles[0].length}, minmax(0, 1fr))` }} aria-label={`${map.name} game map`}>
              {map.tiles.flatMap((row, y) => row.split('').map((tile, x) => {
                const npc = activeNPCs.find((person) => person.x === x && person.y === y);
                const exit = map.exits.find((point) => point.x === x && point.y === y);
                const pickup = map.items.find((item) => item.x === x && item.y === y && !state.collectedItems.includes(item.id));
                const isPlayer = state.player.x === x && state.player.y === y;
                const tileClass = tile === '#' ? 'tile wall' : tile === 'g' ? 'tile debris' : tile === '~' ? 'tile water' : 'tile floor';
                return <div key={`${x}-${y}`} className={`${tileClass}${exit ? ' exit-tile' : ''}${isPlayer ? ' player-tile' : ''}`}>
                  {exit && <span className="exit-glyph">⇢</span>}
                  {pickup && <span className="item-glyph" title={pickup.name}>{pickup.icon}</span>}
                  {npc && <span className={`character-glyph ${npc.id === 'kai' ? 'kai-glyph' : ''}`} title={`${npc.name} — ${npc.role}`}>
                    {CHARACTER_ART[npc.id] ? <img className="map-character-image" src={CHARACTER_ART[npc.id]} alt={npc.name} /> : <span className="fallback-glyph">{npc.icon}</span>}
                    <small>{npc.name}</small>
                  </span>}
                  {isPlayer && <span className="player-glyph" title="Karin"><span className="player-arrow">{state.direction === 'up' ? '▲' : state.direction === 'down' ? '▼' : state.direction === 'left' ? '◀' : '▶'}</span><img className="map-character-image player-face" src={CHARACTER_ART.karin} alt="Karin" /><small>Karin</small></span>}
                </div>;
              }))}
            </div>
            <div className="map-legend"><span><i className="legend-player" /> Karin</span><span><i className="legend-npc" /> NPC</span><span><i className="legend-exit" /> Lối sang map</span><span><i className="legend-item" /> Vật phẩm</span></div>
            {state.dialogue && <div className="dialogue-overlay">
              <div className="dialogue-speaker"><img className="speaker-portrait" src={CHARACTER_ART[state.dialogue.npcId] ?? CHARACTER_ART.kai} alt={speaker?.name ?? 'Nhân vật'} /><div><strong>{speaker?.name ?? (state.dialogue.npcId === 'kai' ? 'Kai' : 'Unknown')}</strong><small>{speaker?.role ?? 'Đồng hành'}</small></div><span className="dialogue-count">{state.dialogue.index + 1}/{state.dialogue.lines.length}</span></div>
              <p>{currentLine}</p>
              {state.dialogue.choices?.length ? <div className="dialogue-choices" aria-label="Chọn phản hồi của Karin">
                <div className="choice-label">KARIN · CHỌN CÁCH TRẢ LỜI</div>
                {state.dialogue.choices.map((choice, index) => <button key={choice.id} onClick={() => setState((previous) => chooseDialogue(previous, choice.id))}><span>0{index + 1}</span>{choice.text}</button>)}
              </div> : <button className="continue-button" onClick={() => setState((previous) => interact(previous))}>TIẾP TỤC <span> E ↵</span></button>}
            </div>}
          </div>

          <div className="controls-row">
            <div className="keyboard-help"><div className="key-cluster"><kbd>W</kbd><div><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div></div><span><strong>Di chuyển</strong><small>WASD / phím mũi tên</small></span></div>
            <div className="keyboard-help"><kbd className="key-e">E</kbd><span><strong>Tương tác</strong><small>Nói chuyện / tiếp tục hội thoại</small></span></div>
            <div className="toast-message" role="status">{state.toast || 'Tín hiệu radio vẫn đang phát…'}</div>
          </div>

          <div className="mobile-controls" aria-label="Điều khiển di chuyển">
            <button onClick={() => setState((s) => stepGame(s, 'up'))}>▲</button>
            <div><button onClick={() => setState((s) => stepGame(s, 'left'))}>◀</button><button onClick={() => setState((s) => stepGame(s, 'down'))}>▼</button><button onClick={() => setState((s) => stepGame(s, 'right'))}>▶</button></div>
            <button className="mobile-interact" onClick={() => setState((s) => interact(s))}>E · TƯƠNG TÁC</button>
          </div>

          <section className="story-hook">
            <div className="story-icon">⌁</div><div><div className="eyebrow">BÍ ẨN ĐANG MỞ RA</div><p>03:17 — bộ đàm phát đi một tọa độ từ St. Oran Hospital. Vấn đề là bệnh viện đã bị phong tỏa <em>trước khi</em> đại dịch bắt đầu.</p></div>
          </section>
        </section>

        <aside className="sidebar">
          <section className="panel character-panel">
            <div className="panel-title"><span>NHÂN VẬT</span><span className="online-tag">2 SURVIVORS</span></div>
            <div className="lead-card karin-card"><div className="portrait portrait-karin"><img src={CHARACTER_ART.karin} alt="Karin, tóc đen thuần và đôi mắt mèo" /><span className="portrait-chip">LEAD</span></div><div className="lead-info"><div className="lead-name">Karin <span className="height-chip">170 cm</span></div><div className="lead-role">THE LISTENER · 22 tuổi</div><p>Tóc đen thuần, mắt mèo tinh nghịch. Nhanh trí, hay trêu người khác để giấu nỗi sợ.</p><div className="stat-line"><span>QUAN SÁT</span><div className="stat-bar"><i style={{ width: '88%' }} /></div></div></div></div>
            <div className="lead-card kai-card"><div className="portrait portrait-kai"><img src={CHARACTER_ART.kai} alt="Kai, cựu nhân viên cứu hộ" /><span className="portrait-chip">GUARD</span></div><div className="lead-info"><div className="lead-name">Kai <span className="height-chip">190 cm</span></div><div className="lead-role">THE SHIELD · 24 tuổi</div><p>Cựu nhân viên cứu hộ, lạnh lùng với cả thế giới nhưng luôn để mắt đến Karin.</p><div className="stat-line"><span>BẢO VỆ</span><div className="stat-bar blue"><i style={{ width: '93%' }} /></div></div></div></div>
            <div className="bond-row"><div className="bond-label"><Heart size={14} /><span>LIÊN KẾT</span></div><div className="bond-meter"><i style={{ width: `${state.bond * 10}%` }} /></div><strong>{state.bond}/10</strong></div>
            <p className="bond-note">Tin tưởng được xây bằng lựa chọn và sự thật, không chỉ bằng lời hứa.</p>
          </section>

          <section className="panel quest-panel">
            <div className="panel-title"><span><BookOpen size={15} /> QUEST LOG</span><span className="quest-count">{state.quest.completed ? '1/1' : state.quest.started ? '0/1' : '—'}</span></div>
            <div className="quest-type">MAIN QUEST · CHAPTER 01</div>
            <h3>{QUESTS['the-old-key'].title}</h3>
            <p className="quest-desc">{state.quest.completed ? 'Sarah đã nhận được chìa khóa. Manh mối về Ward 0 đang chờ.' : 'Tìm chiếc chìa khóa cũ trên Old Road, sau đó quay lại gặp Sarah.'}</p>
            <div className={`objective ${state.quest.foundKey ? 'complete' : ''}`}><span>{state.quest.foundKey ? '✓' : '○'}</span><p>{QUESTS['the-old-key'].objectives[0]}</p></div>
            <div className={`objective ${state.quest.completed ? 'complete' : ''}`}><span>{state.quest.completed ? '✓' : '○'}</span><p>{QUESTS['the-old-key'].objectives[1]}</p></div>
            <div className="reward-row"><span>PHẦN THƯỞNG</span><strong>💧 Water ×1</strong></div>
            {!state.quest.started && <div className="quest-hint">Nói chuyện với Sarah để nhận quest.</div>}
          </section>

          <section className="panel utility-panel">
            <div className="utility-tabs">
              <button className={panel === 'inventory' ? 'active' : ''} onClick={() => setPanel(panel === 'inventory' ? null : 'inventory')}><Package size={15} /> Túi đồ</button>
              <button className={panel === 'journal' ? 'active' : ''} onClick={() => setPanel(panel === 'journal' ? null : 'journal')}><BookOpen size={15} /> Nhật ký</button>
              <button className={panel === 'quest' ? 'active' : ''} onClick={() => setPanel(panel === 'quest' ? null : 'quest')}><MapIcon size={15} /> Quest</button>
            </div>
            {panel === 'inventory' && <div className="utility-content"><h3>INVENTORY</h3>{Object.entries(state.inventory).filter(([, count]) => count > 0).map(([id, count]) => <div className="inventory-item" key={id}><span className="item-icon">{ITEMS[id]?.icon ?? '📦'}</span><span>{ITEMS[id]?.name ?? id}</span><strong>×{count}</strong></div>)}{Object.values(state.inventory).every((count) => count < 1) && <p className="empty-state">Túi đồ đang trống.</p>}</div>}
            {panel === 'journal' && <div className="utility-content"><h3>JOURNAL</h3>{state.journal.slice().reverse().map((entry, index) => <p className="journal-entry" key={`${entry}-${index}`}>— {entry}</p>)}</div>}
            {panel === 'quest' && <div className="utility-content"><h3>ĐƯỜNG ĐI</h3><div className="route-list"><span className={state.mapId === 'safe-haven' ? 'here' : ''}>01 · Safe Haven</span><span className={state.mapId === 'old-road' ? 'here' : ''}>02 · Old Road</span><span className={state.mapId === 'abandoned-town' ? 'here' : ''}>03 · Abandoned Town</span><span className={state.mapId === 'hospital' ? 'here' : ''}>04 · St. Oran Hospital</span><span className={state.mapId === 'city' ? 'here' : ''}>05 · Greybridge City</span></div></div>}
          </section>
          <section className="panel companions-panel">
            <div className="panel-title"><span><Users size={15} /> ĐỒNG HÀNH</span><span className="online-tag">6 SURVIVORS</span></div>
            <div className="companions-grid">{COMPANIONS.map((companion) => <div className="companion-mini" key={companion.id} title={`${companion.name} — ${companion.role}`}><img src={companion.image} alt={companion.name} /><div><strong>{companion.name}</strong><small>{companion.role}</small></div></div>)}</div>
            <p className="companions-note">Mỗi người đều có bí mật, động cơ và tuyến nhiệm vụ riêng.</p>
          </section>
          <button className="reset-button" onClick={handleReset}>Bắt đầu lại phiên chơi <RotateCcw size={14} /></button>
        </aside>
      </div>
      <footer className="footer"><span>BUILD 0.3.0 · STORY ART PASS</span><span>GAME FIRST. AI LATER.</span><span>© ZOMBIE RPG ORIGINAL WORLD</span></footer>
    </main>
  );
}
