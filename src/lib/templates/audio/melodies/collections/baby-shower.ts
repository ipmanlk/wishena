import type { Note } from "@/lib/types";

/**
 * Baby Shower Melody
 * Key: G Major
 * Tempo: 86 BPM
 * Feel: Soft, gentle, joyful anticipation
 * Visual match: Pastel pink/blue, soft clouds, gentle confetti
 *
 * Musical concept:
 * - G major for innocent, happy feel
 * - Light, delicate phrasing
 * - Gentle rises like cooing
 * - Sweet, simple intervals
 */
export const babyShowerMelody: Note[] = [
  // First phrase - tiny hello
  { time: "0:0", note: "G4", duration: "8n", velocity: 0.55 },
  { time: "0:0:2", note: "B4", duration: "8n", velocity: 0.6 },
  { time: "0:1", note: "D5", duration: "4n", velocity: 0.65 },
  { time: "0:2", note: "B4", duration: "4n", velocity: 0.6 },
  { time: "0:3", note: "G4", duration: "4n", velocity: 0.55 },

  // Second phrase - sweet dreams
  { time: "1:0", note: "E4", duration: "8n", velocity: 0.55 },
  { time: "1:0:2", note: "G4", duration: "8n", velocity: 0.6 },
  { time: "1:1", note: "B4", duration: "4n", velocity: 0.65 },
  { time: "1:2", note: "D5", duration: "8n", velocity: 0.6 },
  { time: "1:2:2", note: "B4", duration: "8n", velocity: 0.55 },
  { time: "1:3", note: "G4", duration: "4n", velocity: 0.55 },

  // Third phrase - so much love
  { time: "2:0", note: "D4", duration: "8n", velocity: 0.55 },
  { time: "2:0:2", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "2:1", note: "G4", duration: "4n", velocity: 0.65 },
  { time: "2:2", note: "B4", duration: "8n", velocity: 0.6 },
  { time: "2:2:2", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "2:3", note: "G5", duration: "4n", velocity: 0.6 },

  // Fourth phrase - welcome little one
  { time: "3:0", note: "G4", duration: "4n", velocity: 0.6 },
  { time: "3:1", note: "D5", duration: "4n", velocity: 0.55 },
  { time: "3:2", note: "B4", duration: "4n", velocity: 0.6 },
  { time: "3:3", note: "G4", duration: "2n", velocity: 0.65 },
];

export const babyShowerHarmony: Note[] = [
  // Bar 1: G major
  { time: "0:0", note: "G2", duration: "1n", velocity: 0.28 },
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.23 },

  // Bar 2: E minor
  { time: "1:0", note: "E2", duration: "1n", velocity: 0.28 },
  { time: "1:0", note: "B2", duration: "1n", velocity: 0.23 },

  // Bar 3: C major
  { time: "2:0", note: "C3", duration: "1n", velocity: 0.28 },
  { time: "2:0", note: "G3", duration: "1n", velocity: 0.23 },

  // Bar 4: G major resolution
  { time: "3:0", note: "G2", duration: "1n", velocity: 0.32 },
  { time: "3:0", note: "D3", duration: "1n", velocity: 0.27 },
];
