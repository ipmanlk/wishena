import type { Unit } from "tone";
import type {
  FMSynthOptions,
  AMSynthOptions,
  DuoSynthOptions,
  SynthOptions,
  ReverbOptions,
  FeedbackDelayOptions,
  ChorusOptions,
  FilterOptions,
} from "tone";

export type VisualsPreset = "glow-dust" | "confetti" | "snow";

export type NoteTone = Unit.Note;

export type Duration = Unit.Subdivision;

export type SynthType = "FMSynth" | "AMSynth" | "Synth" | "DuoSynth";

export type EffectType = "reverb" | "delay" | "chorus" | "filter";

export interface Note {
  time: Unit.Time;
  note: NoteTone;
  duration: Duration;
  velocity?: Unit.NormalRange;
}

export interface InstrumentConfig {
  type: SynthType;
  settings?: Record<string, unknown>;
  effects?: EffectType[];
}

export interface EffectConfig {
  reverb: ReverbOptions;
  delay: FeedbackDelayOptions;
  chorus: ChorusOptions;
  filter: FilterOptions;
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

export interface PreviewLine {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface TemplatePreview {
  background: string;
  lines: PreviewLine[];
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  categories: string[];
  preview: TemplatePreview;
  defaultValues: Record<string, string>;

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
