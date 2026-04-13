import { instrumentPresets } from "../audio";
import { cherryBlossomHarmony, cherryBlossomMelody } from "../audio/melodies";
import type { Template } from "../types";

export const cherryBlossomTemplate: Template = {
  id: "cherry-blossom",
  name: "Cherry Blossom",
  description:
    "Delicate and beautiful — perfect for spring celebrations and gentle moments",
  categories: ["celebration", "spring"],
  preview: {
    background: "linear-gradient(135deg, #FCE7F3 0%, #FFF1F2 100%)",
    lines: [
      {
        text: "Blooming Wishes",
        className: "text-xl font-light italic",
        style: { color: "#BE185D", fontFamily: "Georgia, serif" },
      },
      {
        text: "cherry blossom",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#FB7185" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Lily",
    mainMessage: "Blooming Wishes",
    personalMessage:
      "Like cherry blossoms, your presence makes everything more beautiful.",
    senderName: "Tom",
  },

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
        bindTo: "recipientName",
        prefix: "🌸  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light italic text-center leading-tight py-2 text-rose-800",
        bindTo: "mainMessage",
        animation: "scale_in",
      },
      {
        id: "sub-message",
        type: "standard_text",
        style: "text-sm md:text-base text-rose-600/70 text-center italic mt-2",
        bindTo: "seasonWish",
        animation: "fade_up",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-rose-900/70 text-center mt-4 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-rose-400/80",
        bindTo: "senderName",
        prefix: "With love,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "Lily",
        maxLength: 30,
        required: true,
      },
      {
        key: "mainMessage",
        type: "text",
        label: "Main greeting",
        placeholder: "Blooming Wishes",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "Like cherry blossoms, your presence makes everything more beautiful...",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Tom",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
