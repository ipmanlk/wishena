export type VisualsPreset = "glow-dust" | "confetti" | "snow";

export type NoteTone =
  | "C2"
  | "C#2"
  | "Db2"
  | "D2"
  | "D#2"
  | "Eb2"
  | "E2"
  | "F2"
  | "F#2"
  | "Gb2"
  | "G2"
  | "G#2"
  | "Ab2"
  | "A2"
  | "A#2"
  | "Bb2"
  | "B2"
  | "C3"
  | "C#3"
  | "Db3"
  | "D3"
  | "D#3"
  | "Eb3"
  | "E3"
  | "F3"
  | "F#3"
  | "Gb3"
  | "G3"
  | "G#3"
  | "Ab3"
  | "A3"
  | "A#3"
  | "Bb3"
  | "B3"
  | "C4"
  | "C#4"
  | "Db4"
  | "D4"
  | "D#4"
  | "Eb4"
  | "E4"
  | "F4"
  | "F#4"
  | "Gb4"
  | "G4"
  | "G#4"
  | "Ab4"
  | "A4"
  | "A#4"
  | "Bb4"
  | "B4"
  | "C5"
  | "C#5"
  | "Db5"
  | "D5"
  | "D#5"
  | "Eb5"
  | "E5"
  | "F5"
  | "F#5"
  | "Gb5"
  | "G5"
  | "G#5"
  | "Ab5"
  | "A5"
  | "A#5"
  | "Bb5"
  | "B5"
  | "C6";

export type Duration =
  | "1n"
  | "2n"
  | "2n."
  | "4n"
  | "4n."
  | "8n"
  | "8n."
  | "16n"
  | "16n."
  | "32n";

export type SynthType = "FMSynth" | "AMSynth" | "Synth" | "DuoSynth";

export type EffectType = "reverb" | "delay" | "chorus" | "filter";

export interface Note {
  time: string;
  note: NoteTone;
  duration: Duration;
  velocity?: number;
}

export interface InstrumentConfig {
  type: SynthType;
  settings?: Record<string, unknown>;
  effects?: EffectType[];
}

export interface AudioConfig {
  engine: "tonejs";
  key: "C" | "G" | "D" | "A" | "F" | "Bb" | "Am" | "Em" | "Dm" | "Gm";
  mode: "major" | "minor" | "dorian" | "lydian" | "mixolydian";
  tempo: number;
  instrument: InstrumentConfig;
  melody: Note[];
  harmony?: Note[];
  rhythm?: Note[];
  loop: boolean;
  fadeIn?: number;
  fadeOut?: number;
  volume: number;
}

export interface InputField {
  key: string;
  type: "text" | "textarea" | "date";
  label: string;
  placeholder?: string;
  maxLength?: number;
  required: boolean;
}

export type ModuleType =
  | "neon_text"
  | "standard_text"
  | "countdown"
  | "floating_hearts";

export interface Module {
  id: string;
  type: ModuleType;
  style?: string;
  bindTo?: string;
  prefix?: string;
  animation?: "fade_up" | "scale_in" | "typewriter";
  props?: Record<string, unknown>;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  category?: "birthday" | "celebration" | "love" | string;

  blueprint: {
    globalStyle?: string;

    visuals?: {
      engine: "tsparticles";
      preset: VisualsPreset;
      mobileDensity: number;
      desktopDensity: number;
    };

    audio?: AudioConfig;

    modules: Module[];
    requiredInputs: InputField[];
  };
}

export interface Wish {
  id: string;
  templateId: string;
  payload: Record<string, string>;
  createdAt: string;
  expiresAt?: string;
}
