import type { Note } from "@/lib/types";

/**
 * Mountain Summit Melody
 * Key: Bb Major
 * Tempo: 80 BPM
 * Feel: Triumphant, expansive, inspiring
 * Visual match: White snow, blue sky, mountain peaks
 *
 * Musical concept:
 * - Bb major for majestic, open feel
 * - Rising phrases for sense of achievement
 * - Clear, confident intervals
 * - Wide range for dramatic effect
 */
export const mountainSummitMelody: Note[] = [
  // First phrase - climbing
  { time: "0:0", note: "Bb4", duration: "4n", velocity: 0.65 },
  { time: "0:1", note: "D5", duration: "4n", velocity: 0.7 },
  { time: "0:2", note: "F5", duration: "4n", velocity: 0.75 },
  { time: "0:3", note: "Eb5", duration: "4n", velocity: 0.7 },

  // Second phrase - reaching peak
  { time: "1:0", note: "F5", duration: "4n", velocity: 0.75 },
  { time: "1:1", note: "G5", duration: "4n", velocity: 0.8 },
  { time: "1:2", note: "Bb5", duration: "2n", velocity: 0.85 },
  { time: "1:3:2", note: "F5", duration: "4n", velocity: 0.7 },

  // Third phrase - surveying view
  { time: "2:0", note: "Eb5", duration: "4n", velocity: 0.7 },
  { time: "2:1", note: "D5", duration: "4n", velocity: 0.65 },
  { time: "2:2", note: "F5", duration: "4n", velocity: 0.7 },
  { time: "2:3", note: "D5", duration: "4n", velocity: 0.65 },

  // Fourth phrase - triumphant return
  { time: "3:0", note: "Bb4", duration: "4n", velocity: 0.7 },
  { time: "3:1", note: "F5", duration: "8n", velocity: 0.75 },
  { time: "3:1:2", note: "D5", duration: "8n", velocity: 0.7 },
  { time: "3:2", note: "Bb4", duration: "2n", velocity: 0.75 },
];

export const mountainSummitHarmony: Note[] = [
  // Bar 1: Bb major
  { time: "0:0", note: "Bb2", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "F3", duration: "1n", velocity: 0.25 },

  // Bar 2: F major feel
  { time: "1:0", note: "F2", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "C3", duration: "1n", velocity: 0.25 },

  // Bar 3: G minor feel
  { time: "2:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 4: Bb major resolution
  { time: "3:0", note: "Bb2", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "F3", duration: "1n", velocity: 0.3 },
];
