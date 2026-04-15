import type { Note } from "@/lib/types";

/**
 * Morning Coffee Melody
 * Key: C Major
 * Tempo: 82 BPM
 * Feel: Cozy, friendly, uplifting
 * Visual match: Warm amber, cream, soft morning light
 *
 * Musical concept:
 * - Gentle major pentatonic phrases
 * - Rhythmic, conversational patterns
 * - Comfortable mid-register like acoustic guitar
 */
export const morningCoffeeMelody: Note[] = [
  // First phrase - warm greeting
  { time: "0:0", note: "C4", duration: "8n", velocity: 0.6 },
  { time: "0:0:2", note: "E4", duration: "8n", velocity: 0.65 },
  { time: "0:1", note: "G4", duration: "4n", velocity: 0.7 },
  { time: "0:2", note: "A4", duration: "8n", velocity: 0.65 },
  { time: "0:2:2", note: "G4", duration: "8n", velocity: 0.6 },
  { time: "0:3", note: "E4", duration: "4n", velocity: 0.55 },

  // Second phrase - easygoing chat
  { time: "1:0", note: "G4", duration: "8n", velocity: 0.65 },
  { time: "1:0:2", note: "C5", duration: "8n", velocity: 0.7 },
  { time: "1:1", note: "G4", duration: "4n", velocity: 0.65 },
  { time: "1:2", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "1:2:2", note: "D4", duration: "8n", velocity: 0.55 },
  { time: "1:3", note: "C4", duration: "4n", velocity: 0.6 },

  // Third phrase - little smile
  { time: "2:0", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "2:0:2", note: "G4", duration: "8n", velocity: 0.65 },
  { time: "2:1", note: "A4", duration: "4n", velocity: 0.7 },
  { time: "2:2", note: "G4", duration: "8n", velocity: 0.65 },
  { time: "2:2:2", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "2:3", note: "D4", duration: "4n", velocity: 0.55 },

  // Fourth phrase - content resolve
  { time: "3:0", note: "C4", duration: "4n", velocity: 0.6 },
  { time: "3:1", note: "G4", duration: "8n", velocity: 0.65 },
  { time: "3:1:2", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "3:2", note: "C4", duration: "2n", velocity: 0.65 },
];

export const morningCoffeeHarmony: Note[] = [
  // Bar 1: C major
  { time: "0:0", note: "C3", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "G3", duration: "1n", velocity: 0.25 },

  // Bar 2: F major
  { time: "1:0", note: "F2", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "C3", duration: "1n", velocity: 0.25 },

  // Bar 3: G major
  { time: "2:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 4: C major
  { time: "3:0", note: "C3", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "E3", duration: "1n", velocity: 0.3 },
];
