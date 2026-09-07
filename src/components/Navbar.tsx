import React from 'react';
import { Heart, Music, Flame, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  onOpenCake: () => void;
  isPlayingSong: boolean;
  onToggleSong: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCake, isPlayingSong, onToggleSong }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="top-navbar"
      className="sticky top-4 z-40 max-w-3xl mx-auto px-4 w-full"
    >
      <div className="bg-white/85 backdrop-blur-md border border-pink-200/80 shadow-sm rounded-full px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand / Title link */}
        <button
          onClick={() => scrollTo('hero-section')}
          className="flex items-center gap-2 text-rose-600 font-bold text-sm hover:opacity-80 transition-opacity"
        >
          <Heart size={18} className="fill-rose-500 text-rose-500 animate-pulse" />
          <span className="hidden sm:inline font-rounded">For Manahil ❤️</span>
        </button>

        {/* Section Jump Links */}
        <div className="flex items-center gap-1 sm:gap-2 text-xs font-semibold text-slate-600">
          <button
            onClick={() => scrollTo('nicknames-section')}
            className="px-2.5 py-1 rounded-full hover:bg-pink-50 hover:text-rose-600 transition-colors"
          >
            Nicknames
          </button>
          <button
            onClick={() => scrollTo('love-note-section')}
            className="px-2.5 py-1 rounded-full hover:bg-purple-50 hover:text-purple-700 transition-colors"
          >
            Love Note
          </button>
        </div>

        {/* Quick Actions: Song & Cake */}
        <div className="flex items-center gap-1.5">
          <button
            id="nav-song-btn"
            onClick={onToggleSong}
            className={`p-1.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
              isPlayingSong
                ? 'bg-purple-600 text-white animate-pulse'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
            title={isPlayingSong ? 'Mute birthday song' : 'Play birthday song'}
          >
            {isPlayingSong ? <Volume2 size={15} /> : <Music size={15} />}
            <span className="hidden md:inline">{isPlayingSong ? 'Playing' : 'Music'}</span>
          </button>

          <button
            id="nav-cake-btn"
            onClick={onOpenCake}
            className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-2xs transition-all flex items-center gap-1"
          >
            <Flame size={14} className="text-amber-300" />
            <span>Cake 🎂</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
