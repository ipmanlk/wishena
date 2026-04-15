import { effectTypes, synthTypes } from "@/lib/types";

export const mellowEP = {
  type: synthTypes.FMSynth,
  settings: {
    harmonicity: 1.5,
    modulationIndex: 4,
    detune: 0,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.02,
      decay: 0.3,
      sustain: 0.4,
      release: 1.2,
    },
    modulation: {
      type: "triangle",
    },
    modulationEnvelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.3,
      release: 0.6,
    },
  },
  effects: [effectTypes.reverb, effectTypes.delay],
};
