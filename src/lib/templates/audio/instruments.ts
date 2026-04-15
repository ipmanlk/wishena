import * as Tone from "tone";
import type { EffectType, SynthType } from "@/lib/types";
import { brightFM } from "./presets/bright-fm";
import { gentleBells } from "./presets/gentle-bells";
import { glassMarimba } from "./presets/glass-marimba";
import { mellowEP } from "./presets/mellow-ep";
import { simplePluck } from "./presets/simple-pluck";
import { softPad } from "./presets/soft-pad";
import { warmPluck } from "./presets/warm-pluck";

export interface EffectChain {
  input: Tone.ToneAudioNode;
  output: Tone.ToneAudioNode;
  effects: Tone.ToneAudioNode[];
}

/**
 * Creates a synth instance based on the specified type
 */
export function createSynth(type: SynthType): Tone.PolySynth {
  switch (type) {
    case "FMSynth":
      return new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 3,
        modulationIndex: 10,
        detune: 0,
        oscillator: {
          type: "sine",
        },
        envelope: {
          attack: 0.01,
          decay: 0.01,
          sustain: 1,
          release: 0.5,
        },
        modulation: {
          type: "square",
        },
        modulationEnvelope: {
          attack: 0.5,
          decay: 0,
          sustain: 1,
          release: 0.5,
        },
      }) as unknown as Tone.PolySynth;

    case "AMSynth":
      return new Tone.PolySynth(Tone.AMSynth, {
        harmonicity: 2.5,
        oscillator: {
          type: "triangle",
        },
        envelope: {
          attack: 0.1,
          decay: 0.2,
          sustain: 0.6,
          release: 1.5,
        },
        modulation: {
          type: "sine",
        },
        modulationEnvelope: {
          attack: 0.5,
          decay: 0,
          sustain: 1,
          release: 0.5,
        },
      }) as unknown as Tone.PolySynth;

    case "DuoSynth":
      return new Tone.PolySynth(Tone.DuoSynth, {
        vibratoAmount: 0.3,
        vibratoRate: 4,
        harmonicity: 1.2,
        voice0: {
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
      }) as unknown as Tone.PolySynth;
    default:
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "triangle",
        },
        envelope: {
          attack: 0.05,
          decay: 0.1,
          sustain: 0.7,
          release: 0.8,
        },
      });
  }
}

/**
 * Creates an effect chain based on the specified effect types
 * Returns the input node (connect synth to this) and the output node (connect to destination)
 */
export function createEffectChain(effects: EffectType[]): EffectChain {
  const effectNodes: Tone.ToneAudioNode[] = [];

  if (effects.length === 0) {
    // No effects, create a simple pass-through
    const passThrough = new Tone.Gain(1);
    return {
      input: passThrough,
      output: passThrough,
      effects: [],
    };
  }

  // Create effect nodes
  for (const effectType of effects) {
    switch (effectType) {
      case "reverb":
        effectNodes.push(
          new Tone.Reverb({
            decay: 4,
            preDelay: 0.2,
            wet: 0.4,
          }),
        );
        break;

      case "delay":
        effectNodes.push(
          new Tone.FeedbackDelay({
            delayTime: "8n",
            feedback: 0.3,
            wet: 0.25,
          }),
        );
        break;

      case "chorus":
        effectNodes.push(
          new Tone.Chorus({
            frequency: 1.5,
            delayTime: 3.5,
            depth: 0.7,
            wet: 0.3,
          }),
        );
        break;

      case "filter":
        effectNodes.push(
          new Tone.Filter({
            frequency: 800,
            type: "lowpass",
            rolloff: -12,
            Q: 1,
          }),
        );
        break;
    }
  }

  // Connect effects in series: input -> effect1 -> effect2 -> ... -> output
  const input = effectNodes[0];
  const output = effectNodes[effectNodes.length - 1];

  for (let i = 0; i < effectNodes.length - 1; i++) {
    effectNodes[i].connect(effectNodes[i + 1]);
  }

  return {
    input,
    output,
    effects: effectNodes,
  };
}

/**
 * Pre-configured instrument presets for different template aesthetics
 */
export const instrumentPresets = {
  /**
   * Gentle bells with reverb for warm, contemplative templates
   * Perfect for: gentle-celebration, thank you, anniversary
   */
  gentleBells,

  /**
   * Bright FM synth for modern, energetic templates
   * Perfect for: neon-birthday, party, celebration
   */
  brightFM,

  /**
   * Soft pad for romantic, dreamy templates
   * Perfect for: love, romantic, wedding
   */
  softPad,

  /**
   * Simple pluck for minimalist, clean templates
   * Perfect for: modern, simple, professional
   */
  simplePluck,

  /**
   * Warm nylon guitar-like pluck for cozy, friendly templates
   * Perfect for: morning coffee, casual appreciation, friendship
   */
  warmPluck,

  /**
   * Soft glass marimba for serene, mindful templates
   * Perfect for: lavender fields, wellness, get-well wishes
   */
  glassMarimba,

  /**
   * Mellow electric piano for sophisticated, jazzy templates
   * Perfect for: city lights, congratulations, promotions
   */
  mellowEP,
};
