import { instrumentPresets } from "../audio";
import {
  goldenAnniversaryHarmony,
  goldenAnniversaryMelody,
} from "../audio/melodies";
import type { Template } from "../types";

export const goldenAnniversaryTemplate: Template = {
  id: "golden-anniversary",
  name: "Golden Anniversary",
  isPremium: true,
  description: "Elegant celebration for years of love and commitment",
  categories: ["love", "celebration"],
  preview: {
    background:
      "linear-gradient(135deg, #1C1917 0%, #292524 50%, #44403C 100%)",
    lines: [
      {
        text: "Forever and Always",
        className: "text-xl font-light",
        style: { color: "#FCD34D", fontFamily: "Georgia, serif" },
      },
      {
        text: "anniversary",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#FDE68A" },
      },
    ],
  },
  defaultValues: {
    recipientName: "My Love",
    mainMessage: "Forever and Always",
    personalMessage:
      "Every year together is a chapter in our story of love. Here's to many more pages.",
    senderName: "Chris",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-stone-950 via-stone-900 to-stone-800 font-serif text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 35,
      desktopDensity: 80,
    },

    audio: {
      engine: "tonejs",
      key: "C",
      mode: "major",
      tempo: 66,
      instrument: instrumentPresets.gentleBells,
      melody: goldenAnniversaryMelody,
      harmony: goldenAnniversaryHarmony,
      loop: true,
      fadeIn: 2.5,
      volume: -13,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-amber-200/70 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "💛  For  ",
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
          "text-base md:text-lg text-stone-200/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-amber-200/70",
        bindTo: "senderName",
        prefix: "All my love,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "My Love",
        maxLength: 30,
        required: true,
      },
      {
        key: "mainMessage",
        type: "text",
        label: "Your message",
        placeholder: "Forever and Always",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "Every year together is a chapter in our story of love. Here's to many more pages...",
        maxLength: 280,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Chris",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
