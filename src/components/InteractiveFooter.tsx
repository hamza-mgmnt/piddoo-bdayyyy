import React from 'react';
import { Sparkles, Music, Flame, Heart, Volume2, VolumeX } from 'lucide-react';

interface InteractiveFooterProps {
  onOpenCake: () => void;
  isPlayingSong: boolean;
  onToggleSong: () => void;
  currentSongNote?: string;
}

export const InteractiveFooter: React.FC<InteractiveFooterProps> = ({
  onOpenCake,
  isPlayingSong,
  onToggleSong,
  currentSongNote,
}) => {
  return (
    <footer id="interactive-footer" className="relative py-20 px-4 sm:px-6 lg:px-8 z-10 border-t border-pink-200/60 bg-gradient-to-b from-transparent via-pink-50/60 to-purple-50/80">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-pink-200 text-rose-600 text-xs font-bold tracking-wide uppercase mb-6 shadow-2xs">
          <Sparkles size={14} className="text-amber-400" />
          <span>The Grand Finale</span>
        </div>

        {/* Heading */}
        <h2 id="footer-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
          Ready to Make a Wish, Manahil? 🎂✨
        </h2>
        <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Before this special day ends, don't forget to blow out your virtual birthday candles and let the universe hear our melody.
        </p>

        {/* Interactive Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* Main Button: Open Virtual Birthday Cake */}
          <button
            id="open-birthday-cake-btn"
            onClick={onOpenCake}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-bold text-base sm:text-lg shadow-lg shadow-pink-200/60 transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <Flame className="w-5 h-5 text-amber-300 group-hover:animate-bounce" />
            <span>Open Birthday Cake 🎂</span>
            <Sparkles className="w-4 h-4 text-pink-200" />
          </button>

          {/* Secondary Button: Custom Birthday Song */}
          <button
            id="play-birthday-song-btn"
            onClick={onToggleSong}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full font-bold text-base border transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs ${
              isPlayingSong
                ? 'bg-purple-600 text-white border-purple-600 shadow-purple-200 shadow-md'
                : 'bg-white hover:bg-purple-50 text-purple-700 border-purple-200'
            }`}
          >
            {isPlayingSong ? (
              <>
                <Volume2 className="w-5 h-5 text-purple-200 animate-pulse" />
                <span>Stop Song ⏸️</span>
              </>
            ) : (
              <>
                <Music className="w-5 h-5 text-purple-500" />
                <span>Play Birthday Song 🎵</span>
              </>
            )}
          </button>
        </div>

        {/* Live Song Playing Banner */}
        {isPlayingSong && (
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/90 border border-purple-200 shadow-xs animate-fade-in">
            <span className="flex h-2.5 w-2.5 rounded-full bg-purple-500 animate-ping" />
            <span className="text-xs sm:text-sm font-semibold text-purple-800">
              Playing Happy Birthday Chime Melody
            </span>
            {currentSongNote && (
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                {currentSongNote}
              </span>
            )}
          </div>
        )}

        {/* Closing Warm Message */}
        <div className="mt-16 pt-8 border-t border-pink-200/50 flex flex-col items-center gap-2 text-slate-500 text-sm">
          <p className="flex items-center gap-1.5 font-medium">
            <span>Hamza ❤️ Manahil • Built with all my love for my entire world</span>
            <Heart size={14} className="text-rose-500 fill-rose-500 inline" />
          </p>
          <p className="text-xs text-slate-400">
            Happy Birthday, Manahil • You will always be Hamza's favorite adventure.
          </p>
        </div>
      </div>
    </footer>
  );
};
