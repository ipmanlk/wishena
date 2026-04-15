import type { Note } from "@/lib/types";

/**
 * Midnight Dream Melody
 * Key: A Minor
 * Tempo: 58 BPM
 * Feel: Peaceful, ethereal, sleep-inducing
 * Visual match: Deep navy, silver, gentle stars
 *
 * Musical concept:
 * - A minor for dreamy, introspective feel
 * - Very slow tempo for relaxation
 * - Gentle, spacious phrases
 * - Soft, floating intervals
 */
export const midnightDreamMelody: Note[] = [
  // First phrase - drifting
  { time: "0:0", note: "A3", duration: "4n", velocity: 0.55 },
  { time: "0:2", note: "C4", duration: "4n", velocity: 0.6 },
  { time: "0:3:2", note: "E4", duration: "4n", velocity: 0.55 },

  // Second phrase - floating
  { time: "1:0", note: "C4", duration: "4n", velocity: 0.55 },
  { time: "1:2", note: "A3", duration: "4n", velocity: 0.5 },
  { time: "1:3:2", note: "E3", duration: "4n", velocity: 0.5 },

  // Third phrase - wandering
  { time: "2:0", note: "F4", duration: "4n", velocity: 0.55 },
  { time: "2:2", note: "E4", duration: "4n", velocity: 0.5 },
  { time: "2:3:2", note: "C4", duration: "4n", velocity: 0.55 },

  // Fourth phrase - restful
  { time: "3:0", note: "A3", duration: "2n", velocity: 0.55 },
  { time: "3:2", note: "E3", duration: "2n", velocity: 0.5 },
];

export const midnightDreamHarmony: Note[] = [
  // Bar 1: A minor
  { time: "0:0", note: "A2", duration: "1n", velocity: 0.28 },
  { time: "0:0", note: "E3", duration: "1n", velocity: 0.23 },

  // Bar 2: D minor
  { time: "1:0", note: "D3", duration: "1n", velocity: 0.28 },
  { time: "1:0", note: "A3", duration: "1n", velocity: 0.23 },

  // Bar 3: F major
  { time: "2:0", note: "F2", duration: "1n", velocity: 0.28 },
  { time: "2:0", note: "C3", duration: "1n", velocity: 0.23 },

  // Bar 4: A minor resolution
  { time: "3:0", note: "A2", duration: "1n", velocity: 0.32 },
  { time: "3:0", note: "E3", duration: "1n", velocity: 0.27 },
];
