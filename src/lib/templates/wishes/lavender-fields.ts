import { instrumentPresets } from "@templates/audio";
import {
  lavenderFieldsHarmony,
  lavenderFieldsMelody,
} from "@templates/audio/melodies";
import type { Template } from "@/lib/types";

export const lavenderFieldsTemplate: Template = {
  id: "lavender-fields",
  name: "Lavender Fields",
  isPremium: true,
  description:
    "Serene and mindful — for wellness, rest, and gentle encouragement",
  categories: ["wellness", "mindful"],
  preview: {
    background: "linear-gradient(135deg, #E6E0F8 0%, #C4B5E0 100%)",
    lines: [
      {
        text: "Breathe",
        className: "text-xl font-light",
        style: { color: "#6B5B95" },
      },
      {
        text: "lavender fields",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#9B8CBF" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Riley",
    wellnessLine: "Breathe",
    personalMessage:
      "Take a moment for yourself. You deserve peace, rest, and all the good things coming your way.",
    senderName: "Taylor",
  },

  blueprint: {
    globalStyle:
      "bg-[#E6E0F8] font-sans text-[#4A3F5C] overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 20,
      desktopDensity: 50,
    },

    audio: {
      engine: "tonejs",
      key: "F",
      mode: "major",
      tempo: 64,
      instrument: instrumentPresets.glassMarimba,
      melody: lavenderFieldsMelody,
      harmony: lavenderFieldsHarmony,
      loop: true,
      fadeIn: 2.5,
      volume: -14,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-[#9B8CBF] text-center pt-12 pb-1 opacity-80",
        bindTo: "recipientName",
        prefix: "🌿  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light text-[#6B5B95] text-center mt-2 leading-snug",
        bindTo: "wellnessLine",
        animation: "scale_in",
      },
      {
        id: "rule",
        type: "standard_text",
        style: "text-[#9B8CBF]/40 text-center text-sm tracking-[1em] mt-5 mb-1",
        prefix: "— ✦ —",
        animation: "fade_up",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-[#5C4F70]/80 text-center leading-relaxed max-w-xs mx-auto mt-4 whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm text-[#9B8CBF] text-center mt-8 pb-10 tracking-widest uppercase",
        bindTo: "senderName",
        prefix: "With care,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "Riley",
        maxLength: 30,
        required: true,
      },
      {
        key: "wellnessLine",
        type: "text",
        label: "The intention",
        placeholder: "Breathe",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your message",
        placeholder:
          "Take a moment for yourself. You deserve peace, rest, and all the good things coming your way.",
        maxLength: 300,
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
