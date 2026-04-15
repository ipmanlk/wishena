import { effectTypes, synthTypes } from "@/lib/types";

export const gentleBells = {
  type: synthTypes.AMSynth,
  settings: {
    harmonicity: 2.5,
    oscillator: {
      type: "triangle",
    },
    envelope: {
      attack: 0.05,
      decay: 0.3,
      sustain: 0.4,
      release: 2.5,
    },
    modulation: {
      type: "sine",
    },
    modulationEnvelope: {
      attack: 0.3,
      decay: 0.1,
      sustain: 0.8,
      release: 1,
    },
  },
  effects: [effectTypes.reverb, effectTypes.chorus],
};
