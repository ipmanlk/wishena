import { instrumentPresets } from "@templates/audio";
import {
  mountainSummitHarmony,
  mountainSummitMelody,
} from "@templates/audio/melodies";
import type { Template } from "@/lib/types";

export const mountainSummitTemplate: Template = {
  id: "mountain-summit",
  name: "Mountain Summit",
  isPremium: true,
  description: "Triumphant achievement vibes with majestic peak scenery",
  categories: ["celebration", "achievement"],
  preview: {
    background:
      "linear-gradient(135deg, #1E3A5F 0%, #2D5A87 50%, #4A90A4 100%)",
    lines: [
      {
        text: "You Made It To The Top",
        className: "text-xl font-light",
        style: { color: "#E2E8F0", fontFamily: "Georgia, serif" },
      },
      {
        text: "summit achievement",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#94A3B8" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Jordan",
    mainMessage: "You Made It To The Top",
    personalMessage:
      "Every step brought you here. This moment is yours to savor.",
    senderName: "Taylor",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-slate-900 via-blue-900 to-sky-800 font-serif text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 25,
      desktopDensity: 60,
    },

    audio: {
      engine: "tonejs",
      key: "Bb",
      mode: "major",
      tempo: 80,
      instrument: instrumentPresets.gentleBells,
      melody: mountainSummitMelody,
      harmony: mountainSummitHarmony,
      loop: true,
      fadeIn: 2,
      volume: -12,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-slate-300/70 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "⛰️  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light text-center leading-tight py-2 text-slate-100",
        bindTo: "mainMessage",
        animation: "scale_in",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-slate-200/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-slate-300/70",
        bindTo: "senderName",
        prefix: "With admiration,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "Jordan",
        maxLength: 30,
        required: true,
      },
      {
        key: "mainMessage",
        type: "text",
        label: "Your message",
        placeholder: "You Made It To The Top",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "Every step brought you here. This moment is yours to savor...",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Taylor",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
