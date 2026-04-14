import { instrumentPresets } from "@templates/audio";
import {
  graduationDayHarmony,
  graduationDayMelody,
} from "@templates/audio/melodies";
import type { Template } from "@/lib/types";

export const graduationDayTemplate: Template = {
  id: "graduation-day",
  name: "Graduation Day",
  description: "Proud achievement celebration with classic navy and gold",
  categories: ["celebration", "achievement"],
  preview: {
    background:
      "linear-gradient(135deg, #1E3A5F 0%, #1E40AF 50%, #3B82F6 100%)",
    lines: [
      {
        text: "The Future Is Yours",
        className: "text-xl font-light",
        style: { color: "#FDE68A", fontFamily: "Georgia, serif" },
      },
      {
        text: "congratulations",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#FCD34D" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Casey",
    mainMessage: "The Future Is Yours",
    personalMessage:
      "Your dedication and hard work have brought you here. Go forth and achieve greatness.",
    senderName: "Principal Rivera",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 font-serif text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "confetti",
      mobileDensity: 45,
      desktopDensity: 100,
    },

    audio: {
      engine: "tonejs",
      key: "F",
      mode: "major",
      tempo: 92,
      instrument: instrumentPresets.mellowEP,
      melody: graduationDayMelody,
      harmony: graduationDayHarmony,
      loop: true,
      fadeIn: 1.5,
      volume: -11,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-amber-200/70 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "🎓  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light text-center leading-tight py-2 text-amber-100",
        bindTo: "mainMessage",
        animation: "scale_in",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-blue-100/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-amber-200/70",
        bindTo: "senderName",
        prefix: "With pride,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "Casey",
        maxLength: 30,
        required: true,
      },
      {
        key: "mainMessage",
        type: "text",
        label: "Your message",
        placeholder: "The Future Is Yours",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "Your dedication and hard work have brought you here. Go forth and achieve greatness...",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Principal Rivera",
        maxLength: 30,
        required: true,
      },
    ],
  },
};
