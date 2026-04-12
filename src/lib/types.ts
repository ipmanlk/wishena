export type VisualsPreset = "glow-dust" | "confetti" | "snow";

export interface Note {
  time: string;
  note: string;
  duration: string;
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

    audio?: {
      engine: "tonejs" | string;
      synth: "FMSynth" | "AMSynth" | "Synth" | string;
      tempo: number;
      melody: Note[];
    };

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
