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
 * Winter Wonderland Melody
 * Key: D Minor
 * Tempo: 68 BPM
 * Feel: Contemplative, cozy, peaceful
 * Visual match: Snow falling, cool blues, winter nights
 *
 * Musical concept:
 * - Minor key for introspective winter feeling
 * - Gentle stepwise motion like falling snow
 * - Spacious phrases with rests
 * - Use of sixths for warmth within minor context
 */
export const winterWonderlandMelody: Note[] = [
  // First phrase - gentle descent (snow falling)
  { time: "0:0", note: "D4", duration: "4n", velocity: 0.6 },
  { time: "0:1", note: "C4", duration: "8n", velocity: 0.5 },
  { time: "0:1:2", note: "A3", duration: "8n", velocity: 0.55 },
  { time: "0:2", note: "F3", duration: "4n", velocity: 0.6 },
  { time: "0:3", note: "A3", duration: "4n", velocity: 0.5 },

  // Second phrase - wandering (breeze through trees)
  { time: "1:0", note: "G3", duration: "8n", velocity: 0.6 },
  { time: "1:0:2", note: "A3", duration: "8n", velocity: 0.5 },
  { time: "1:1", note: "C4", duration: "4n", velocity: 0.6 },
  { time: "1:2", note: "D4", duration: "4n", velocity: 0.55 },
  { time: "1:3", note: "C4", duration: "4n", velocity: 0.5 },

  // Third phrase - rising hope (warmth indoors)
  { time: "2:0", note: "F4", duration: "4n", velocity: 0.65 },
  { time: "2:1", note: "E4", duration: "8n", velocity: 0.55 },
  { time: "2:1:2", note: "D4", duration: "8n", velocity: 0.6 },
  { time: "2:2", note: "C4", duration: "4n", velocity: 0.55 },
  { time: "2:3", note: "A3", duration: "4n", velocity: 0.5 },

  // Fourth phrase - peaceful resolution
  { time: "3:0", note: "G3", duration: "8n", velocity: 0.6 },
  { time: "3:0:2", note: "A3", duration: "8n", velocity: 0.5 },
  { time: "3:1", note: "C4", duration: "4n", velocity: 0.55 },
  { time: "3:2", note: "D4", duration: "2n", velocity: 0.6 },
];

export const winterWonderlandHarmony: Note[] = [
  // Bar 1: D minor
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "A3", duration: "1n", velocity: 0.25 },

  // Bar 2: Bb major feel
  { time: "1:0", note: "Bb2", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "F3", duration: "1n", velocity: 0.25 },

  // Bar 3: G minor feel
  { time: "2:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 4: Back to D minor
  { time: "3:0", note: "D3", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "A3", duration: "1n", velocity: 0.3 },
];

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

/**
 * Forest Calm Melody
 * Key: G Major
 * Tempo: 60 BPM
 * Feel: Grounding, peaceful, organic
 * Visual match: Deep greens, earth tones, nature
 *
 * Musical concept:
 * - Lower register for grounded feeling
 * - Repetitive patterns like rustling leaves
 * - Fourth intervals for open, natural sound
 * - Pentatonic for simplicity and peace
 */
export const forestCalmMelody: Note[] = [
  // First phrase - rooted bass
  { time: "0:0", note: "G3", duration: "4n", velocity: 0.6 },
  { time: "0:1", note: "B3", duration: "8n", velocity: 0.55 },
  { time: "0:1:2", note: "D4", duration: "8n", velocity: 0.6 },
  { time: "0:2", note: "B3", duration: "4n", velocity: 0.55 },
  { time: "0:3", note: "G3", duration: "4n", velocity: 0.5 },

  // Second phrase - gentle sway
  { time: "1:0", note: "D4", duration: "8n", velocity: 0.6 },
  { time: "1:0:2", note: "B3", duration: "8n", velocity: 0.55 },
  { time: "1:1", note: "G3", duration: "4n", velocity: 0.6 },
  { time: "1:2", note: "A3", duration: "4n", velocity: 0.55 },
  { time: "1:3", note: "B3", duration: "4n", velocity: 0.5 },

  // Third phrase - reaching branches
  { time: "2:0", note: "D4", duration: "4n", velocity: 0.65 },
  { time: "2:1", note: "E4", duration: "8n", velocity: 0.6 },
  { time: "2:1:2", note: "D4", duration: "8n", velocity: 0.55 },
  { time: "2:2", note: "B3", duration: "4n", velocity: 0.6 },
  { time: "2:3", note: "G3", duration: "4n", velocity: 0.5 },

  // Fourth phrase - rooted home
  { time: "3:0", note: "A3", duration: "8n", velocity: 0.55 },
  { time: "3:0:2", note: "B3", duration: "8n", velocity: 0.6 },
  { time: "3:1", note: "D4", duration: "4n", velocity: 0.55 },
  { time: "3:2", note: "G3", duration: "2n", velocity: 0.6 },
];

