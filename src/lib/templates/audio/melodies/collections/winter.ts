import type { Note } from "@/lib/types";

/**
 * Winter Wonderland Melody
 * Key: D Minor
 * Tempo: 68 BPM
 * Feel: Contemplative, cozy, peaceful
 * Visual match: Snow falling, cool blues, winter nights
 *
 * Musical concept:
 * - Minor key for introspective winter feeling
 * - Gentle stepwise motion like falling snow
 * - Spacious phrases with rests
 * - Use of sixths for warmth within minor context
 */
export const winterWonderlandMelody: Note[] = [
  // First phrase - gentle descent (snow falling)
  { time: "0:0", note: "D4", duration: "4n", velocity: 0.6 },
  { time: "0:1", note: "C4", duration: "8n", velocity: 0.5 },
  { time: "0:1:2", note: "A3", duration: "8n", velocity: 0.55 },
  { time: "0:2", note: "F3", duration: "4n", velocity: 0.6 },
  { time: "0:3", note: "A3", duration: "4n", velocity: 0.5 },

  // Second phrase - wandering (breeze through trees)
  { time: "1:0", note: "G3", duration: "8n", velocity: 0.6 },
  { time: "1:0:2", note: "A3", duration: "8n", velocity: 0.5 },
  { time: "1:1", note: "C4", duration: "4n", velocity: 0.6 },
  { time: "1:2", note: "D4", duration: "4n", velocity: 0.55 },
  { time: "1:3", note: "C4", duration: "4n", velocity: 0.5 },

  // Third phrase - rising hope (warmth indoors)
  { time: "2:0", note: "F4", duration: "4n", velocity: 0.65 },
  { time: "2:1", note: "E4", duration: "8n", velocity: 0.55 },
  { time: "2:1:2", note: "D4", duration: "8n", velocity: 0.6 },
  { time: "2:2", note: "C4", duration: "4n", velocity: 0.55 },
  { time: "2:3", note: "A3", duration: "4n", velocity: 0.5 },

  // Fourth phrase - peaceful resolution
  { time: "3:0", note: "G3", duration: "8n", velocity: 0.6 },
  { time: "3:0:2", note: "A3", duration: "8n", velocity: 0.5 },
  { time: "3:1", note: "C4", duration: "4n", velocity: 0.55 },
  { time: "3:2", note: "D4", duration: "2n", velocity: 0.6 },
];

export const winterWonderlandHarmony: Note[] = [
  // Bar 1: D minor
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "A3", duration: "1n", velocity: 0.25 },

  // Bar 2: Bb major feel
  { time: "1:0", note: "Bb2", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "F3", duration: "1n", velocity: 0.25 },

  // Bar 3: G minor feel
  { time: "2:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 4: Back to D minor
  { time: "3:0", note: "D3", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "A3", duration: "1n", velocity: 0.3 },
];
