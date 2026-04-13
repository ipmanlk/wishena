import type { Note } from "../types";

/**
 * Melodies composed to match template aesthetics
 * Each melody is designed to loop seamlessly and evoke specific emotions
 */

/**
 * Golden Hour Melody
 * Key: G Major
 * Tempo: 74 BPM
 * Feel: Warm, contemplative, grateful
 * Visual match: Cream backgrounds, gold accents, soft confetti
 *
 * Musical concept:
 * - Uses G major pentatonic for universal warmth
 * - Gentle upward arpeggios like sunlight spreading
 * - Space between phrases allows breathing
 * - Resolves to tonic for closure
 */
export const goldenHourMelody: Note[] = [
  // First phrase - gentle rising (like dawn)
  { time: "0:0", note: "G3", duration: "4n", velocity: 0.6 },
  { time: "0:1", note: "B3", duration: "8n", velocity: 0.5 },
  { time: "0:1:2", note: "D4", duration: "8n", velocity: 0.6 },
  { time: "0:2", note: "G4", duration: "4n", velocity: 0.7 },
  { time: "0:3", note: "D4", duration: "4n", velocity: 0.5 },

  // Second phrase - gentle movement (like breeze)
  { time: "1:0", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "1:0:2", note: "D4", duration: "8n", velocity: 0.5 },
  { time: "1:1", note: "B3", duration: "4n", velocity: 0.6 },
  { time: "1:2", note: "G3", duration: "4n", velocity: 0.5 },
  { time: "1:3", note: "B3", duration: "4n", velocity: 0.6 },

  // Third phrase - reaching up (like hope)
  { time: "2:0", note: "D4", duration: "4n", velocity: 0.6 },
  { time: "2:1", note: "E4", duration: "8n", velocity: 0.5 },
  { time: "2:1:2", note: "G4", duration: "8n", velocity: 0.7 },
  { time: "2:2", note: "B4", duration: "4n", velocity: 0.6 },
  { time: "2:3", note: "G4", duration: "4n", velocity: 0.5 },

  // Fourth phrase - gentle resolution (like sunset)
  { time: "3:0", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "3:0:2", note: "D4", duration: "8n", velocity: 0.5 },
  { time: "3:1", note: "B3", duration: "4n", velocity: 0.6 },
  { time: "3:2", note: "G3", duration: "2n", velocity: 0.7 },
];

/**
 * Golden Hour Harmony
 * Simple chords that support the melody
 * Drones and gentle chord movements
 */
