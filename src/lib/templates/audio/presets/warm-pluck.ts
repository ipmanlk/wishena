import { effectTypes, synthTypes } from "@/lib/types";

export const warmPluck = {
  type: synthTypes.Synth,
  settings: {
    oscillator: {
      type: "triangle",
    },
    envelope: {
      attack: 0.015,
      decay: 0.4,
      sustain: 0.15,
      release: 0.9,
    },
  },
  effects: [effectTypes.reverb, effectTypes.chorus],
};
