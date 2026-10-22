import React from 'react';
import { DialogueLine } from '../../data/storyPrologue';

interface Props {
  line: DialogueLine;
  onNext: () => void;
}

export const PokemonDialogueBox: React.FC<Props> = ({ line, onNext }) => {
  return (
    <div
      onClick={onNext}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl bg-slate-950/95 border-4 border-slate-200 rounded-md p-5 shadow-[0_0_0_4px_#0f172a,0_10px_30px_rgba(0,0,0,0.9)] cursor-pointer select-none z-50 font-mono"
    >
      {/* Nhãn tên nhân vật góc trên bên trái */}
      <div className="inline-block bg-rose-700 border-2 border-slate-200 text-white font-bold px-3 py-0.5 text-sm tracking-wider uppercase -mt-9 mb-2 shadow-md">
        {line.speaker}
      </div>

      {/* Nội dung thoại */}
      <p className="text-slate-100 text-base md:text-lg leading-relaxed min-h-[3.5rem]">
        {line.text}
      </p>

      {/* Mũi tên nhấp nháy kiểu Pokémon báo hiệu bấm tiếp */}
      <div className="flex justify-end items-center gap-2 mt-1 text-xs text-amber-400 animate-bounce">
        <span>NHẤN [SPACE] HOẶC CLICK ĐỂ TIẾP TỤC</span>
        <span>▼</span>
      </div>
    </div>
  );
};