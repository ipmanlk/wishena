import type { Template } from "../types";
import { instrumentPresets } from "../audio";
import { oceanBreezeMelody, oceanBreezeHarmony } from "../audio/melodies";

export const oceanBreezeTemplate: Template = {
  id: "ocean-breeze",
  name: "Ocean Calm",
  description: "Fresh sea breeze vibes — peaceful and refreshing for any occasion",
  category: "celebration",

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-teal-900 via-cyan-900 to-teal-950 font-sans text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 25,
      desktopDensity: 60,
    },

    audio: {
      engine: "tonejs",
      key: "C",
      mode: "major",
      tempo: 72,
      instrument: instrumentPresets.simplePluck,
      melody: oceanBreezeMelody,
      harmony: oceanBreezeHarmony,
      loop: true,
      fadeIn: 1.5,
      volume: -14,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-cyan-200/70 text-center pt-12 pb-1",
        bindTo: "recipient_name",
        prefix: "🌊  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "neon_text",
        style:
          "text-4xl md:text-6xl font-bold text-center leading-tight py-2",
        bindTo: "main_message",
        animation: "scale_in",
        props: { color: "#5EEAD4" },
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-cyan-50/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personal_message",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-cyan-200/70",
        bindTo: "sender_name",
        prefix: "With care,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipient_name",
        type: "text",
        label: "Who is this for?",
        placeholder: "Sarah",
        maxLength: 30,
        required: true,
      },
      {
        key: "main_message",
        type: "text",
        label: "The main message",
        placeholder: "Thinking of You",
        maxLength: 40,
        required: true,
      },
      {
        key: "personal_message",
        type: "textarea",
        label: "Your personal message",
        placeholder: "Like the ocean, my appreciation for you is vast and deep...",
        maxLength: 250,
        required: true,
      },
      {
        key: "sender_name",
        type: "text",
        label: "Your name",
        placeholder: "Michael",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
