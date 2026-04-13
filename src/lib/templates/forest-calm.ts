import type { Template } from "../types";
import { instrumentPresets } from "../audio";
import { forestCalmMelody, forestCalmHarmony } from "../audio/melodies";

export const forestCalmTemplate: Template = {
  id: "forest-calm",
  name: "Forest Peace",
  description: "Earthy, grounding vibes inspired by nature's quiet moments",
  categories: ["celebration", "nature"],
  preview: {
    background: "linear-gradient(135deg, #064E3B 0%, #065F46 100%)",
    lines: [
      {
        text: "Find Your Peace",
        className: "text-xl font-light",
        style: { color: "#D1FAE5", fontFamily: "Georgia, serif" },
      },
      {
        text: "forest calm",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#6EE7B7" },
      },
    ],
  },
  defaultValues: {
    recipientName: "David",
    mainMessage: "Find Your Peace",
    personalMessage:
      "Like the forest, you bring calm and strength to those around you.",
    senderName: "Rachel",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-green-950 via-emerald-900 to-green-950 font-serif text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 20,
      desktopDensity: 50,
    },

    audio: {
      engine: "tonejs",
      key: "G",
      mode: "major",
      tempo: 60,
      instrument: instrumentPresets.gentleBells,
      melody: forestCalmMelody,
      harmony: forestCalmHarmony,
      loop: true,
      fadeIn: 2,
      volume: -13,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-emerald-200/70 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "🌿  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light text-center leading-tight py-2 text-emerald-50",
        bindTo: "mainMessage",
        animation: "scale_in",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-emerald-100/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-emerald-200/70",
        bindTo: "senderName",
        prefix: "With peace,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "David",
        maxLength: 30,
        required: true,
      },
      {
        key: "mainMessage",
        type: "text",
        label: "Your message",
        placeholder: "Find Your Peace",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "Like the forest, you bring calm and strength to those around you...",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Rachel",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
