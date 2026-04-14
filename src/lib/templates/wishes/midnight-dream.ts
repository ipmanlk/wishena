import { instrumentPresets } from "@templates/audio";
import {
  midnightDreamHarmony,
  midnightDreamMelody,
} from "@templates/audio/melodies";
import type { Template } from "@/lib/types";

export const midnightDreamTemplate: Template = {
  id: "midnight-dream",
  name: "Midnight Dreams",
  description: "Peaceful, ethereal nighttime vibes for restful wishes",
  categories: ["celebration", "wellness"],
  preview: {
    background:
      "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)",
    lines: [
      {
        text: "Drift Into Bliss",
        className: "text-xl font-light",
        style: { color: "#E0E7FF", fontFamily: "Georgia, serif" },
      },
      {
        text: "peaceful dreams",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#A5B4FC" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Sam",
    mainMessage: "Drift Into Bliss",
    personalMessage:
      "May your dreams be filled with starlight and your sleep as peaceful as a still lake.",
    senderName: "Jamie",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-slate-950 via-indigo-950 to-violet-900 font-serif text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 35,
      desktopDensity: 80,
    },

    audio: {
      engine: "tonejs",
      key: "A",
      mode: "minor",
      tempo: 58,
      instrument: instrumentPresets.softPad,
      melody: midnightDreamMelody,
      harmony: midnightDreamHarmony,
      loop: true,
      fadeIn: 3,
      volume: -14,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-indigo-200/70 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "✨  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light text-center leading-tight py-2 text-indigo-100",
        bindTo: "mainMessage",
        animation: "scale_in",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-indigo-200/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-indigo-200/70",
        bindTo: "senderName",
        prefix: "Sweet dreams,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "Sam",
        maxLength: 30,
        required: true,
      },
      {
        key: "mainMessage",
        type: "text",
        label: "Your message",
        placeholder: "Drift Into Bliss",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "May your dreams be filled with starlight and your sleep as peaceful as a still lake...",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Jamie",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
