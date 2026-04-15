import type { Note } from "@/lib/types";

/**
 * Golden Hour Melody
 * Key: G Major
 * Tempo: 74 BPM
 * Feel: Warm, contemplative, grateful
 * Visual match: Cream backgrounds, gold accents, soft confetti
 *
 * Musical concept:
 * - Uses G major pentatonic for universal warmth
 * - Gentle upward arpeggios like sunlight spreading
 * - Space between phrases allows breathing
 * - Resolves to tonic for closure
 */
export const goldenHourMelody: Note[] = [
  // First phrase - gentle rising (like dawn)
  { time: "0:0", note: "G3", duration: "4n", velocity: 0.6 },
  { time: "0:1", note: "B3", duration: "8n", velocity: 0.5 },
  { time: "0:1:2", note: "D4", duration: "8n", velocity: 0.6 },
  { time: "0:2", note: "G4", duration: "4n", velocity: 0.7 },
  { time: "0:3", note: "D4", duration: "4n", velocity: 0.5 },

  // Second phrase - gentle movement (like breeze)
  { time: "1:0", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "1:0:2", note: "D4", duration: "8n", velocity: 0.5 },
  { time: "1:1", note: "B3", duration: "4n", velocity: 0.6 },
  { time: "1:2", note: "G3", duration: "4n", velocity: 0.5 },
  { time: "1:3", note: "B3", duration: "4n", velocity: 0.6 },

  // Third phrase - reaching up (like hope)
  { time: "2:0", note: "D4", duration: "4n", velocity: 0.6 },
  { time: "2:1", note: "E4", duration: "8n", velocity: 0.5 },
  { time: "2:1:2", note: "G4", duration: "8n", velocity: 0.7 },
  { time: "2:2", note: "B4", duration: "4n", velocity: 0.6 },
  { time: "2:3", note: "G4", duration: "4n", velocity: 0.5 },

  // Fourth phrase - gentle resolution (like sunset)
  { time: "3:0", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "3:0:2", note: "D4", duration: "8n", velocity: 0.5 },
  { time: "3:1", note: "B3", duration: "4n", velocity: 0.6 },
  { time: "3:2", note: "G3", duration: "2n", velocity: 0.7 },
];

/**
 * Golden Hour Harmony
 * Simple chords that support the melody
 * Drones and gentle chord movements
 */
export const goldenHourHarmony: Note[] = [
  // Bar 1: G major feel
  { time: "0:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 2: Em7 feel
  { time: "1:0", note: "E2", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "B2", duration: "1n", velocity: 0.25 },

  // Bar 3: C major feel
  { time: "2:0", note: "C3", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "G3", duration: "1n", velocity: 0.25 },

  // Bar 4: Back to G
  { time: "3:0", note: "G2", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "D3", duration: "1n", velocity: 0.3 },
];
