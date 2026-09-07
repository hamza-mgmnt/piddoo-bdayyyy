import React, { useState } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NicknamesGrid } from './components/NicknamesGrid';
import { LoveNote } from './components/LoveNote';
import { InteractiveFooter } from './components/InteractiveFooter';
import { BirthdayCakeModal } from './components/BirthdayCakeModal';
import { soundManager } from './utils/audio';

export default function App() {
  const [isCakeModalOpen, setIsCakeModalOpen] = useState<boolean>(false);
  const [isPlayingSong, setIsPlayingSong] = useState<boolean>(false);
  const [currentSongNote, setCurrentSongNote] = useState<string>('');

  const toggleBirthdaySong = () => {
    if (isPlayingSong) {
      soundManager.stopBirthdaySong();
      setIsPlayingSong(false);
      setCurrentSongNote('');
    } else {
      setIsPlayingSong(true);
      soundManager.playBirthdaySong(
        (note) => {
          setCurrentSongNote(note);
        },
        () => {
          setIsPlayingSong(false);
          setCurrentSongNote('');
        }
      );
    }
  };

  const scrollToNicknames = () => {
    const section = document.getElementById('nicknames-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF8FA] text-slate-800 selection:bg-pink-200 selection:text-pink-900 font-rounded overflow-x-hidden">
      {/* Gentle Floating Hearts & Sparkles Ambient Layer */}
      <FloatingHearts />

      {/* Floating Top Nav */}
      <Navbar
        onOpenCake={() => setIsCakeModalOpen(true)}
        isPlayingSong={isPlayingSong}
        onToggleSong={toggleBirthdaySong}
      />

      <main className="relative z-10 space-y-8 sm:space-y-12">
        {/* 1. Hero Section */}
        <HeroSection
          onExploreClick={scrollToNicknames}
          onOpenCake={() => setIsCakeModalOpen(true)}
        />

        {/* 2. The Many Names of You Grid */}
        <NicknamesGrid />

        {/* 3. Love Note Letter */}
        <LoveNote />
      </main>

      {/* 4. Interactive Footer */}
      <InteractiveFooter
        onOpenCake={() => setIsCakeModalOpen(true)}
        isPlayingSong={isPlayingSong}
        onToggleSong={toggleBirthdaySong}
        currentSongNote={currentSongNote}
      />

      {/* Virtual Birthday Cake Modal */}
      <BirthdayCakeModal
        isOpen={isCakeModalOpen}
        onClose={() => setIsCakeModalOpen(false)}
        isPlayingSong={isPlayingSong}
        onToggleSong={toggleBirthdaySong}
        currentSongNote={currentSongNote}
      />
    </div>
  );
}
