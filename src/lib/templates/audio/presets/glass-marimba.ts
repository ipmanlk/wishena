import { effectTypes, synthTypes } from "@/lib/types";

export const glassMarimba = {
  type: synthTypes.AMSynth,
  settings: {
    harmonicity: 3,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.01,
      decay: 0.5,
      sustain: 0.05,
      release: 1.2,
    },
    modulation: {
      type: "sine",
    },
    modulationEnvelope: {
      attack: 0.2,
      decay: 0.1,
      sustain: 0.5,
      release: 0.8,
    },
  },
  effects: [effectTypes.reverb],
};
