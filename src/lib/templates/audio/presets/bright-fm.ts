import { effectTypes, synthTypes } from "@/lib/types";

export const brightFM = {
  type: synthTypes.FMSynth,
  settings: {
    harmonicity: 3,
    modulationIndex: 8,
    detune: 0,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.5,
      release: 0.8,
    },
    modulation: {
      type: "square",
    },
    modulationEnvelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.3,
      release: 0.4,
    },
  },
  effects: [effectTypes.delay, effectTypes.filter],
};
