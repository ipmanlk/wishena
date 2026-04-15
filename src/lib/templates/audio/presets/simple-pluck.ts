import { effectTypes, synthTypes } from "@/lib/types";

export const simplePluck = {
  type: synthTypes.Synth,
  settings: {
    oscillator: {
      type: "triangle",
    },
    envelope: {
      attack: 0.02,
      decay: 0.3,
      sustain: 0.1,
      release: 0.6,
    },
  },
  effects: [effectTypes.reverb],
};
