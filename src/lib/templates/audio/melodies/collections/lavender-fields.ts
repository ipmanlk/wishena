import type { Note } from "@/lib/types";

/**
 * Lavender Fields Melody
 * Key: F Major
 * Tempo: 64 BPM
 * Feel: Serene, mindful, floating
 * Visual match: Soft purples, gentle haze, relaxation
 *
 * Musical concept:
 * - Slow, spacious phrases
 * - High register for lightness
 * - Minimal movement for calm
 */
export const lavenderFieldsMelody: Note[] = [
  // First phrase - gentle breath
  { time: "0:0", note: "A4", duration: "4n", velocity: 0.55 },
  { time: "0:1", note: "C5", duration: "4n", velocity: 0.6 },
  { time: "0:2", note: "A4", duration: "2n", velocity: 0.55 },

  // Second phrase - soft drift
  { time: "1:0", note: "G4", duration: "4n", velocity: 0.55 },
  { time: "1:1", note: "A4", duration: "4n", velocity: 0.6 },
  { time: "1:2", note: "F4", duration: "2n", velocity: 0.55 },

  // Third phrase - rising calm
  { time: "2:0", note: "C5", duration: "4n", velocity: 0.6 },
  { time: "2:1", note: "A4", duration: "4n", velocity: 0.55 },
  { time: "2:2", note: "G4", duration: "4n", velocity: 0.5 },
  { time: "2:3", note: "F4", duration: "4n", velocity: 0.55 },

  // Fourth phrase - peaceful release
  { time: "3:0", note: "A4", duration: "2n", velocity: 0.6 },
  { time: "3:2", note: "F4", duration: "2n", velocity: 0.55 },
];

export const lavenderFieldsHarmony: Note[] = [
  // Bar 1: F major
  { time: "0:0", note: "F2", duration: "1n", velocity: 0.28 },
  { time: "0:0", note: "C3", duration: "1n", velocity: 0.23 },

  // Bar 2: D minor
  { time: "1:0", note: "D3", duration: "1n", velocity: 0.28 },
  { time: "1:0", note: "A3", duration: "1n", velocity: 0.23 },

  // Bar 3: Bb major
  { time: "2:0", note: "Bb2", duration: "1n", velocity: 0.28 },
  { time: "2:0", note: "F3", duration: "1n", velocity: 0.23 },

  // Bar 4: F major
  { time: "3:0", note: "F2", duration: "1n", velocity: 0.32 },
  { time: "3:0", note: "A2", duration: "1n", velocity: 0.27 },
];
