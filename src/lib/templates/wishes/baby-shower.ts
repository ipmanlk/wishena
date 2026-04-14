import { instrumentPresets } from "@templates/audio";
import { babyShowerHarmony, babyShowerMelody } from "@templates/audio/melodies";
import type { Template } from "@/lib/types";

export const babyShowerTemplate: Template = {
  id: "baby-shower",
  name: "Little Miracle",
  description: "Soft and joyful celebration for expecting parents",
  categories: ["celebration"],
  preview: {
    background:
      "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 50%, #F9A8D4 100%)",
    lines: [
      {
        text: "A Little Miracle Is Coming",
        className: "text-xl font-light",
        style: { color: "#831843", fontFamily: "Georgia, serif" },
      },
      {
        text: "baby shower",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#BE185D" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Jessica & Mark",
    mainMessage: "A Little Miracle Is Coming",
    personalMessage:
      "The world is about to become a little brighter with your little one on the way.",
    senderName: "Emily",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-pink-200 via-pink-300 to-rose-300 font-serif text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "confetti",
      mobileDensity: 40,
      desktopDensity: 90,
    },

    audio: {
      engine: "tonejs",
      key: "G",
      mode: "major",
      tempo: 86,
      instrument: instrumentPresets.glassMarimba,
      melody: babyShowerMelody,
      harmony: babyShowerHarmony,
      loop: true,
      fadeIn: 1.5,
      volume: -12,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-pink-900/70 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "👶  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light text-center leading-tight py-2 text-pink-900",
        bindTo: "mainMessage",
        animation: "scale_in",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-pink-800/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-pink-900/70",
        bindTo: "senderName",
        prefix: "With love and excitement,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "Jessica & Mark",
        maxLength: 40,
        required: true,
      },
      {
        key: "mainMessage",
        type: "text",
        label: "Your message",
        placeholder: "A Little Miracle Is Coming",
        maxLength: 50,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "The world is about to become a little brighter with your little one on the way...",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Emily",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
