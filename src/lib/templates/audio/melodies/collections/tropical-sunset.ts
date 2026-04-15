import type { Note } from "@/lib/types";

/**
 * Tropical Sunset Melody
 * Key: D Major
 * Tempo: 78 BPM
 * Feel: Warm, relaxed, vacation vibes
 * Visual match: Orange, coral, tropical beach sunset
 *
 * Musical concept:
 * - D major for bright, tropical feel
 * - Island-inspired rhythmic patterns
 * - Gentle ascending phrases like palm trees swaying
 * - Warm, open intervals
 */
export const tropicalSunsetMelody: Note[] = [
  // First phrase - warm arrival
  { time: "0:0", note: "D4", duration: "8n", velocity: 0.6 },
  { time: "0:0:2", note: "F#4", duration: "8n", velocity: 0.65 },
  { time: "0:1", note: "A4", duration: "4n", velocity: 0.7 },
  { time: "0:2", note: "B4", duration: "8n", velocity: 0.65 },
  { time: "0:2:2", note: "A4", duration: "8n", velocity: 0.6 },
  { time: "0:3", note: "F#4", duration: "4n", velocity: 0.55 },

  // Second phrase - island breeze
  { time: "1:0", note: "A4", duration: "8n", velocity: 0.6 },
  { time: "1:0:2", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "1:1", note: "B4", duration: "4n", velocity: 0.7 },
  { time: "1:2", note: "A4", duration: "8n", velocity: 0.65 },
  { time: "1:2:2", note: "F#4", duration: "8n", velocity: 0.6 },
  { time: "1:3", note: "D4", duration: "4n", velocity: 0.55 },

  // Third phrase - golden light
  { time: "2:0", note: "F#4", duration: "8n", velocity: 0.65 },
  { time: "2:0:2", note: "A4", duration: "8n", velocity: 0.7 },
  { time: "2:1", note: "B4", duration: "4n", velocity: 0.75 },
  { time: "2:2", note: "D5", duration: "8n", velocity: 0.7 },
  { time: "2:2:2", note: "B4", duration: "8n", velocity: 0.65 },
  { time: "2:3", note: "A4", duration: "4n", velocity: 0.6 },

  // Fourth phrase - peaceful evening
  { time: "3:0", note: "D5", duration: "4n", velocity: 0.65 },
  { time: "3:1", note: "B4", duration: "8n", velocity: 0.6 },
  { time: "3:1:2", note: "A4", duration: "8n", velocity: 0.55 },
  { time: "3:2", note: "F#4", duration: "2n", velocity: 0.6 },
];

export const tropicalSunsetHarmony: Note[] = [
  // Bar 1: D major
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.28 },
  { time: "0:0", note: "A3", duration: "1n", velocity: 0.23 },

  // Bar 2: G major feel
  { time: "1:0", note: "G2", duration: "1n", velocity: 0.28 },
  { time: "1:0", note: "D3", duration: "1n", velocity: 0.23 },

  // Bar 3: A major
  { time: "2:0", note: "A2", duration: "1n", velocity: 0.28 },
  { time: "2:0", note: "E3", duration: "1n", velocity: 0.23 },

  // Bar 4: D major resolution
  { time: "3:0", note: "D3", duration: "1n", velocity: 0.32 },
  { time: "3:0", note: "F#3", duration: "1n", velocity: 0.27 },
];
