import type { Note } from "@/lib/types";

/**
 * Forest Calm Melody
 * Key: G Major
 * Tempo: 60 BPM
 * Feel: Grounding, peaceful, organic
 * Visual match: Deep greens, earth tones, nature
 *
 * Musical concept:
 * - Lower register for grounded feeling
 * - Repetitive patterns like rustling leaves
 * - Fourth intervals for open, natural sound
 * - Pentatonic for simplicity and peace
 */
export const forestCalmMelody: Note[] = [
  // First phrase - rooted bass
  { time: "0:0", note: "G3", duration: "4n", velocity: 0.6 },
  { time: "0:1", note: "B3", duration: "8n", velocity: 0.55 },
  { time: "0:1:2", note: "D4", duration: "8n", velocity: 0.6 },
  { time: "0:2", note: "B3", duration: "4n", velocity: 0.55 },
  { time: "0:3", note: "G3", duration: "4n", velocity: 0.5 },

  // Second phrase - gentle sway
  { time: "1:0", note: "D4", duration: "8n", velocity: 0.6 },
  { time: "1:0:2", note: "B3", duration: "8n", velocity: 0.55 },
  { time: "1:1", note: "G3", duration: "4n", velocity: 0.6 },
  { time: "1:2", note: "A3", duration: "4n", velocity: 0.55 },
  { time: "1:3", note: "B3", duration: "4n", velocity: 0.5 },

  // Third phrase - reaching branches
  { time: "2:0", note: "D4", duration: "4n", velocity: 0.65 },
  { time: "2:1", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "2:1:2", note: "D4", duration: "8n", velocity: 0.55 },
  { time: "2:2", note: "B3", duration: "4n", velocity: 0.6 },
  { time: "2:3", note: "G3", duration: "4n", velocity: 0.5 },

  // Fourth phrase - rooted home
  { time: "3:0", note: "A3", duration: "8n", velocity: 0.55 },
  { time: "3:0:2", note: "B3", duration: "8n", velocity: 0.6 },
  { time: "3:1", note: "D4", duration: "4n", velocity: 0.55 },
  { time: "3:2", note: "G3", duration: "2n", velocity: 0.6 },
];

export const forestCalmHarmony: Note[] = [
  // Bar 1: G major drone
  { time: "0:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 2: C major feel
  { time: "1:0", note: "C3", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "G3", duration: "1n", velocity: 0.25 },

  // Bar 3: Em feel
  { time: "2:0", note: "E2", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "B2", duration: "1n", velocity: 0.25 },

  // Bar 4: G major resolution
  { time: "3:0", note: "G2", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "D3", duration: "1n", velocity: 0.3 },
];
