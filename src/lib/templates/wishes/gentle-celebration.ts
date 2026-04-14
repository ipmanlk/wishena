import { instrumentPresets } from "@templates/audio";
import { goldenHourHarmony, goldenHourMelody } from "@templates/audio/melodies";
import type { Template } from "@/lib/types";

export const gentleCelebrationTemplate: Template = {
  id: "gentle-celebration",
  name: "Golden Hour",
  isPremium: true,
  description: "Warm, timeless and elegant — for moments that matter",
  categories: ["celebration"],
  preview: {
    background: "linear-gradient(135deg, #FEFAF4 0%, #F5E8C8 100%)",
    lines: [
      {
        text: "Sophia",
        className: "text-xl font-semibold italic",
        style: { color: "#C9983A", fontFamily: "Georgia, serif" },
      },
      {
        text: "golden hour",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#9C5A5A" },
      },
    ],
  },
  defaultValues: {
    occasionLine: "On your birthday",
    recipientName: "Sophia",
    personalMessage:
      "Some people leave a mark on this world just by being themselves. You are one of them.",
    senderName: "Mia",
  },

  blueprint: {
    globalStyle:
      "bg-[#FEFAF4] font-serif text-[#3A2E1F] overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "confetti",
      mobileDensity: 8,
      desktopDensity: 20,
    },

    audio: {
      engine: "tonejs",
      key: "G",
      mode: "major",
      tempo: 74,
      instrument: instrumentPresets.gentleBells,
      melody: goldenHourMelody,
      harmony: goldenHourHarmony,
      loop: true,
      fadeIn: 2,
      volume: -12,
    },

    modules: [
      {
        id: "occasion",
        type: "standard_text",
        style:
          "text-xs tracking-[0.5em] uppercase text-[#9C5A5A] text-center pt-12 pb-1 opacity-80",
        bindTo: "occasionLine",
        animation: "fade_up",
      },
      {
        id: "recipient",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl italic font-semibold text-[#C9983A] text-center mt-2 leading-snug",
        bindTo: "recipientName",
        animation: "scale_in",
      },
      {
        id: "rule",
        type: "standard_text",
        style:
          "text-[#C9983A]/40 text-center text-sm tracking-[1em] mt-5 mb-1 not-italic",
        prefix: "— ✦ —",
        animation: "fade_up",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-[#5C4A35]/80 text-center italic leading-relaxed max-w-xs mx-auto mt-4 whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm text-[#9C5A5A] text-center mt-8 pb-10 tracking-widest uppercase not-italic",
        bindTo: "senderName",
        prefix: "With love,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "occasionLine",
        type: "text",
        label: "The occasion",
        placeholder: "On your birthday",
        maxLength: 40,
        required: true,
      },
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "Sophia",
        maxLength: 30,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your message",
        placeholder:
          "Some people leave a mark on this world just by being themselves. You are one of them.",
        maxLength: 300,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Mia",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
