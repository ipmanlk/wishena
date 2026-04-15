import { effectTypes, synthTypes } from "@/lib/types";

export const softPad = {
  type: synthTypes.DuoSynth,
  settings: {
    vibratoAmount: 0.3,
    vibratoRate: 4,
    harmonicity: 1.2,
    voice0: {
      volume: -12,
      portamento: 0.1,
      oscillator: {
        type: "sine",
      },
      filterEnvelope: {
        attack: 0.5,
        decay: 0.3,
        sustain: 0.8,
        release: 1.5,
      },
      envelope: {
        attack: 0.5,
        decay: 0.3,
        sustain: 0.8,
        release: 1.5,
      },
    },
    voice1: {
      volume: -12,
      portamento: 0.1,
      oscillator: {
        type: "triangle",
      },
      filterEnvelope: {
        attack: 0.5,
        decay: 0.3,
        sustain: 0.8,
        release: 1.5,
      },
      envelope: {
        attack: 0.5,
        decay: 0.3,
        sustain: 0.8,
        release: 1.5,
      },
    },
  },
  effects: [effectTypes.reverb],
};
