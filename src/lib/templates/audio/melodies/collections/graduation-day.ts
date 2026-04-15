import type { Note } from "@/lib/types";

/**
 * Graduation Day Melody
 * Key: F Major
 * Tempo: 92 BPM
 * Feel: Proud, uplifting, triumphant
 * Visual match: Navy blue, gold accents, confetti
 *
 * Musical concept:
 * - F major for confident, proud feel
 * - March-like steady rhythm
 * - Rising phrases for achievement
 * - Strong, decisive intervals
 */
export const graduationDayMelody: Note[] = [
  // First phrase - the moment
  { time: "0:0", note: "F4", duration: "4n", velocity: 0.7 },
  { time: "0:1", note: "A4", duration: "4n", velocity: 0.75 },
  { time: "0:2", note: "C5", duration: "4n", velocity: 0.8 },
  { time: "0:3", note: "F5", duration: "4n", velocity: 0.75 },

  // Second phrase - achievement
  { time: "1:0", note: "A4", duration: "4n", velocity: 0.75 },
  { time: "1:1", note: "C5", duration: "4n", velocity: 0.7 },
  { time: "1:2", note: "F4", duration: "4n", velocity: 0.65 },
  { time: "1:3", note: "A4", duration: "4n", velocity: 0.7 },

  // Third phrase - so proud
  { time: "2:0", note: "Bb4", duration: "4n", velocity: 0.75 },
  { time: "2:1", note: "C5", duration: "4n", velocity: 0.8 },
  { time: "2:2", note: "D5", duration: "4n", velocity: 0.85 },
  { time: "2:3", note: "C5", duration: "4n", velocity: 0.75 },

  // Fourth phrase - bright future
  { time: "3:0", note: "F5", duration: "4n", velocity: 0.8 },
  { time: "3:1", note: "C5", duration: "4n", velocity: 0.75 },
  { time: "3:2", note: "A4", duration: "4n", velocity: 0.7 },
  { time: "3:3", note: "F4", duration: "2n", velocity: 0.75 },
];

export const graduationDayHarmony: Note[] = [
  // Bar 1: F major
  { time: "0:0", note: "F2", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "C3", duration: "1n", velocity: 0.25 },

  // Bar 2: Bb major
  { time: "1:0", note: "Bb2", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "F3", duration: "1n", velocity: 0.25 },

  // Bar 3: G minor feel
  { time: "2:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 4: F major resolution
  { time: "3:0", note: "F2", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "C3", duration: "1n", velocity: 0.3 },
];
