import { instrumentPresets } from "../audio";
import { morningCoffeeHarmony, morningCoffeeMelody } from "../audio/melodies";
import type { Template } from "../types";

export const morningCoffeeTemplate: Template = {
  id: "morning-coffee",
  name: "Morning Coffee",
  description: "Cozy and warm — for casual appreciation and friendly moments",
  categories: ["celebration", "friendship"],
  preview: {
    background: "linear-gradient(135deg, #F5E6D3 0%, #E8C9A0 100%)",
    lines: [
      {
        text: "Hey There",
        className: "text-xl font-semibold",
        style: { color: "#8B5A2B" },
      },
      {
        text: "morning coffee",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#A67B5B" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Jordan",
    greetingLine: "Hey There",
    personalMessage:
      "Just wanted you to know you're appreciated. Here's to good days ahead!",
    senderName: "Casey",
  },

  blueprint: {
    globalStyle:
      "bg-[#F5E6D3] font-sans text-[#4A3728] overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "confetti",
      mobileDensity: 10,
      desktopDensity: 24,
    },

    audio: {
      engine: "tonejs",
      key: "C",
      mode: "major",
      tempo: 82,
      instrument: instrumentPresets.warmPluck,
      melody: morningCoffeeMelody,
      harmony: morningCoffeeHarmony,
      loop: true,
      fadeIn: 1.5,
      volume: -12,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-[#A67B5B] text-center pt-12 pb-1 opacity-80",
        bindTo: "recipientName",
        prefix: "☕  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-bold text-[#8B5A2B] text-center mt-2 leading-snug",
        bindTo: "greetingLine",
        animation: "scale_in",
      },
      {
        id: "rule",
        type: "standard_text",
        style: "text-[#A67B5B]/40 text-center text-sm tracking-[1em] mt-5 mb-1",
        prefix: "— ✦ —",
        animation: "fade_up",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-[#5C4A3D]/80 text-center leading-relaxed max-w-xs mx-auto mt-4 whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm text-[#A67B5B] text-center mt-8 pb-10 tracking-widest uppercase",
        bindTo: "senderName",
        prefix: "Cheers,  ",
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
        key: "greetingLine",
        type: "text",
        label: "The greeting",
        placeholder: "Hey There",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your message",
        placeholder:
          "Just wanted you to know you're appreciated. Here's to good days ahead!",
        maxLength: 300,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Casey",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
