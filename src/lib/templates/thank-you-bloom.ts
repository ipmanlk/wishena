import { instrumentPresets } from "../audio";
import { thankYouBloomHarmony, thankYouBloomMelody } from "../audio/melodies";
import type { Template } from "../types";

export const thankYouBloomTemplate: Template = {
  id: "thank-you-bloom",
  name: "Blooming Thanks",
  description: "Warm gratitude with floral elegance",
  categories: ["celebration"],
  preview: {
    background:
      "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FBBF24 100%)",
    lines: [
      {
        text: "Thank You So Much",
        className: "text-xl font-light",
        style: { color: "#78350F", fontFamily: "Georgia, serif" },
      },
      {
        text: "with gratitude",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#92400E" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Maria",
    mainMessage: "Thank You So Much",
    personalMessage:
      "Your kindness and support mean the world to me. I am so grateful.",
    senderName: "David",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-amber-100 via-amber-200 to-orange-200 font-serif text-white overflow-hidden justify-center",

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
      tempo: 70,
      instrument: instrumentPresets.warmPluck,
      melody: thankYouBloomMelody,
      harmony: thankYouBloomHarmony,
      loop: true,
      fadeIn: 2,
      volume: -12,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-orange-900/70 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "🌼  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light text-center leading-tight py-2 text-orange-900",
        bindTo: "mainMessage",
        animation: "scale_in",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-orange-800/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-orange-900/70",
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
        placeholder: "Maria",
        maxLength: 30,
        required: true,
      },
      {
        key: "mainMessage",
        type: "text",
        label: "Your message",
        placeholder: "Thank You So Much",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "Your kindness and support mean the world to me. I am so grateful...",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "David",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
