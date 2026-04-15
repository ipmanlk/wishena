import type { Note } from "@/lib/types";

/**
 * Sunset Love Melody
 * Key: F Major
 * Tempo: 65 BPM
 * Feel: Romantic, warm, heartfelt
 * Visual match: Rose, purple, orange gradients
 *
 * Musical concept:
 * - F major for warm, rich tone
 * - Longer notes for romantic spaciousness
 * - Gentle rises like emotions swelling
 * - Thirds and sixths for romantic harmony
 */
export const sunsetLoveMelody: Note[] = [
  // First phrase - tender opening
  { time: "0:0", note: "F4", duration: "2n", velocity: 0.6 },
  { time: "0:2", note: "A4", duration: "4n", velocity: 0.65 },
  { time: "0:3", note: "C5", duration: "4n", velocity: 0.7 },

  // Second phrase - rising emotion
  { time: "1:0", note: "A4", duration: "4n", velocity: 0.65 },
  { time: "1:1", note: "G4", duration: "8n", velocity: 0.6 },
  { time: "1:1:2", note: "A4", duration: "8n", velocity: 0.65 },
  { time: "1:2", note: "F4", duration: "2n", velocity: 0.7 },

  // Third phrase - reaching peak
  { time: "2:0", note: "C5", duration: "4n", velocity: 0.75 },
  { time: "2:1", note: "D5", duration: "8n", velocity: 0.7 },
  { time: "2:1:2", note: "C5", duration: "8n", velocity: 0.65 },
  { time: "2:2", note: "A4", duration: "4n", velocity: 0.7 },
  { time: "2:3", note: "G4", duration: "4n", velocity: 0.6 },

  // Fourth phrase - tender resolution
  { time: "3:0", note: "A4", duration: "4n", velocity: 0.65 },
  { time: "3:1", note: "F4", duration: "4n", velocity: 0.7 },
  { time: "3:2", note: "C4", duration: "2n", velocity: 0.6 },
];

export const sunsetLoveHarmony: Note[] = [
  // Bar 1: F major
  { time: "0:0", note: "F2", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "C3", duration: "1n", velocity: 0.25 },

  // Bar 2: D minor
  { time: "1:0", note: "D3", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "A3", duration: "1n", velocity: 0.25 },

  // Bar 3: Bb major
  { time: "2:0", note: "Bb2", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "F3", duration: "1n", velocity: 0.25 },

  // Bar 4: F major resolution
  { time: "3:0", note: "F2", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "C3", duration: "1n", velocity: 0.3 },
];
