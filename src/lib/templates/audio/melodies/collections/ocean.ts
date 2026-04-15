import type { Note } from "@/lib/types";

/**
 * Ocean Breeze Melody
 * Key: C Major
 * Tempo: 72 BPM
 * Feel: Flowing, refreshing, calm
 * Visual match: Teal blues, gentle waves, peaceful
 *
 * Musical concept:
 * - Major pentatonic for pure, open feeling
 * - Wave-like arpeggios rising and falling
 * - Even rhythm like gentle tide
 * - Fourths and fifths for openness
 */
export const oceanBreezeMelody: Note[] = [
  // First phrase - rising wave
  { time: "0:0", note: "C4", duration: "8n", velocity: 0.6 },
  { time: "0:0:2", note: "E4", duration: "8n", velocity: 0.65 },
  { time: "0:1", note: "G4", duration: "4n", velocity: 0.7 },
  { time: "0:2", note: "A4", duration: "8n", velocity: 0.65 },
  { time: "0:2:2", note: "G4", duration: "8n", velocity: 0.6 },
  { time: "0:3", note: "E4", duration: "4n", velocity: 0.55 },

  // Second phrase - gentle ebb
  { time: "1:0", note: "G4", duration: "8n", velocity: 0.6 },
  { time: "1:0:2", note: "E4", duration: "8n", velocity: 0.55 },
  { time: "1:1", note: "C4", duration: "4n", velocity: 0.6 },
  { time: "1:2", note: "D4", duration: "4n", velocity: 0.55 },
  { time: "1:3", note: "E4", duration: "4n", velocity: 0.6 },

  // Third phrase - flowing movement
  { time: "2:0", note: "G4", duration: "8n", velocity: 0.65 },
  { time: "2:0:2", note: "A4", duration: "8n", velocity: 0.7 },
  { time: "2:1", note: "C5", duration: "4n", velocity: 0.75 },
  { time: "2:2", note: "G4", duration: "8n", velocity: 0.65 },
  { time: "2:2:2", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "2:3", note: "D4", duration: "4n", velocity: 0.55 },

  // Fourth phrase - peaceful shore
  { time: "3:0", note: "C4", duration: "4n", velocity: 0.6 },
  { time: "3:1", note: "E4", duration: "8n", velocity: 0.55 },
  { time: "3:1:2", note: "G4", duration: "8n", velocity: 0.6 },
  { time: "3:2", note: "C4", duration: "2n", velocity: 0.65 },
];

export const oceanBreezeHarmony: Note[] = [
  // Bar 1: C major
  { time: "0:0", note: "C3", duration: "1n", velocity: 0.28 },
  { time: "0:0", note: "G3", duration: "1n", velocity: 0.23 },

  // Bar 2: F major
  { time: "1:0", note: "F2", duration: "1n", velocity: 0.28 },
  { time: "1:0", note: "C3", duration: "1n", velocity: 0.23 },

  // Bar 3: G major
  { time: "2:0", note: "G2", duration: "1n", velocity: 0.28 },
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.23 },

  // Bar 4: C major resolution
  { time: "3:0", note: "C3", duration: "1n", velocity: 0.32 },
  { time: "3:0", note: "G3", duration: "1n", velocity: 0.27 },
];
