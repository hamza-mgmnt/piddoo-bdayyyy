import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CandleState } from '../types';
import { soundManager } from '../utils/audio';
import { X, Sparkles, Flame, RotateCcw, Volume2, VolumeX, Music, Heart, Wind } from 'lucide-react';

interface BirthdayCakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPlayingSong: boolean;
  onToggleSong: () => void;
  currentSongNote?: string;
}

const INITIAL_CANDLES: CandleState[] = [
  { id: 1, isLit: true, color: '#F472B6' }, // Pink
  { id: 2, isLit: true, color: '#C084FC' }, // Lavender
  { id: 3, isLit: true, color: '#34D399' }, // Mint
  { id: 4, isLit: true, color: '#FB7185' }, // Rose
  { id: 5, isLit: true, color: '#FBBF24' }, // Gold
];

export const BirthdayCakeModal: React.FC<BirthdayCakeModalProps> = ({
  isOpen,
  onClose,
  isPlayingSong,
  onToggleSong,
  currentSongNote,
}) => {
  const [candles, setCandles] = useState<CandleState[]>(INITIAL_CANDLES);
  const [userWish, setUserWish] = useState<string>('');
  const [wishSaved, setWishSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const litCandlesCount = candles.filter((c) => c.isLit).length;
  const allBlownOut = litCandlesCount === 0;

  const blowCandle = (id: number) => {
    soundManager.playCandleBlowSound();

    const updated = candles.map((c) => (c.id === id ? { ...c, isLit: false } : c));
    setCandles(updated);

    const remaining = updated.filter((c) => c.isLit).length;
    if (remaining === 0) {
      triggerVictoryCelebration();
    }
  };

  const blowAllCandles = () => {
    soundManager.playCandleBlowSound();
    setCandles(candles.map((c) => ({ ...c, isLit: false })));
    triggerVictoryCelebration();
  };

  const relightCandles = () => {
    setCandles(INITIAL_CANDLES);
    setWishSaved(false);
  };

  const triggerVictoryCelebration = () => {
    // Grand celebration fireworks
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#FDA4AF', '#F472B6', '#D8B4FE', '#86EFAC', '#FDE047', '#38BDF8'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div
      id="birthday-cake-modal"
      className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gradient-to-b from-[#FFF5F7] to-[#FDF2F8] border border-pink-200/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl my-8 text-center animate-in zoom-in-95"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 transition-colors shadow-2xs"
          aria-label="Close cake modal"
        >
          <X size={20} />
        </button>

        {/* Music button inside modal */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={onToggleSong}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
              isPlayingSong
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-white text-rose-600 border border-pink-200 hover:bg-pink-50'
            }`}
          >
            {isPlayingSong ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{isPlayingSong ? 'Song Playing 🎶' : 'Play Birthday Song 🎵'}</span>
          </button>
          {currentSongNote && (
            <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2.5 py-1 rounded-full animate-bounce">
              {currentSongNote}
            </span>
          )}
        </div>

        {/* Modal Title */}
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Make a Birthday Wish, Manahil! 🎂
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {allBlownOut
            ? '✨ All candles blown out! Your wish is sealed with all of Hamza\'s love! ✨'
            : 'Click on the glowing candles (or the blow button) to blow them out, Manahil!'}
        </p>

        {/* VIRTUAL CAKE ILLUSTRATION */}
        <div className="relative my-8 flex flex-col items-center justify-center select-none">
          {/* CANDLES ROW */}
          <div className="flex items-end justify-center gap-4 sm:gap-6 z-20 mb-[-6px]">
            {candles.map((candle) => (
              <div
                key={candle.id}
                onClick={() => candle.isLit && blowCandle(candle.id)}
                className="flex flex-col items-center cursor-pointer group"
                title={candle.isLit ? 'Click to blow out candle' : 'Blown out'}
              >
                {/* Flame / Smoke */}
                <div className="h-8 flex items-center justify-center mb-0.5">
                  {candle.isLit ? (
                    <div className="relative flex flex-col items-center animate-bounce">
                      {/* Outer yellow halo */}
                      <div className="w-4 h-6 bg-gradient-to-t from-amber-500 via-yellow-300 to-amber-100 rounded-full blur-[1px] shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse" />
                      {/* Inner blue spark base */}
                      <div className="absolute bottom-0 w-2 h-2.5 bg-blue-300 rounded-full opacity-80" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Wind size={14} className="text-slate-400 animate-pulse" />
                      <span className="text-[10px] text-slate-400 font-medium">puff~</span>
                    </div>
                  )}
                </div>

                {/* Candle Stick */}
                <div
                  className="w-3.5 sm:w-4 h-12 rounded-t-sm shadow-xs border-t border-white/60 relative overflow-hidden transition-all group-hover:scale-105"
                  style={{ backgroundColor: candle.color }}
                >
                  {/* Candle wick */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-slate-800" />
                  {/* Spiral stripes */}
                  <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,#fff_3px,#fff_6px)]" />
                </div>
              </div>
            ))}
          </div>

          {/* CAKE TIER 1 (Top tier) */}
          <div className="relative z-10 w-44 sm:w-52 h-14 bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 rounded-t-2xl border-2 border-pink-300 shadow-md flex items-center justify-around px-3">
            {/* Cute Cream dollops */}
            <div className="absolute -top-3 left-0 right-0 flex justify-around">
              {['🍓', '🧁', '🍓', '🧁', '🍓'].map((item, i) => (
                <span key={i} className="text-sm sm:text-base drop-shadow-2xs">
                  {item}
                </span>
              ))}
            </div>
            {/* Frosting drips */}
            <div className="w-full text-center text-xs font-bold text-rose-700 tracking-wider uppercase">
              Happy Birthday Manahil
            </div>
          </div>

          {/* CAKE TIER 2 (Middle tier) */}
          <div className="relative z-5 w-56 sm:w-64 h-16 bg-gradient-to-r from-purple-200 via-pink-100 to-purple-200 rounded-t-xl border-2 border-purple-300 shadow-md flex items-center justify-around px-4">
            <div className="text-center font-handwriting text-2xl font-bold text-purple-700">
              Forever My Jaanu Manahil ❤️
            </div>
          </div>

          {/* CAKE TIER 3 (Bottom base tier) */}
          <div className="relative w-68 sm:w-76 h-18 bg-gradient-to-r from-emerald-100 via-pink-100 to-emerald-100 rounded-t-xl border-2 border-emerald-200 shadow-lg flex items-center justify-around px-6">
            <div className="flex gap-2 items-center text-xs font-semibold text-emerald-800">
              <span>🌸</span>
              <span>Hamza ❤️ Manahil • Forever & Always</span>
              <span>🌸</span>
            </div>
          </div>

          {/* CAKE STAND / PLATE */}
          <div className="w-76 sm:w-88 h-4 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-full shadow-md border border-slate-300 mt-[-2px]" />
          <div className="w-32 h-5 bg-gradient-to-r from-slate-300 via-white to-slate-300 rounded-b-lg shadow-sm" />
        </div>

        {/* CANDLE ACTIONS */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {!allBlownOut ? (
            <button
              id="blow-all-candles-btn"
              onClick={blowAllCandles}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Wind size={18} />
              <span>Blow All Candles Out 💨</span>
            </button>
          ) : (
            <button
              id="relight-candles-btn"
              onClick={relightCandles}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all duration-200 hover:scale-105"
            >
              <RotateCcw size={16} />
              <span>Relight Candles 🕯️</span>
            </button>
          )}
        </div>

        {/* WISH BOX SECTION */}
        {allBlownOut && (
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/95 border border-pink-200 shadow-sm text-left animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-2">
              <Sparkles size={16} className="text-amber-500" />
              <span>Lock In Your Birthday Wish, Manahil 🌠</span>
            </div>
            {wishSaved ? (
              <div className="p-3 bg-pink-50 rounded-xl border border-pink-200 text-rose-700 text-sm font-medium">
                💖 Manahil's wish has been locked into the universe: <em>"{userWish}"</em>. May every piece of it come true!
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Type your secret birthday wish here, Manahil..."
                  value={userWish}
                  onChange={(e) => setUserWish(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
                <button
                  onClick={() => {
                    if (userWish.trim()) {
                      setWishSaved(true);
                      triggerVictoryCelebration();
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-xs hover:opacity-95 transition-opacity"
                >
                  Seal Wish with Confetti ✨
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