export const forestCalmHarmony: Note[] = [
  // Bar 1: G major drone
  { time: "0:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 2: C major feel
  { time: "1:0", note: "C3", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "G3", duration: "1n", velocity: 0.25 },

  // Bar 3: Em feel
  { time: "2:0", note: "E2", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "B2", duration: "1n", velocity: 0.25 },

  // Bar 4: G major resolution
  { time: "3:0", note: "G2", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "D3", duration: "1n", velocity: 0.3 },
];

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

/**
 * Lavender Fields Melody
 * Key: F Major
 * Tempo: 64 BPM
 * Feel: Serene, mindful, floating
 * Visual match: Soft purples, gentle haze, relaxation
 *
 * Musical concept:
 * - Slow, spacious phrases
 * - High register for lightness
 * - Minimal movement for calm
 */
export const lavenderFieldsMelody: Note[] = [
  // First phrase - gentle breath
  { time: "0:0", note: "A4", duration: "4n", velocity: 0.55 },
  { time: "0:1", note: "C5", duration: "4n", velocity: 0.6 },
  { time: "0:2", note: "A4", duration: "2n", velocity: 0.55 },

  // Second phrase - soft drift
  { time: "1:0", note: "G4", duration: "4n", velocity: 0.55 },
  { time: "1:1", note: "A4", duration: "4n", velocity: 0.6 },
  { time: "1:2", note: "F4", duration: "2n", velocity: 0.55 },

  // Third phrase - rising calm
  { time: "2:0", note: "C5", duration: "4n", velocity: 0.6 },
  { time: "2:1", note: "A4", duration: "4n", velocity: 0.55 },
  { time: "2:2", note: "G4", duration: "4n", velocity: 0.5 },
  { time: "2:3", note: "F4", duration: "4n", velocity: 0.55 },

  // Fourth phrase - peaceful release
  { time: "3:0", note: "A4", duration: "2n", velocity: 0.6 },
  { time: "3:2", note: "F4", duration: "2n", velocity: 0.55 },
];

export const lavenderFieldsHarmony: Note[] = [
  // Bar 1: F major
  { time: "0:0", note: "F2", duration: "1n", velocity: 0.28 },
  { time: "0:0", note: "C3", duration: "1n", velocity: 0.23 },

  // Bar 2: D minor
  { time: "1:0", note: "D3", duration: "1n", velocity: 0.28 },
  { time: "1:0", note: "A3", duration: "1n", velocity: 0.23 },

  // Bar 3: Bb major
  { time: "2:0", note: "Bb2", duration: "1n", velocity: 0.28 },
  { time: "2:0", note: "F3", duration: "1n", velocity: 0.23 },

  // Bar 4: F major
  { time: "3:0", note: "F2", duration: "1n", velocity: 0.32 },
  { time: "3:0", note: "A2", duration: "1n", velocity: 0.27 },
];

/**
 * Harvest Moon Melody
 * Key: G Major
 * Tempo: 70 BPM
 * Feel: Warm, grateful, rustic
 * Visual match: Deep oranges, browns, autumn leaves
 *
 * Musical concept:
 * - Folk-inspired pentatonic melody
 * - Gentle rises and falls like rolling hills
 * - Earthy mid-register
 */
export const harvestMoonMelody: Note[] = [
  // First phrase - gathering warmth
  { time: "0:0", note: "G4", duration: "4n", velocity: 0.6 },
  { time: "0:1", note: "B4", duration: "8n", velocity: 0.65 },
  { time: "0:1:2", note: "D5", duration: "8n", velocity: 0.7 },
  { time: "0:2", note: "B4", duration: "4n", velocity: 0.65 },
  { time: "0:3", note: "G4", duration: "4n", velocity: 0.6 },

  // Second phrase - shared stories
  { time: "1:0", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "1:0:2", note: "B4", duration: "8n", velocity: 0.6 },
  { time: "1:1", note: "G4", duration: "4n", velocity: 0.65 },
  { time: "1:2", note: "A4", duration: "4n", velocity: 0.6 },
  { time: "1:3", note: "B4", duration: "4n", velocity: 0.55 },

  // Third phrase - golden light
  { time: "2:0", note: "D5", duration: "4n", velocity: 0.7 },
  { time: "2:1", note: "E5", duration: "8n", velocity: 0.65 },
  { time: "2:1:2", note: "D5", duration: "8n", velocity: 0.6 },
  { time: "2:2", note: "B4", duration: "4n", velocity: 0.65 },
  { time: "2:3", note: "G4", duration: "4n", velocity: 0.6 },

  // Fourth phrase - thankful home
  { time: "3:0", note: "A4", duration: "8n", velocity: 0.6 },
  { time: "3:0:2", note: "B4", duration: "8n", velocity: 0.65 },
  { time: "3:1", note: "G4", duration: "4n", velocity: 0.6 },
  { time: "3:2", note: "D4", duration: "2n", velocity: 0.65 },
];

export const harvestMoonHarmony: Note[] = [
  // Bar 1: G major
  { time: "0:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 2: C major
  { time: "1:0", note: "C3", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "G3", duration: "1n", velocity: 0.25 },

  // Bar 3: D major
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "A3", duration: "1n", velocity: 0.25 },

  // Bar 4: G major
  { time: "3:0", note: "G2", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "B2", duration: "1n", velocity: 0.3 },
];

/**
 * City Lights Melody
 * Key: D Major
 * Tempo: 88 BPM
 * Feel: Sophisticated, smooth, confident
 * Visual match: Deep navy, gold, urban elegance
 *
 * Musical concept:
 * - Smooth jazz-inspired phrasing
 * - Slight swing feel
 * - Cool, confident intervals
 */
export const cityLightsMelody: Note[] = [
  // First phrase - evening arrival
  { time: "0:0", note: "F#4", duration: "8n", velocity: 0.6 },
  { time: "0:0:2", note: "A4", duration: "8n", velocity: 0.65 },
  { time: "0:1", note: "D5", duration: "4n", velocity: 0.7 },
  { time: "0:2", note: "F#5", duration: "8n", velocity: 0.65 },
  { time: "0:2:2", note: "D5", duration: "8n", velocity: 0.6 },
  { time: "0:3", note: "A4", duration: "4n", velocity: 0.55 },

  // Second phrase - skyline stroll
  { time: "1:0", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "1:0:2", note: "E5", duration: "8n", velocity: 0.6 },
  { time: "1:1", note: "F#5", duration: "4n", velocity: 0.7 },
  { time: "1:2", note: "A5", duration: "8n", velocity: 0.65 },
  { time: "1:2:2", note: "F#5", duration: "8n", velocity: 0.6 },
  { time: "1:3", note: "D5", duration: "4n", velocity: 0.55 },

  // Third phrase - golden reflection
  { time: "2:0", note: "A4", duration: "8n", velocity: 0.6 },
  { time: "2:0:2", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "2:1", note: "F#5", duration: "4n", velocity: 0.7 },
  { time: "2:2", note: "E5", duration: "8n", velocity: 0.6 },
  { time: "2:2:2", note: "D5", duration: "8n", velocity: 0.55 },
  { time: "2:3", note: "A4", duration: "4n", velocity: 0.6 },

  // Fourth phrase - smooth close
  { time: "3:0", note: "F#4", duration: "4n", velocity: 0.65 },
  { time: "3:1", note: "A4", duration: "8n", velocity: 0.6 },
  { time: "3:1:2", note: "D5", duration: "8n", velocity: 0.65 },
  { time: "3:2", note: "F#4", duration: "2n", velocity: 0.7 },
];

export const cityLightsHarmony: Note[] = [
  // Bar 1: D major
  { time: "0:0", note: "D3", duration: "1n", velocity: 0.3 },
  { time: "0:0", note: "A3", duration: "1n", velocity: 0.25 },

  // Bar 2: B minor
  { time: "1:0", note: "B2", duration: "1n", velocity: 0.3 },
  { time: "1:0", note: "F#3", duration: "1n", velocity: 0.25 },

  // Bar 3: G major
  { time: "2:0", note: "G2", duration: "1n", velocity: 0.3 },
  { time: "2:0", note: "D3", duration: "1n", velocity: 0.25 },

  // Bar 4: D major
  { time: "3:0", note: "D3", duration: "1n", velocity: 0.35 },
  { time: "3:0", note: "F#3", duration: "1n", velocity: 0.3 },
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
  "snowy-winter": {
    melody: winterWonderlandMelody,
    harmony: winterWonderlandHarmony,
  },
  "ocean-breeze": {
    melody: oceanBreezeMelody,
    harmony: oceanBreezeHarmony,
  },
  "sunset-love": {
    melody: sunsetLoveMelody,
    harmony: sunsetLoveHarmony,
  },
  "forest-calm": {
    melody: forestCalmMelody,
    harmony: forestCalmHarmony,
  },
  "cherry-blossom": {
    melody: cherryBlossomMelody,
    harmony: cherryBlossomHarmony,
  },
  starlight: {
    melody: starlightMelody,
    harmony: starlightHarmony,
  },
  "morning-coffee": {
    melody: morningCoffeeMelody,
    harmony: morningCoffeeHarmony,
  },
  "lavender-fields": {
    melody: lavenderFieldsMelody,
    harmony: lavenderFieldsHarmony,
  },
  "harvest-moon": {
    melody: harvestMoonMelody,
    harmony: harvestMoonHarmony,
  },
  "city-lights": {
    melody: cityLightsMelody,
    harmony: cityLightsHarmony,
  },
};
