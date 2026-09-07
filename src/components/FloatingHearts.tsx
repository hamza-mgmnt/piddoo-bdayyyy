import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  type: 'heart' | 'sparkle';
}

const PASTEL_COLORS = [
  '#FDA4AF', // Blush Pink
  '#F472B6', // Soft Rose
  '#D8B4FE', // Soft Lavender
  '#C084FC', // Light Purple
  '#86EFAC', // Mint Green
  '#6EE7B7', // Soft Emerald
];

export const FloatingHearts: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate initial gentle floating particles
    const initialParticles: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 96 + 2, // percentage
      size: Math.floor(Math.random() * 14) + 12,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
      type: Math.random() > 0.3 ? 'heart' : 'sparkle',
    }));
    setParticles(initialParticles);
  }, []);

  return (
    <div
      id="floating-hearts-container"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 animate-bounce"
          style={{
            left: `${p.x}%`,
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: 0.45,
          }}
        >
          {p.type === 'heart' ? (
            <Heart
              size={p.size}
              style={{ color: p.color, fill: p.color }}
              className="drop-shadow-sm transition-transform"
            />
          ) : (
            <Sparkles
              size={p.size * 0.9}
              style={{ color: p.color }}
              className="drop-shadow-sm"
            />
          )}
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(0.7);
            opacity: 0;
          }
          10% {
            opacity: 0.55;
          }
          50% {
            transform: translateY(50vh) rotate(20deg) scale(1);
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-10vh) rotate(-20deg) scale(0.85);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
