import type { Template } from "../types";
import { instrumentPresets } from "../audio";
import { starlightMelody, starlightHarmony } from "../audio/melodies";

export const starlightTemplate: Template = {
  id: "starlight",
  name: "Starlight Dreams",
  description: "Dreamy and magical — for wishes that reach beyond the stars",
  category: "celebration",

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950 font-sans text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 40,
      desktopDensity: 100,
    },

    audio: {
      engine: "tonejs",
      key: "Bb",
      mode: "major",
      tempo: 70,
      instrument: instrumentPresets.gentleBells,
      melody: starlightMelody,
      harmony: starlightHarmony,
      loop: true,
      fadeIn: 2.5,
      volume: -11,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-purple-200/70 text-center pt-12 pb-1",
        bindTo: "recipient_name",
        prefix: "✨  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "neon_text",
        style:
          "text-4xl md:text-6xl font-bold text-center leading-tight py-2",
        bindTo: "dream_message",
        animation: "scale_in",
        props: { color: "#E9D5FF" },
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-purple-100/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personal_message",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-purple-200/70",
        bindTo: "sender_name",
        prefix: "Stargazing,  ",
        animation: "fade_up",
      },
    ],

    requiredInputs: [
      {
        key: "recipient_name",
        type: "text",
        label: "Who is this for?",
        placeholder: "Stella",
        maxLength: 30,
        required: true,
      },
      {
        key: "dream_message",
        type: "text",
        label: "Your wish",
        placeholder: "Reach for the Stars",
        maxLength: 40,
        required: true,
      },
      {
        key: "personal_message",
        type: "textarea",
        label: "Your personal message",
        placeholder: "May your dreams be as vast as the night sky and as bright as the stars...",
        maxLength: 250,
        required: true,
      },
      {
        key: "sender_name",
        type: "text",
        label: "Your name",
        placeholder: "Astrid",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
