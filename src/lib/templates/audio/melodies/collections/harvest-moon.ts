import type { Note } from "@/lib/types";

/**
 * Harvest Moon Melody
 * Key: G Major
 * Tempo: 70 BPM
 * Feel: Warm, grateful, rustic
 * Visual match: Deep oranges, browns, autumn leaves
 *
 * Musical concept:
 * - Folk-inspired pentatonic melody
 * - Gentle rises and falls like rolling hills
 * - Earthy mid-register
 */
export const harvestMoonMelody: Note[] = [
  // First phrase - gathering warmth
  { time: "0:0", note: "G4", duration: "4n", velocity: 0.6 },
  { time: "0:1", note: "B4", duration: "8n", velocity: 0.65 },
  { time: "0:1:2", note: "D5", duration: "8n", velocity: 0.7 },
  { time: "0:2", note: "B4", duration: "4n", velocity: 0.65 },
  { time: "0:3", note: "G4", duration: "4n", velocity: 0.6 },

  // Second phrase - shared stories
  { time: "1:0", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "1:0:2", note: "B4", duration: "8n", velocity: 0.6 },
  { time: "1:1", note: "G4", duration: "4n", velocity: 0.65 },
  { time: "1:2", note: "A4", duration: "4n", velocity: 0.6 },
  { time: "1:3", note: "B4", duration: "4n", velocity: 0.55 },

  // Third phrase - golden light
  { time: "2:0", note: "D5", duration: "4n", velocity: 0.7 },
  { time: "2:1", note: "E5", duration: "8n", velocity: 0.65 },
  { time: "2:1:2", note: "D5", duration: "8n", velocity: 0.6 },
  { time: "2:2", note: "B4", duration: "4n", velocity: 0.65 },
  { time: "2:3", note: "G4", duration: "4n", velocity: 0.6 },

  // Fourth phrase - thankful home
  { time: "3:0", note: "A4", duration: "8n", velocity: 0.6 },
  { time: "3:0:2", note: "B4", duration: "8n", velocity: 0.65 },
  { time: "3:1", note: "G4", duration: "4n", velocity: 0.6 },
  { time: "3:2", note: "D4", duration: "2n", velocity: 0.65 },
];

export const harvestMoonHarmony: Note[] = [
  // Bar 1: G major
  { time: "0:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 2: C major
  { time: "1:0", note: "C3", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "G3", duration: "1n", velocity: 0.25 },

  // Bar 3: D major
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "A3", duration: "1n", velocity: 0.25 },

  // Bar 4: G major
  { time: "3:0", note: "G2", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "B2", duration: "1n", velocity: 0.3 },
];
