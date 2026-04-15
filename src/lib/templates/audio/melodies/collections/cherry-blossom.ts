import type { Note } from "@/lib/types";

/**
 * Cherry Blossom Melody
 * Key: D Major
 * Tempo: 76 BPM
 * Feel: Delicate, fleeting, beautiful
 * Visual match: Soft pinks, whites, gentle petals
 *
 * Musical concept:
 * - High register for delicacy
 * - Short, light notes like petals falling
 * - Graceful ornaments like blossoms
 * - Major for innocent beauty
 */
export const cherryBlossomMelody: Note[] = [
  // First phrase - delicate opening
  { time: "0:0", note: "F#5", duration: "16n", velocity: 0.55 },
  { time: "0:0:1", note: "A5", duration: "16n", velocity: 0.6 },
  { time: "0:0:2", note: "F#5", duration: "8n", velocity: 0.55 },
  { time: "0:1", note: "D5", duration: "4n", velocity: 0.65 },
  { time: "0:2", note: "E5", duration: "8n", velocity: 0.6 },
  { time: "0:2:2", note: "F#5", duration: "8n", velocity: 0.55 },
  { time: "0:3", note: "A5", duration: "4n", velocity: 0.6 },

  // Second phrase - floating descent
  { time: "1:0", note: "F#5", duration: "8n", velocity: 0.6 },
  { time: "1:0:2", note: "E5", duration: "8n", velocity: 0.55 },
  { time: "1:1", note: "D5", duration: "4n", velocity: 0.65 },
  { time: "1:2", note: "F#5", duration: "8n", velocity: 0.6 },
  { time: "1:2:2", note: "D5", duration: "8n", velocity: 0.55 },
  { time: "1:3", note: "A4", duration: "4n", velocity: 0.6 },

  // Third phrase - gentle rise
  { time: "2:0", note: "D5", duration: "8n", velocity: 0.6 },
  { time: "2:0:2", note: "F#5", duration: "8n", velocity: 0.65 },
  { time: "2:1", note: "A5", duration: "8n", velocity: 0.7 },
  { time: "2:1:2", note: "B5", duration: "8n", velocity: 0.65 },
  { time: "2:2", note: "A5", duration: "4n", velocity: 0.6 },
  { time: "2:3", note: "F#5", duration: "4n", velocity: 0.55 },

  // Fourth phrase - soft landing
  { time: "3:0", note: "E5", duration: "8n", velocity: 0.6 },
  { time: "3:0:2", note: "D5", duration: "8n", velocity: 0.55 },
  { time: "3:1", note: "A4", duration: "4n", velocity: 0.6 },
  { time: "3:2", note: "D5", duration: "2n", velocity: 0.65 },
];

export const cherryBlossomHarmony: Note[] = [
  // Bar 1: D major
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.28 },
  { time: "0:0", note: "A3", duration: "1n", velocity: 0.23 },

  // Bar 2: B minor feel
  { time: "1:0", note: "B2", duration: "1n", velocity: 0.28 },
  { time: "1:0", note: "F#3", duration: "1n", velocity: 0.23 },

  // Bar 3: G major
  { time: "2:0", note: "G2", duration: "1n", velocity: 0.28 },
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.23 },

  // Bar 4: D major resolution
  { time: "3:0", note: "D3", duration: "1n", velocity: 0.32 },
  { time: "3:0", note: "A3", duration: "1n", velocity: 0.27 },
];
