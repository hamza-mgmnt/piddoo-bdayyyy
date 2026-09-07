import React, { useState } from 'react';
import { LoveNoteData } from '../types';
import { Heart, Edit3, Check, Copy, Sparkles, Feather } from 'lucide-react';

const DEFAULT_NOTE: LoveNoteData = {
  recipient: 'To My Dearest Manahil,',
  body: `Happy Birthday, my sweetest jaan! 🎂✨

From the moment you stepped into my life, everything became softer, warmer, and infinitely brighter. You have this rare, magical way of making even the ordinary days feel like poetry. Whether it's your uncontrollable giggles, the adorable little pout when you're being playful, or the comforting warmth of your hugs when the world feels heavy — being with you is Hamza's absolute favorite place to be.

Thank you for choosing me every single day. Thank you for being my anchor, my sweetest distraction, my favorite confidante, and my forever best friend. I hope today brings you even half of the boundless happiness, laughter, and wonder that you bring into my world every single second.

May this new year of your life be filled with all the sweet treats, peaceful mornings, big dreams fulfilled, and endless warm cuddles you deserve.`,
  signature: 'Forever & unconditionally yours,\nHamza ❤️',
  date: 'September 7th • For Manahil',
  ps: "P.S. In case Hamza hasn't reminded you today: you're the prettiest girl in the universe and you're stuck with me forever! 🥰🍬",
};

export const LoveNote: React.FC = () => {
  const [note, setNote] = useState<LoveNoteData>(() => {
    try {
      const saved = localStorage.getItem('birthday_love_note');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.recipient && parsed.recipient.includes('Manahil')) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_NOTE;
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSave = (updated: LoveNoteData) => {
    setNote(updated);
    try {
      localStorage.setItem('birthday_love_note', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setIsEditing(false);
  };

  const handleCopy = () => {
    const fullText = `${note.recipient}\n\n${note.body}\n\n${note.signature}\n\n${note.ps || ''}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="love-note-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-wide uppercase mb-3">
          <Feather size={14} />
          <span>From My Heart</span>
        </div>
        <h2 id="love-note-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
          A Love Letter For Manahil 💌
        </h2>
        <p className="mt-2 text-slate-600 text-base sm:text-lg">
          Every word written from Hamza's heart just for you, sealed with endless love.
        </p>
      </div>

      {/* Cozy Centered Hand-Written Letter Box */}
      <div
        id="handwritten-letter-container"
        className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 md:p-14 shadow-xl border border-amber-100/80 transition-all hover:shadow-2xl"
        style={{
          boxShadow: '0 20px 40px -15px rgba(244, 114, 182, 0.15), 0 0 0 1px rgba(251, 207, 232, 0.4)',
        }}
      >
        {/* Top Decorative Elements: Vintage Postage Stamp & Washi Tape */}
        <div className="flex justify-between items-start mb-6 border-b border-rose-100/60 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Air Mail • Special Delivery
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
              {note.date}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition-colors"
              title="Customize letter"
            >
              <Edit3 size={13} />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Note'}</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
              title="Copy note"
            >
              {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Note Body (Editable or Formatted) */}
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Salutation
              </label>
              <input
                type="text"
                value={note.recipient}
                onChange={(e) => setNote({ ...note, recipient: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-handwriting text-2xl text-slate-800 focus:ring-2 focus:ring-rose-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Letter Message
              </label>
              <textarea
                rows={10}
                value={note.body}
                onChange={(e) => setNote({ ...note, body: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 font-handwriting text-2xl text-slate-800 leading-relaxed focus:ring-2 focus:ring-rose-300 focus:outline-none resize-y"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Signature
              </label>
              <input
                type="text"
                value={note.signature}
                onChange={(e) => setNote({ ...note, signature: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-handwriting text-2xl text-slate-800 focus:ring-2 focus:ring-rose-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                P.S. Note
              </label>
              <input
                type="text"
                value={note.ps || ''}
                onChange={(e) => setNote({ ...note, ps: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-handwriting text-xl text-slate-800 focus:ring-2 focus:ring-rose-300 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={() => handleSave(note)}
                className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-sm transition-all"
              >
                Save Changes 💕
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Salutation */}
            <p className="font-handwriting text-3xl sm:text-4xl font-bold text-rose-600 tracking-wide">
              {note.recipient}
            </p>

            {/* Body */}
            <div className="font-handwriting text-2xl sm:text-3xl text-slate-800 leading-[1.8] whitespace-pre-line tracking-wide">
              {note.body}
            </div>

            {/* Signature & Wax Seal */}
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-rose-100/60">
              <div className="font-handwriting text-2xl sm:text-3xl text-slate-700 leading-snug whitespace-pre-line">
                {note.signature}
              </div>

              {/* Cute Wax Seal Emblem */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md border-2 border-rose-300 select-none transform rotate-[-2deg] hover:rotate-0 transition-transform"
                title="Sealed with Love"
              >
                <Heart size={18} className="fill-white" />
                <span className="text-xs font-bold tracking-widest uppercase">
                  Sealed with a Kiss
                </span>
                <Sparkles size={14} className="text-rose-200" />
              </div>
            </div>

            {/* P.S. Note */}
            {note.ps && (
              <div className="pt-4 border-t border-dashed border-rose-200/80">
                <p className="font-handwriting text-xl sm:text-2xl text-rose-600 italic">
                  {note.ps}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
