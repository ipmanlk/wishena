import type { Note } from "@/lib/types";

/**
 * Thank You Bloom Melody
 * Key: C Major
 * Tempo: 70 BPM
 * Feel: Warm, heartfelt, appreciative
 * Visual match: Soft coral, cream, floral accents
 *
 * Musical concept:
 * - C major for sincere warmth
 * - Gentle, flowing phrases
 * - Spacious for heartfelt feeling
 * - Soft resolution for gratitude
 */
export const thankYouBloomMelody: Note[] = [
  // First phrase - grateful heart
  { time: "0:0", note: "C4", duration: "4n", velocity: 0.6 },
  { time: "0:1", note: "E4", duration: "8n", velocity: 0.65 },
  { time: "0:1:2", note: "G4", duration: "8n", velocity: 0.7 },
  { time: "0:2", note: "E4", duration: "4n", velocity: 0.6 },
  { time: "0:3", note: "C4", duration: "4n", velocity: 0.55 },

  // Second phrase - thank you
  { time: "1:0", note: "G4", duration: "8n", velocity: 0.65 },
  { time: "1:0:2", note: "A4", duration: "8n", velocity: 0.7 },
  { time: "1:1", note: "G4", duration: "4n", velocity: 0.65 },
  { time: "1:2", note: "E4", duration: "4n", velocity: 0.6 },
  { time: "1:3", note: "C4", duration: "4n", velocity: 0.55 },

  // Third phrase - so much
  { time: "2:0", note: "E4", duration: "4n", velocity: 0.6 },
  { time: "2:1", note: "G4", duration: "8n", velocity: 0.65 },
  { time: "2:1:2", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "2:2", note: "A4", duration: "4n", velocity: 0.65 },
  { time: "2:3", note: "G4", duration: "4n", velocity: 0.6 },

  // Fourth phrase - sincerely yours
  { time: "3:0", note: "C5", duration: "4n", velocity: 0.7 },
  { time: "3:1", note: "G4", duration: "4n", velocity: 0.65 },
  { time: "3:2", note: "E4", duration: "4n", velocity: 0.6 },
  { time: "3:3", note: "C4", duration: "2n", velocity: 0.65 },
];

export const thankYouBloomHarmony: Note[] = [
  // Bar 1: C major
  { time: "0:0", note: "C3", duration: "1n", velocity: 0.28 },
  { time: "0:0", note: "G3", duration: "1n", velocity: 0.23 },

  // Bar 2: F major
  { time: "1:0", note: "F2", duration: "1n", velocity: 0.28 },
  { time: "1:0", note: "C3", duration: "1n", velocity: 0.23 },

  // Bar 3: G major
  { time: "2:0", note: "G2", duration: "1n", velocity: 0.28 },
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.23 },

  // Bar 4: C major resolution
  { time: "3:0", note: "C3", duration: "1n", velocity: 0.32 },
  { time: "3:0", note: "E3", duration: "1n", velocity: 0.27 },
];
