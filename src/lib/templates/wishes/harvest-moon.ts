import { instrumentPresets } from "@templates/audio";
import {
  harvestMoonHarmony,
  harvestMoonMelody,
} from "@templates/audio/melodies";
import type { Template } from "@/lib/types";

export const harvestMoonTemplate: Template = {
  id: "harvest-moon",
  name: "Harvest Moon",
  description: "Warm and grateful — for autumn gatherings and heartfelt thanks",
  categories: ["celebration", "gratitude", "autumn"],
  preview: {
    background: "linear-gradient(135deg, #4A2C2A 0%, #8B5A2B 100%)",
    lines: [
      {
        text: "Thankful for You",
        className: "text-xl font-semibold",
        style: { color: "#F5DEB3" },
      },
      {
        text: "harvest moon",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#D2B48C" },
      },
    ],
  },
  defaultValues: {
    recipientName: "The Family",
    gratitudeLine: "Thankful for You",
    personalMessage:
      "Like the harvest moon, your kindness lights up every room. Grateful to have you in my life.",
    senderName: "Sam",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-amber-900 via-orange-900 to-amber-950 font-serif text-[#F5DEB3] overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 18,
      desktopDensity: 45,
    },

    audio: {
      engine: "tonejs",
      key: "G",
      mode: "major",
      tempo: 70,
      instrument: instrumentPresets.gentleBells,
      melody: harvestMoonMelody,
      harmony: harvestMoonHarmony,
      loop: true,
      fadeIn: 2,
      volume: -11,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-[#D2B48C]/80 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "🍂  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl italic font-semibold text-[#F5DEB3] text-center mt-2 leading-snug",
        bindTo: "gratitudeLine",
        animation: "scale_in",
      },
      {
        id: "rule",
        type: "standard_text",
        style:
          "text-[#D2B48C]/40 text-center text-sm tracking-[1em] mt-5 mb-1 not-italic",
        prefix: "— ✦ —",
        animation: "fade_up",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-[#E8DCC8]/80 text-center italic leading-relaxed max-w-xs mx-auto mt-4 whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm text-[#D2B48C] text-center mt-8 pb-10 tracking-widest uppercase not-italic",
        bindTo: "senderName",
        prefix: "With gratitude,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "The Family",
        maxLength: 30,
        required: true,
      },
      {
        key: "gratitudeLine",
        type: "text",
        label: "The gratitude line",
        placeholder: "Thankful for You",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your message",
        placeholder:
          "Like the harvest moon, your kindness lights up every room. Grateful to have you in my life.",
        maxLength: 300,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Sam",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
