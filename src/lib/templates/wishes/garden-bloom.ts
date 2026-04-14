import { instrumentPresets } from "@templates/audio";
import {
  gardenBloomHarmony,
  gardenBloomMelody,
} from "@templates/audio/melodies";
import type { Template } from "@/lib/types";

export const gardenBloomTemplate: Template = {
  id: "garden-bloom",
  name: "Garden Bloom",
  description: "Fresh spring vibes with blooming florals",
  categories: ["celebration", "nature"],
  preview: {
    background:
      "linear-gradient(135deg, #059669 0%, #10B981 50%, #A7F3D0 100%)",
    lines: [
      {
        text: "New Growth Blooms",
        className: "text-xl font-light",
        style: { color: "#ECFDF5", fontFamily: "Georgia, serif" },
      },
      {
        text: "spring renewal",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#D1FAE5" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Emma",
    mainMessage: "New Growth Blooms",
    personalMessage:
      "Like spring flowers, your presence brings color and life to everyone around you.",
    senderName: "Alex",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-emerald-800 via-emerald-600 to-teal-400 font-serif text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 30,
      desktopDensity: 70,
    },

    audio: {
      engine: "tonejs",
      key: "G",
      mode: "major",
      tempo: 84,
      instrument: instrumentPresets.glassMarimba,
      melody: gardenBloomMelody,
      harmony: gardenBloomHarmony,
      loop: true,
      fadeIn: 1.5,
      volume: -12,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-emerald-100/70 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "🌸  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl font-light text-center leading-tight py-2 text-emerald-50",
        bindTo: "mainMessage",
        animation: "scale_in",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-emerald-100/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-emerald-100/70",
        bindTo: "senderName",
        prefix: "With love,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "Emma",
        maxLength: 30,
        required: true,
      },
      {
        key: "mainMessage",
        type: "text",
        label: "Your message",
        placeholder: "New Growth Blooms",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "Like spring flowers, your presence brings color and life to everyone around you...",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Alex",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
