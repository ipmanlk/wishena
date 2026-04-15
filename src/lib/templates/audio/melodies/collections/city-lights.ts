import type { Note } from "@/lib/types";

/**
 * City Lights Melody
 * Key: D Major
 * Tempo: 88 BPM
 * Feel: Sophisticated, smooth, confident
 * Visual match: Deep navy, gold, urban elegance
 *
 * Musical concept:
 * - Smooth jazz-inspired phrasing
 * - Slight swing feel
 * - Cool, confident intervals
 */
export const cityLightsMelody: Note[] = [
  // First phrase - evening arrival
  { time: "0:0", note: "F#4", duration: "8n", velocity: 0.6 },
  { time: "0:0:2", note: "A4", duration: "8n", velocity: 0.65 },
  { time: "0:1", note: "D5", duration: "4n", velocity: 0.7 },
  { time: "0:2", note: "F#5", duration: "8n", velocity: 0.65 },
  { time: "0:2:2", note: "D5", duration: "8n", velocity: 0.6 },
  { time: "0:3", note: "A4", duration: "4n", velocity: 0.55 },

  // Second phrase - skyline stroll
  { time: "1:0", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "1:0:2", note: "E5", duration: "8n", velocity: 0.6 },
  { time: "1:1", note: "F#5", duration: "4n", velocity: 0.7 },
  { time: "1:2", note: "A5", duration: "8n", velocity: 0.65 },
  { time: "1:2:2", note: "F#5", duration: "8n", velocity: 0.6 },
  { time: "1:3", note: "D5", duration: "4n", velocity: 0.55 },

  // Third phrase - golden reflection
  { time: "2:0", note: "A4", duration: "8n", velocity: 0.6 },
  { time: "2:0:2", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "2:1", note: "F#5", duration: "4n", velocity: 0.7 },
  { time: "2:2", note: "E5", duration: "8n", velocity: 0.6 },
  { time: "2:2:2", note: "D5", duration: "8n", velocity: 0.55 },
  { time: "2:3", note: "A4", duration: "4n", velocity: 0.6 },

  // Fourth phrase - smooth close
  { time: "3:0", note: "F#4", duration: "4n", velocity: 0.65 },
  { time: "3:1", note: "A4", duration: "8n", velocity: 0.6 },
  { time: "3:1:2", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "3:2", note: "F#4", duration: "2n", velocity: 0.7 },
];

export const cityLightsHarmony: Note[] = [
  // Bar 1: D major
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "A3", duration: "1n", velocity: 0.25 },

  // Bar 2: B minor
  { time: "1:0", note: "B2", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "F#3", duration: "1n", velocity: 0.25 },

  // Bar 3: G major
  { time: "2:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 4: D major
  { time: "3:0", note: "D3", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "F#3", duration: "1n", velocity: 0.3 },
];
