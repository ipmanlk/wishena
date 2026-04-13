import type {
  ChorusOptions,
  FeedbackDelayOptions,
  FilterOptions,
  ReverbOptions,
  Unit,
} from "tone";

export type WishVisualsPreset = "glow-dust" | "confetti" | "snow";

export type InviteVisualsPreset =
  | "petals"
  | "gold-dust"
  | "linen"
  | "balloons"
  | "spotlight";

export type VisualsPreset = WishVisualsPreset | InviteVisualsPreset;

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

export const synthTypes = {
  FMSynth: "FMSynth" as const satisfies SynthType,
  AMSynth: "AMSynth" as const satisfies SynthType,
  Synth: "Synth" as const satisfies SynthType,
  DuoSynth: "DuoSynth" as const satisfies SynthType,
};

export const effectTypes = {
  reverb: "reverb" as const satisfies EffectType,
  delay: "delay" as const satisfies EffectType,
  chorus: "chorus" as const satisfies EffectType,
  filter: "filter" as const satisfies EffectType,
};

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

export interface TemplateListItem {
  id: string;
  name: string;
  description?: string;
  /** Mark template as premium/VIP for future gating. UI may show a badge. Still usable for now. */
  isPremium?: boolean;
  categories: string[];
  preview: TemplatePreview;
}

export interface Template extends TemplateListItem {
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
  userId?: string;
}

export interface GuestSession {
  id: string;
  wishCount: number;
}

export type AccountTier = "guest" | "unverified" | "verified";

// --- Invite System ---

export type InviteModuleType =
  | "invite_header"
  | "honoree_names"
  | "event_details"
  | "guest_address"
  | "rsvp_prompt"
  | "decorative_divider"
  | "custom_note";

export interface InviteModule {
  id: string;
  type: InviteModuleType;
  style?: string;
  bindSource?: "project" | "guest";
  bindTo?: string;
  prefix?: string;
  animation?: "fade_up" | "scale_in" | "typewriter";
  props?: Record<string, unknown>;
}

export interface InviteInputField {
  key: string;
  type: "text" | "textarea" | "date" | "time";
  label: string;
  description?: string;
  placeholder?: string;
  maxLength?: number;
  required: boolean;
  scope: "project" | "guest";
}

export interface InviteTemplate {
  id: string;
  name: string;
  description?: string;
  inviteKind: string;
  preview: TemplatePreview;

  blueprint: {
    globalStyle?: string;

    visuals?: {
      engine: "tsparticles";
      preset: InviteVisualsPreset;
      mobileDensity: number;
      desktopDensity: number;
    };

    audio?: AudioConfig;

    modules: InviteModule[];
    projectInputs: InviteInputField[];
  };
}

export interface InviteProject {
  id: string;
  userId: string;
  templateId: string;
  inviteKind: string;
  title: string;
  payload: Record<string, string>;
  rsvpEnabled: boolean;
  guestLimit?: number;
  guestFieldDefinitions: GuestFieldDefinition[];
  createdAt: string;
  updatedAt: string;
}

export interface GuestFieldDefinition {
  key: string;
  label: string;
  type: "text" | "textarea";
  required: boolean;
  isPublic: boolean;
  placeholder?: string;
}

export interface GuestCustomField {
  value: string;
  isPublic: boolean;
}

export interface InviteGuest {
  id: string;
  projectId: string;
  displayName: string;
  personalNote?: string;
  internalNote?: string;
  email?: string;
  contactNumber?: string;
  customFields: Record<string, GuestCustomField>;
  createdAt: string;
}

export interface PublicGuest {
  id: string;
  projectId: string;
  displayName: string;
  personalNote?: string;
  customFields: Record<string, string>;
}

export type RsvpResponse = "yes" | "no";

export interface InviteRsvp {
  id: string;
  guestId: string;
  projectId: string;
  response: RsvpResponse;
  respondedAt: string;
}
