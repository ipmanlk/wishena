"use client";

import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
}

const EMOJIS = ["❤️", "💗", "💖", "💕", "✨", "🌸"];

interface FloatingHeartsProps {
  className?: string;
  contained?: boolean;
}

export function FloatingHearts({ className = "", contained = false }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 90 + 5,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 5,
        size: 14 + Math.random() * 16,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      }))
    );
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(-110vh) scale(0.6); opacity: 0; }
        }
      `}</style>
      <div
        className={className}
        aria-hidden
        style={{ position: contained ? "absolute" : "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}
      >
        {hearts.map((h) => (
          <span
            key={h.id}
            style={{
              position: "absolute",
              bottom: "-10%",
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationName: "floatUp",
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              animationTimingFunction: "ease-in",
              animationIterationCount: "infinite",
              animationFillMode: "both",
              pointerEvents: "none",
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>
    </>
  );
}

export default FloatingHearts;
