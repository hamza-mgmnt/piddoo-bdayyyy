// Web Audio API custom synthesizer for the Birthday song & cute sound effects
// Completely offline, no external audio files needed.

class SoundManager {
  private ctx: AudioContext | null = null;
  private isPlayingSong: boolean = false;
  private scheduledTimeouts: number[] = [];
  private onNoteCallback?: (note: string, active: boolean) => void;
  private onEndCallback?: () => void;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a soft sweet chime note (like a celesta / music box)
  public playTone(freq: number, duration: number = 0.4, startTimeOffset: number = 0, gainLevel: number = 0.25) {
    const ctx = this.getContext();
    const startTime = ctx.currentTime + startTimeOffset;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    // Warm bell/marimba tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime); // subtle octave shimmer

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  // Cute "pop / hug" sound
  public playHugSound() {
    try {
      const ctx = this.getContext();
      const startTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, startTime);
      osc.frequency.exponentialRampToValueAtTime(640, startTime + 0.12);

      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    } catch {
      // Ignore audio error if not permitted yet
    }
  }

  // Blow out candle sound (whoosh + chime)
  public playCandleBlowSound() {
    try {
      const ctx = this.getContext();
      const startTime = ctx.currentTime;

      // Soft air puff using buffer noise or gentle low freq
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, startTime);
      osc.frequency.exponentialRampToValueAtTime(60, startTime + 0.25);
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.26);

      // Sweet magical sparkle note
      setTimeout(() => {
        this.playTone(880, 0.4, 0, 0.15);
        setTimeout(() => this.playTone(1174.66, 0.5, 0, 0.12), 100);
      }, 120);
    } catch {
      // Ignore
    }
  }

  // Happy Birthday Melody
  public playBirthdaySong(
    onNote?: (noteName: string, active: boolean) => void,
    onFinish?: () => void
  ) {
    this.stopBirthdaySong();
    this.isPlayingSong = true;
    this.onNoteCallback = onNote;
    this.onEndCallback = onFinish;

    // Frequencies
    const G4 = 392.0;
    const A4 = 440.0;
    const B4 = 493.88;
    const C5 = 523.25;
    const D5 = 587.33;
    const E5 = 659.25;
    const F5 = 698.46;
    const G5 = 783.99;

    const tempo = 135; // bpm
    const beatDuration = 60 / tempo; // ~0.444s

    // [freq, durationInBeats, noteLabel]
    const songSequence: Array<[number, number, string]> = [
      // Happy Birthday to You
      [G4, 0.75, 'Hap-'],
      [G4, 0.25, 'py'],
      [A4, 1.0, 'Birth-'],
      [G4, 1.0, 'day'],
      [C5, 1.0, 'to'],
      [B4, 2.0, 'you! 💕'],

      // Happy Birthday to You
      [G4, 0.75, 'Hap-'],
      [G4, 0.25, 'py'],
      [A4, 1.0, 'Birth-'],
      [G4, 1.0, 'day'],
      [D5, 1.0, 'to'],
      [C5, 2.0, 'you! 🌟'],

      // Happy Birthday dear Manahil
      [G4, 0.75, 'Hap-'],
      [G4, 0.25, 'py'],
      [G4, 0.25, ''],
      [G5, 1.0, 'Birth-'],
      [E5, 1.0, 'day'],
      [C5, 1.0, 'Dear'],
      [B4, 1.0, 'Ma-'],
      [A4, 2.0, 'nahil! 💖'],

      // Happy Birthday to You
      [F5, 0.75, 'Hap-'],
      [F5, 0.25, 'py'],
      [E5, 1.0, 'Birth-'],
      [C5, 1.0, 'day'],
      [D5, 1.0, 'to'],
      [C5, 2.5, 'YOU! 🎉🎂'],
    ];

    let currentDelay = 0.05;

    songSequence.forEach(([freq, beats, label]) => {
      const durationSeconds = beats * beatDuration;

      // Schedule tone
      this.playTone(freq, durationSeconds * 0.95, currentDelay, 0.28);

      // Schedule visual UI callback
      const timeoutId = window.setTimeout(() => {
        if (!this.isPlayingSong) return;
        if (label && this.onNoteCallback) {
          this.onNoteCallback(label, true);
        }
      }, currentDelay * 1000);
      this.scheduledTimeouts.push(timeoutId);

      currentDelay += durationSeconds;
    });

    // Schedule finish
    const endTimeoutId = window.setTimeout(() => {
      this.isPlayingSong = false;
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    }, currentDelay * 1000 + 300);
    this.scheduledTimeouts.push(endTimeoutId);
  }

  public stopBirthdaySong() {
    this.isPlayingSong = false;
    this.scheduledTimeouts.forEach((id) => clearTimeout(id));
    this.scheduledTimeouts = [];
    if (this.onNoteCallback) {
      this.onNoteCallback('', false);
    }
  }

  public isSongPlaying(): boolean {
    return this.isPlayingSong;
  }
}

export const soundManager = new SoundManager();
