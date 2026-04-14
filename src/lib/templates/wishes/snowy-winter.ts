import { instrumentPresets } from "@templates/audio";
import {
  winterWonderlandHarmony,
  winterWonderlandMelody,
} from "@templates/audio/melodies";
import type { Template } from "@/lib/types";

export const snowyWinterTemplate: Template = {
  id: "snowy-winter",
  name: "Winter Warmth",
  description:
    "Cozy winter wishes with gentle falling snow — perfect for holiday greetings",
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
    recipientName: "Sarah",
    mainMessage: "Warm Winter Wishes",
    seasonWish: "May your holidays be filled with warmth and joy",
    personalMessage:
      "Wishing you a cozy winter season filled with love and laughter.",
    senderName: "Emma",
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
        bindTo: "recipientName",
        prefix: "❄  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light text-center leading-tight py-2 text-white",
        bindTo: "mainMessage",
        animation: "scale_in",
      },
      {
        id: "sub-message",
        type: "standard_text",
        style: "text-sm md:text-base text-blue-100/60 text-center italic mt-2",
        bindTo: "seasonWish",
        animation: "fade_up",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-blue-100/80 text-center mt-4 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-blue-300/70",
        bindTo: "senderName",
        prefix: "Warmly,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "Sarah",
        maxLength: 30,
        required: true,
      },
      {
        key: "mainMessage",
        type: "text",
        label: "Main greeting",
        placeholder: "Warm Winter Wishes",
        maxLength: 40,
        required: true,
      },
      {
        key: "seasonWish",
        type: "text",
        label: "Season wish",
        placeholder: "May your holidays be filled with warmth and joy",
        maxLength: 60,
        required: false,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "Wishing you a cozy winter season filled with love and laughter...",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Emma",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
