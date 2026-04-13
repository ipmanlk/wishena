import type { Template } from "../types";
import { instrumentPresets } from "../audio";
import { midnightGlowMelody, midnightGlowHarmony } from "../audio/melodies";

export const neonBirthdayTemplate: Template = {
  id: "neon-birthday",
  name: "Midnight Glow",
  description: "An electric neon birthday experience built for the night",
  categories: ["birthday"],
  preview: {
    background: "linear-gradient(135deg, #080B1A 0%, #1a0533 100%)",
    lines: [
      {
        text: "Happy Birthday!",
        className: "text-xl font-extrabold",
        style: {
          color: "#FF2D7C",
          textShadow: "0 0 7px #FF2D7C, 0 0 18px #FF2D7C, 0 0 36px #FF2D7C80",
        },
      },
      {
        text: "midnight glow",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#00F5D4", textShadow: "0 0 8px #00F5D4" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Alex",
    birthdayLine: "Happy 25th Birthday!",
    personalMessage: "Hope your day is as bright as you are!",
    senderName: "Jamie",
  },

  blueprint: {
    globalStyle:
      "bg-[#080B1A] font-sans text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 40,
      desktopDensity: 100,
    },

    audio: {
      engine: "tonejs",
      key: "A",
      mode: "minor",
      tempo: 105,
      instrument: instrumentPresets.brightFM,
      melody: midnightGlowMelody,
      harmony: midnightGlowHarmony,
      loop: true,
      fadeIn: 0.5,
      volume: -10,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-[#00F5D4] opacity-80 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "✦  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "neon_text",
        style:
          "text-5xl md:text-7xl font-extrabold text-center leading-tight py-2",
        bindTo: "birthdayLine",
        animation: "scale_in",
        props: { color: "#FF2D7C" },
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-white/70 text-center mt-4 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "neon_text",
        style:
          "text-sm md:text-base tracking-widest uppercase text-center mt-6 pb-10",
        bindTo: "senderName",
        prefix: "— from  ",
        animation: "fade_up",
        props: { color: "#00F5D4" },
      },
      {
        id: "hearts",
        type: "floating_hearts",
        style: "",
      },
    ],

    requiredInputs: [
      {
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "Alex",
        maxLength: 30,
        required: true,
      },
      {
        key: "birthdayLine",
        type: "text",
        label: "The big line",
        placeholder: "Happy 25th Birthday!",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "Write something from the heart. It doesn't have to be perfect.",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Jamie",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
