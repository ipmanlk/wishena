import type { Template } from "../types";
import { instrumentPresets } from "../audio";
import { cherryBlossomMelody, cherryBlossomHarmony } from "../audio/melodies";

export const cherryBlossomTemplate: Template = {
  id: "cherry-blossom",
  name: "Cherry Blossom",
  description: "Delicate and beautiful — perfect for spring celebrations and gentle moments",
  category: "celebration",

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-pink-100 via-rose-50 to-white font-serif text-rose-900 overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "confetti",
      mobileDensity: 10,
      desktopDensity: 25,
    },

    audio: {
      engine: "tonejs",
      key: "D",
      mode: "major",
      tempo: 76,
      instrument: instrumentPresets.softPad,
      melody: cherryBlossomMelody,
      harmony: cherryBlossomHarmony,
      loop: true,
      fadeIn: 2,
      volume: -12,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-rose-400/80 text-center pt-12 pb-1",
        bindTo: "recipient_name",
        prefix: "🌸  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light italic text-center leading-tight py-2 text-rose-800",
        bindTo: "main_message",
        animation: "scale_in",
      },
      {
        id: "sub-message",
        type: "standard_text",
        style:
          "text-sm md:text-base text-rose-600/70 text-center italic mt-2",
        bindTo: "season_wish",
        animation: "fade_up",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-rose-900/70 text-center mt-4 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personal_message",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-rose-400/80",
        bindTo: "sender_name",
        prefix: "With love,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipient_name",
        type: "text",
        label: "Who is this for?",
        placeholder: "Lily",
        maxLength: 30,
        required: true,
      },
      {
        key: "main_message",
        type: "text",
        label: "Main greeting",
        placeholder: "Blooming Wishes",
        maxLength: 40,
        required: true,
      },
      {
        key: "personal_message",
        type: "textarea",
        label: "Your personal message",
        placeholder: "Like cherry blossoms, your presence makes everything more beautiful...",
        maxLength: 250,
        required: true,
      },
      {
        key: "sender_name",
        type: "text",
        label: "Your name",
        placeholder: "Tom",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
