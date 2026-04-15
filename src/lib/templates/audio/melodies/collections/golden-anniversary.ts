import type { Note } from "@/lib/types";

/**
 * Golden Anniversary Melody
 * Key: C Major
 * Tempo: 66 BPM
 * Feel: Elegant, timeless, celebratory
 * Visual match: Gold, champagne, sophisticated black
 *
 * Musical concept:
 * - C major for timeless elegance
 * - Smooth, flowing phrases
 * - Classic waltz-like movement
 * - Rich, full harmonies
 */
export const goldenAnniversaryMelody: Note[] = [
  // First phrase - elegant opening
  { time: "0:0", note: "C4", duration: "2n", velocity: 0.6 },
  { time: "0:2", note: "E4", duration: "4n", velocity: 0.65 },
  { time: "0:3", note: "G4", duration: "4n", velocity: 0.7 },

  // Second phrase - cherished memory
  { time: "1:0", note: "E4", duration: "4n", velocity: 0.65 },
  { time: "1:1", note: "G4", duration: "4n", velocity: 0.6 },
  { time: "1:2", note: "C5", duration: "2n", velocity: 0.7 },

  // Third phrase - lasting love
  { time: "2:0", note: "G4", duration: "4n", velocity: 0.65 },
  { time: "2:1", note: "E4", duration: "4n", velocity: 0.6 },
  { time: "2:2", note: "G4", duration: "4n", velocity: 0.65 },
  { time: "2:3", note: "C4", duration: "4n", velocity: 0.6 },

  // Fourth phrase - forever together
  { time: "3:0", note: "C4", duration: "2n", velocity: 0.65 },
  { time: "3:2", note: "E4", duration: "4n", velocity: 0.6 },
  { time: "3:3", note: "G4", duration: "2n", velocity: 0.7 },
];

export const goldenAnniversaryHarmony: Note[] = [
  // Bar 1: C major
  { time: "0:0", note: "C3", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "G3", duration: "1n", velocity: 0.25 },

  // Bar 2: A minor feel
  { time: "1:0", note: "A2", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "E3", duration: "1n", velocity: 0.25 },

  // Bar 3: F major
  { time: "2:0", note: "F2", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "C3", duration: "1n", velocity: 0.25 },

  // Bar 4: C major resolution
  { time: "3:0", note: "C3", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "G3", duration: "1n", velocity: 0.3 },
];
