import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ChevronDown, Smile, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenCake: () => void;
}

const HUG_MESSAGES = [
  'Sending the tightest, warmest squeezy hug to Manahil! 🧸💖',
  'One super extra cozy warm bear hug from Hamza delivered! 🥰',
  'Holding you tight and never letting go, Manahil! 💕✨',
  'A 1000% pure unconditional love hug from Hamza! 🌸',
  'Manahil is officially wrapped in Hamza\'s warmest hug forever! 🫂💫',
  'Maximum cuddle power activated for my favorite girl! 💖🍬',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onOpenCake }) => {
  const [hugCount, setHugCount] = useState<number>(0);
  const [lastMessage, setLastMessage] = useState<string>('');
  const [isHugging, setIsHugging] = useState<boolean>(false);

  const handleHugClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Audio effect
    soundManager.playHugSound();

    // Trigger colorful pastel confetti explosion
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { x, y },
      colors: ['#FDA4AF', '#F472B6', '#D8B4FE', '#C084FC', '#86EFAC', '#FDE047'],
      ticks: 200,
      gravity: 0.9,
      scalar: 1.1,
      shapes: ['circle'],
    });

    // Secondary soft heart confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.65 },
        colors: ['#FDA4AF', '#D8B4FE', '#86EFAC'],
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.65 },
        colors: ['#FDA4AF', '#D8B4FE', '#86EFAC'],
      });
    }, 150);

    const nextCount = hugCount + 1;
    setHugCount(nextCount);
    const randomMsg = HUG_MESSAGES[(nextCount - 1) % HUG_MESSAGES.length];
    setLastMessage(randomMsg);
    setIsHugging(true);

    setTimeout(() => {
      setIsHugging(false);
    }, 2800);
  };

  return (
    <header
      id="hero-section"
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-12 pb-16 z-10"
    >
      {/* Decorative top badge */}
      <div
        id="hero-badge"
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/80 shadow-xs mb-6 backdrop-blur-sm animate-fade-in"
      >
        <span className="flex h-2 w-2 rounded-full bg-rose-400 animate-ping" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-rose-600 uppercase">
          Today is all about you, Manahil
        </span>
        <Sparkles size={14} className="text-amber-400" />
      </div>

      {/* Main bold headline */}
      <h1
        id="hero-title"
        className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-800 max-w-4xl leading-[1.15] drop-shadow-xs"
      >
        Happy Birthday,{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500">
          My Entire World!
        </span>{' '}
        🎉
      </h1>

      {/* Playful subheadline */}
      <p
        id="hero-subtitle"
        className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl font-medium leading-relaxed"
      >
        To Manahil: the sweetest rasgulla, the most precious chaos, and the brightest part of
        Hamza's world. Today, tomorrow, and forever, you have my whole heart.
      </p>

      {/* Interactive Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        {/* Click for a Hug button */}
        <button
          id="click-for-a-hug-btn"
          onClick={handleHugClick}
          className={`group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-bold text-white shadow-md transition-all duration-300 active:scale-95 ${
            isHugging
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 scale-105 shadow-pink-200/70 shadow-lg'
              : 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 hover:from-rose-500 hover:via-pink-500 hover:to-rose-500 hover:shadow-lg hover:shadow-pink-200/50 hover:-translate-y-0.5'
          }`}
          aria-label="Click for a Hug"
        >
          <Heart
            className={`w-5 h-5 text-white transition-transform duration-300 ${
              isHugging ? 'scale-125 fill-white animate-pulse' : 'group-hover:scale-110 fill-white/80'
            }`}
          />
          <span>Click for a Hug 🫂</span>
          <Sparkles className="w-4 h-4 text-pink-200" />
        </button>

        {/* Quick link to Virtual Cake */}
        <button
          id="hero-cake-btn"
          onClick={onOpenCake}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-semibold text-purple-700 bg-purple-100/90 hover:bg-purple-200 border border-purple-200/80 shadow-xs transition-all duration-200 hover:-translate-y-0.5"
        >
          <Flame size={18} className="text-amber-500" />
          <span>Blow Out Candles 🎂</span>
        </button>
      </div>

      {/* Dynamic Hug feedback card */}
      {hugCount > 0 && (
        <div
          id="hug-feedback-container"
          className="mt-6 inline-flex flex-col items-center gap-1.5 p-4 rounded-2xl bg-white/90 border border-pink-100 shadow-xs backdrop-blur-sm transition-all duration-300 animate-in fade-in zoom-in-95"
        >
          <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm sm:text-base">
            <Smile size={18} className="text-pink-500" />
            <span>Hugs delivered: <strong className="text-rose-700">{hugCount}</strong> warm hug{hugCount > 1 ? 's' : ''}</span>
          </div>
          {lastMessage && (
            <p className="text-xs sm:text-sm text-slate-600 font-medium italic max-w-sm">
              "{lastMessage}"
            </p>
          )}
        </div>
      )}

      {/* Floating gentle down indicator */}
      <div className="mt-12">
        <button
          id="scroll-to-nicknames-btn"
          onClick={onExploreClick}
          aria-label="Scroll to nicknames section"
          className="inline-flex flex-col items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer group"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 group-hover:text-rose-500 transition-colors">
            Our Story & Nicknames
          </span>
          <ChevronDown size={20} className="animate-bounce" />
        </button>
      </div>
    </header>
  );
};
