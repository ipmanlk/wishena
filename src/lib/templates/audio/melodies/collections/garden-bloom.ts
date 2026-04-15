import type { Note } from "@/lib/types";

/**
 * Garden Bloom Melody
 * Key: E Major
 * Tempo: 84 BPM
 * Feel: Fresh, lively, spring renewal
 * Visual match: Soft greens, florals, blooming petals
 *
 * Musical concept:
 * - E major for bright, fresh feel
 * - Light, bouncy rhythms like fluttering petals
 * - Rising arpeggios like flowers blooming
 * - Cheerful major intervals
 */
export const gardenBloomMelody: Note[] = [
  // First phrase - new growth
  { time: "0:0", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "0:0:2", note: "G#4", duration: "8n", velocity: 0.65 },
  { time: "0:1", note: "B4", duration: "4n", velocity: 0.7 },
  { time: "0:2", note: "E5", duration: "8n", velocity: 0.75 },
  { time: "0:2:2", note: "B4", duration: "8n", velocity: 0.65 },
  { time: "0:3", note: "G#4", duration: "4n", velocity: 0.6 },

  // Second phrase - blooming
  { time: "1:0", note: "A4", duration: "8n", velocity: 0.65 },
  { time: "1:0:2", note: "B4", duration: "8n", velocity: 0.7 },
  { time: "1:1", note: "E5", duration: "4n", velocity: 0.75 },
  { time: "1:2", note: "G#4", duration: "8n", velocity: 0.65 },
  { time: "1:2:2", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "1:3", note: "B3", duration: "4n", velocity: 0.55 },

  // Third phrase - flourishing
  { time: "2:0", note: "G#4", duration: "8n", velocity: 0.65 },
  { time: "2:0:2", note: "B4", duration: "8n", velocity: 0.7 },
  { time: "2:1", note: "E5", duration: "4n", velocity: 0.75 },
  { time: "2:2", note: "G#5", duration: "8n", velocity: 0.8 },
  { time: "2:2:2", note: "E5", duration: "8n", velocity: 0.7 },
  { time: "2:3", note: "B4", duration: "4n", velocity: 0.65 },

  // Fourth phrase - radiant bloom
  { time: "3:0", note: "A4", duration: "4n", velocity: 0.7 },
  { time: "3:1", note: "G#4", duration: "4n", velocity: 0.65 },
  { time: "3:2", note: "E4", duration: "2n", velocity: 0.7 },
];

export const gardenBloomHarmony: Note[] = [
  // Bar 1: E major
  { time: "0:0", note: "E2", duration: "1n", velocity: 0.28 },
  { time: "0:0", note: "B2", duration: "1n", velocity: 0.23 },

  // Bar 2: A major
  { time: "1:0", note: "A2", duration: "1n", velocity: 0.28 },
  { time: "1:0", note: "E3", duration: "1n", velocity: 0.23 },

  // Bar 3: B major
  { time: "2:0", note: "B2", duration: "1n", velocity: 0.28 },
  { time: "2:0", note: "F#3", duration: "1n", velocity: 0.23 },

  // Bar 4: E major resolution
  { time: "3:0", note: "E2", duration: "1n", velocity: 0.32 },
  { time: "3:0", note: "B2", duration: "1n", velocity: 0.27 },
];
