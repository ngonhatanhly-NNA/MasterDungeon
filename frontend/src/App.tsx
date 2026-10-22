import React, { useState } from 'react';
import { GameViewport } from './components/screens/GameViewport';

export function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="w-screen h-screen bg-slate-950 flex flex-col items-center justify-center font-mono text-white select-none p-4">
        <div className="border-4 border-slate-300 bg-slate-900 p-10 rounded-lg shadow-[0_0_40px_rgba(147,51,234,0.35)] text-center max-w-lg w-full">
          <p className="text-xs text-purple-400 tracking-[0.25em] uppercase mb-2">
            2D PIXEL TOP-DOWN RPG
          </p>
          <h1 className="text-4xl font-extrabold tracking-wider text-amber-400 mb-4">
            MASTER DUNGEON
          </h1>
          <p className="text-sm text-slate-300 mb-8 leading-relaxed">
            Từ buổi học chiều định mệnh tại Phòng 10A đến 432 ngày bị phong ấn dưới tâm chấn Cổng Trường...
          </p>
          <button
            onClick={() => setStarted(true)}
            className="w-full py-3 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 border-2 border-white font-bold text-lg tracking-wider transition cursor-pointer"
          >
            ▶ BẮT ĐẦU HÀNH TRÌNH (NEW GAME)
          </button>
        </div>
      </div>
    );
  }

  return <GameViewport />;
}

export default App;