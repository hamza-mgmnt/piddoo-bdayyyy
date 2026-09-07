export interface NicknameItem {
  id: string;
  name: string;
  emoji: string;
  note: string;
  theme: 'pink' | 'lavender' | 'mint';
  subtext?: string;
}

export interface PolaroidPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  rotation: number;
  tapeColor: 'pink' | 'lavender' | 'mint';
}

export interface LoveNoteData {
  recipient: string;
  body: string;
  signature: string;
  date: string;
  ps?: string;
}

export interface CandleState {
  id: number;
  isLit: boolean;
  color: string;
  flameSize?: number;
}
