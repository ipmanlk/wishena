import { instrumentPresets } from "../audio";
import { tropicalSunsetHarmony, tropicalSunsetMelody } from "../audio/melodies";
import type { Template } from "../types";

export const tropicalSunsetTemplate: Template = {
  id: "tropical-sunset",
  name: "Tropical Sunset",
  description: "Warm island vibes with golden sunset hues",
  categories: ["celebration", "vacation"],
  preview: {
    background:
      "linear-gradient(135deg, #EA580C 0%, #F59E0B 50%, #FCD34D 100%)",
    lines: [
      {
        text: "Island Paradise Awaits",
        className: "text-xl font-light",
        style: { color: "#FFFBEB", fontFamily: "Georgia, serif" },
      },
      {
        text: "tropical vibes",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#FEF3C7" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Sarah",
    mainMessage: "Island Paradise Awaits",
    personalMessage:
      "Time to relax, unwind, and let the worries drift away like the tide.",
    senderName: "Mike",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-orange-700 via-amber-600 to-yellow-500 font-serif text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 30,
      desktopDensity: 70,
    },

    audio: {
      engine: "tonejs",
      key: "D",
      mode: "major",
      tempo: 78,
      instrument: instrumentPresets.warmPluck,
      melody: tropicalSunsetMelody,
      harmony: tropicalSunsetHarmony,
      loop: true,
      fadeIn: 2,
      volume: -12,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-amber-100/70 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "🏝️  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light text-center leading-tight py-2 text-amber-50",
        bindTo: "mainMessage",
        animation: "scale_in",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-amber-100/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-amber-100/70",
        bindTo: "senderName",
        prefix: "Aloha,  ",
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
        label: "Your message",
        placeholder: "Island Paradise Awaits",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder: "Time to relax, unwind, and let the worries drift away...",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Mike",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