export const goldenHourHarmony: Note[] = [
  // Bar 1: G major feel
  { time: "0:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 2: Em7 feel
  { time: "1:0", note: "E2", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "B2", duration: "1n", velocity: 0.25 },

  // Bar 3: C major feel
  { time: "2:0", note: "C3", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "G3", duration: "1n", velocity: 0.25 },

  // Bar 4: Back to G
  { time: "3:0", note: "G2", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "D3", duration: "1n", velocity: 0.3 },
];

/**
 * Midnight Glow Melody
 * Key: A Minor
 * Tempo: 105 BPM
 * Feel: Energetic, modern, exciting
 * Visual match: Dark backgrounds, neon cyan/pink, particles
 *
 * Musical concept:
 * - A minor for cool, modern feel
 * - Syncopated rhythms for groove
 * - Call and response patterns
 * - Octave jumps for energy
 */
export const midnightGlowMelody: Note[] = [
  // First phrase - energetic call (the "hey!")
  { time: "0:0", note: "A3", duration: "8n", velocity: 0.8 },
  { time: "0:0:2", note: "A3", duration: "16n", velocity: 0.7 },
  { time: "0:1", note: "C4", duration: "8n", velocity: 0.8 },
  { time: "0:1:2", note: "E4", duration: "8n", velocity: 0.9 },
  { time: "0:2", note: "A4", duration: "8n", velocity: 1.0 },
  { time: "0:2:2", note: "G4", duration: "16n", velocity: 0.8 },
  { time: "0:3", note: "E4", duration: "8n", velocity: 0.8 },

  // Second phrase - response (the answer)
  { time: "1:0", note: "C4", duration: "8n", velocity: 0.8 },
  { time: "1:0:2", note: "E4", duration: "8n", velocity: 0.7 },
  { time: "1:1", note: "D4", duration: "8n", velocity: 0.8 },
  { time: "1:1:2", note: "C4", duration: "8n", velocity: 0.7 },
  { time: "1:2", note: "B3", duration: "4n", velocity: 0.8 },
  { time: "1:3", note: "A3", duration: "4n", velocity: 0.8 },

  // Third phrase - climbing energy
  { time: "2:0", note: "E4", duration: "8n", velocity: 0.8 },
  { time: "2:0:2", note: "G4", duration: "8n", velocity: 0.9 },
  { time: "2:1", note: "A4", duration: "8n", velocity: 1.0 },
  { time: "2:1:2", note: "C5", duration: "8n", velocity: 0.9 },
  { time: "2:2", note: "B4", duration: "8n", velocity: 0.85 },
  { time: "2:2:2", note: "G4", duration: "8n", velocity: 0.8 },
  { time: "2:3", note: "E4", duration: "8n", velocity: 0.8 },

  // Fourth phrase - resolving with punch
  { time: "3:0", note: "A4", duration: "8n", velocity: 0.9 },
  { time: "3:0:2", note: "E4", duration: "16n", velocity: 0.7 },
  { time: "3:1", note: "C4", duration: "8n", velocity: 0.8 },
  { time: "3:1:2", note: "D4", duration: "8n", velocity: 0.8 },
  { time: "3:2", note: "E4", duration: "4n", velocity: 0.9 },
  { time: "3:3", note: "A3", duration: "4n", velocity: 0.8 },
];

/**
 * Midnight Glow Harmony
 * Pulsing bass and chord stabs
 */
export const midnightGlowHarmony: Note[] = [
  // Bar 1: A minor pulse
  { time: "0:0", note: "A2", duration: "8n", velocity: 0.6 },
  { time: "0:1", note: "A2", duration: "8n", velocity: 0.5 },
  { time: "0:2", note: "E2", duration: "8n", velocity: 0.6 },
  { time: "0:3", note: "A2", duration: "8n", velocity: 0.55 },

  // Bar 2: F major feel
  { time: "1:0", note: "F2", duration: "8n", velocity: 0.6 },
  { time: "1:1", note: "F2", duration: "8n", velocity: 0.5 },
  { time: "1:2", note: "C3", duration: "8n", velocity: 0.55 },
  { time: "1:3", note: "F2", duration: "8n", velocity: 0.5 },

  // Bar 3: G major feel
  { time: "2:0", note: "G2", duration: "8n", velocity: 0.6 },
  { time: "2:1", note: "G2", duration: "8n", velocity: 0.5 },
  { time: "2:2", note: "D3", duration: "8n", velocity: 0.55 },
  { time: "2:3", note: "G2", duration: "8n", velocity: 0.5 },

  // Bar 4: Back to A minor
  { time: "3:0", note: "A2", duration: "8n", velocity: 0.65 },
  { time: "3:1", note: "A2", duration: "8n", velocity: 0.55 },
  { time: "3:2", note: "E2", duration: "8n", velocity: 0.6 },
  { time: "3:3", note: "A2", duration: "8n", velocity: 0.55 },
];

/**
 * Melody collections by template ID for easy lookup
 */
export const melodiesByTemplate: Record<
  string,
  { melody: Note[]; harmony?: Note[] }
> = {
  "gentle-celebration": {
    melody: goldenHourMelody,
    harmony: goldenHourHarmony,
  },
  "neon-birthday": {
    melody: midnightGlowMelody,
    harmony: midnightGlowHarmony,
  },
};
