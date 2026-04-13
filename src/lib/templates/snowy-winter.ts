import type { Template } from "../types";
import { instrumentPresets } from "../audio";
import { winterWonderlandMelody, winterWonderlandHarmony } from "../audio/melodies";

export const snowyWinterTemplate: Template = {
  id: "snowy-winter",
  name: "Winter Warmth",
  description: "Cozy winter wishes with gentle falling snow — perfect for holiday greetings",
  categories: ["celebration", "holiday", "winter"],
  preview: {
    background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
    lines: [
      {
        text: "Warm Winter Wishes",
        className: "text-xl font-light",
        style: { color: "#E0F2FE", fontFamily: "Georgia, serif" },
      },
      {
        text: "winter warmth",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#7DD3FC" },
      },
    ],
  },
  defaultValues: {
    recipient_name: "Sarah",
    main_message: "Warm Winter Wishes",
    season_wish: "May your holidays be filled with warmth and joy",
    personal_message: "Wishing you a cozy winter season filled with love and laughter.",
    sender_name: "Emma",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 font-serif text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "snow",
      mobileDensity: 30,
      desktopDensity: 80,
    },

    audio: {
      engine: "tonejs",
      key: "D",
      mode: "minor",
      tempo: 68,
      instrument: instrumentPresets.gentleBells,
      melody: winterWonderlandMelody,
      harmony: winterWonderlandHarmony,
      loop: true,
      fadeIn: 2,
      volume: -12,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-blue-200/70 text-center pt-12 pb-1",
        bindTo: "recipient_name",
        prefix: "❄  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light text-center leading-tight py-2 text-white",
        bindTo: "main_message",
        animation: "scale_in",
      },
      {
        id: "sub-message",
        type: "standard_text",
        style:
          "text-sm md:text-base text-blue-100/60 text-center italic mt-2",
        bindTo: "season_wish",
        animation: "fade_up",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-blue-100/80 text-center mt-4 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personal_message",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-blue-300/70",
        bindTo: "sender_name",
        prefix: "Warmly,  ",
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
        label: "Main greeting",
        placeholder: "Warm Winter Wishes",
        maxLength: 40,
        required: true,
      },
      {
        key: "season_wish",
        type: "text",
        label: "Season wish",
        placeholder: "May your holidays be filled with warmth and joy",
        maxLength: 60,
        required: false,
      },
      {
        key: "personal_message",
        type: "textarea",
        label: "Your personal message",
        placeholder: "Wishing you a cozy winter season filled with love and laughter...",
        maxLength: 250,
        required: true,
      },
      {
        key: "sender_name",
        type: "text",
        label: "Your name",
        placeholder: "Emma",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
