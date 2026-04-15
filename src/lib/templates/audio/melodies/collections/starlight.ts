import type { Note } from "@/lib/types";

/**
 * Starlight Melody
 * Key: Bb Major
 * Tempo: 70 BPM
 * Feel: Dreamy, magical, wondrous
 * Visual match: Deep purples, twinkling stars, night sky
 *
 * Musical concept:
 * - Wide intervals for vast space feeling
 * - Higher register for twinkling effect
 * - Gentle arpeggios like star patterns
 * - Major for hopeful, dreamy quality
 */
export const starlightMelody: Note[] = [
  // First phrase - twinkling stars
  { time: "0:0", note: "Bb4", duration: "8n", velocity: 0.6 },
  { time: "0:0:2", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "0:1", note: "F5", duration: "4n", velocity: 0.7 },
  { time: "0:2", note: "Bb5", duration: "8n", velocity: 0.75 },
  { time: "0:2:2", note: "F5", duration: "8n", velocity: 0.65 },
  { time: "0:3", note: "D5", duration: "4n", velocity: 0.6 },

  // Second phrase - wandering gaze
  { time: "1:0", note: "F5", duration: "8n", velocity: 0.65 },
  { time: "1:0:2", note: "G5", duration: "8n", velocity: 0.6 },
  { time: "1:1", note: "Eb5", duration: "4n", velocity: 0.7 },
  { time: "1:2", note: "D5", duration: "4n", velocity: 0.6 },
  { time: "1:3", note: "Bb4", duration: "4n", velocity: 0.55 },

  // Third phrase - reaching upward
  { time: "2:0", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "2:0:2", note: "F5", duration: "8n", velocity: 0.7 },
  { time: "2:1", note: "Bb5", duration: "4n", velocity: 0.75 },
  { time: "2:2", note: "D6", duration: "8n", velocity: 0.8 },
  { time: "2:2:2", note: "Bb5", duration: "8n", velocity: 0.7 },
  { time: "2:3", note: "F5", duration: "4n", velocity: 0.65 },

  // Fourth phrase - dreamy fade
  { time: "3:0", note: "G5", duration: "8n", velocity: 0.65 },
  { time: "3:0:2", note: "F5", duration: "8n", velocity: 0.6 },
  { time: "3:1", note: "Eb5", duration: "4n", velocity: 0.65 },
  { time: "3:2", note: "Bb4", duration: "2n", velocity: 0.7 },
];

export const starlightHarmony: Note[] = [
  // Bar 1: Bb major
  { time: "0:0", note: "Bb2", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "F3", duration: "1n", velocity: 0.25 },

  // Bar 2: G minor feel
  { time: "1:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 3: Eb major
  { time: "2:0", note: "Eb3", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "Bb3", duration: "1n", velocity: 0.25 },

  // Bar 4: Bb major resolution
  { time: "3:0", note: "Bb2", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "F3", duration: "1n", velocity: 0.3 },
];
