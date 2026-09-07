import React, { useState } from 'react';
import { NicknameItem } from '../types';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';

const NICKNAMES_DATA: NicknameItem[] = [
  {
    id: 'rasgullu',
    name: 'Rasgulluuuu',
    emoji: '🍬',
    note: "Because you're the sweetest thing in my life.",
    theme: 'pink',
    subtext: 'Sweet, soft & 100% lovable',
  },
  {
    id: 'billu',
    name: 'Billu',
    emoji: '🐱',
    note: 'My adorable, mischievous little kitten.',
    theme: 'lavender',
    subtext: 'Purrs when happy, attacks when sleepy',
  },
  {
    id: 'piddi',
    name: 'PIDDI',
    emoji: '🤏',
    note: 'Tiny in size, but huge in my heart.',
    theme: 'mint',
    subtext: 'Pocket-sized bundle of pure joy',
  },
  {
    id: 'jaanu',
    name: 'Jaaanuuuuuuuu',
    emoji: '❤️',
    note: 'My main person, forever and always.',
    theme: 'pink',
    subtext: 'The one and only home for my heart',
  },
  {
    id: 'pappu-paratha',
    name: 'Pappu Paratha',
    emoji: '🥞',
    note: 'Warm, comforting, and my ultimate favorite comfort food.',
    theme: 'lavender',
    subtext: 'Best remedy for any bad day',
  },
  {
    id: 'wild-cat',
    name: 'Wild Cat',
    emoji: '🐆',
    note: 'Feisty, fierce, and keeps life exciting!',
    theme: 'mint',
    subtext: 'Never a dull moment with you',
  },
];

export const NicknamesGrid: React.FC = () => {
  // Store flipped state for each card to support click/tap on mobile as well as hover
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getThemeStyles = (theme: 'pink' | 'lavender' | 'mint') => {
    switch (theme) {
      case 'pink':
        return {
          frontBg: 'bg-[#FFF0F3] hover:bg-[#FFE4E8]',
          border: 'border-pink-200',
          accent: 'text-rose-600',
          badge: 'bg-rose-100 text-rose-700',
          backBg: 'bg-gradient-to-br from-rose-400 via-pink-400 to-rose-400 text-white',
          quoteColor: 'text-pink-50',
          subColor: 'text-rose-100',
        };
      case 'lavender':
        return {
          frontBg: 'bg-[#FAF5FF] hover:bg-[#F3E8FF]',
          border: 'border-purple-200',
          accent: 'text-purple-600',
          badge: 'bg-purple-100 text-purple-700',
          backBg: 'bg-gradient-to-br from-purple-400 via-fuchsia-400 to-indigo-400 text-white',
          quoteColor: 'text-purple-50',
          subColor: 'text-purple-100',
        };
      case 'mint':
        return {
          frontBg: 'bg-[#F0FDF4] hover:bg-[#DCFCE7]',
          border: 'border-emerald-200',
          accent: 'text-emerald-600',
          badge: 'bg-emerald-100 text-emerald-700',
          backBg: 'bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-500 text-white',
          quoteColor: 'text-emerald-50',
          subColor: 'text-emerald-100',
        };
    }
  };

  return (
    <section id="nicknames-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-rose-600 text-xs font-bold tracking-wide uppercase mb-3">
          <Sparkles size={14} />
          <span>Special Dictionary</span>
        </div>
        <h2 id="nicknames-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
          The Many Names of Manahil 💕
        </h2>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          Hover or tap each card to reveal the special story behind Hamza's favorite nicknames for you.
        </p>
      </div>

      {/* 6-card interactive grid */}
      <div id="nicknames-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {NICKNAMES_DATA.map((item) => {
          const styles = getThemeStyles(item.theme);
          const isFlipped = !!flippedCards[item.id];

          return (
            <div
              key={item.id}
              id={`card-container-${item.id}`}
              className="group perspective-1000 h-64 sm:h-72 cursor-pointer"
              onClick={() => toggleCard(item.id)}
              onMouseEnter={() => setFlippedCards((prev) => ({ ...prev, [item.id]: true }))}
              onMouseLeave={() => setFlippedCards((prev) => ({ ...prev, [item.id]: false }))}
            >
              <div
                id={`card-inner-${item.id}`}
                className={`relative w-full h-full duration-500 transform-style-3d rounded-3xl transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT OF CARD */}
                <div
                  id={`card-front-${item.id}`}
                  className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 flex flex-col items-center justify-between border-2 shadow-xs transition-shadow group-hover:shadow-md ${styles.frontBg} ${styles.border}`}
                >
                  <div className="w-full flex justify-between items-center">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles.badge}`}>
                      Nickname
                    </span>
                    <Heart size={16} className={`${styles.accent} fill-current/20`} />
                  </div>

                  <div className="flex flex-col items-center text-center my-auto">
                    <span className="text-5xl sm:text-6xl mb-3 drop-shadow-xs transform transition-transform group-hover:scale-110 duration-300 select-none">
                      {item.emoji}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                      {item.name}
                    </h3>
                    {item.subtext && (
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        {item.subtext}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-white/70 px-3 py-1.5 rounded-full border border-slate-200/60 shadow-2xs">
                    <RefreshCw size={12} className="text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Flip for secret note</span>
                  </div>
                </div>

                {/* BACK OF CARD */}
                <div
                  id={`card-back-${item.id}`}
                  className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg ${styles.backBg}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-2xl select-none">{item.emoji}</span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white">
                      Why I call you this
                    </span>
                  </div>

                  <div className="my-auto text-center px-1">
                    <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                    <p className={`text-base sm:text-lg font-medium leading-relaxed italic ${styles.quoteColor}`}>
                      "{item.note}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-white/20">
                    <span className={styles.subColor}>From Hamza with love</span>
                    <Heart size={16} className="text-white fill-white" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
