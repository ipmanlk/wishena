import type { Template } from "../types";
import { instrumentPresets } from "../audio";
import { sunsetLoveMelody, sunsetLoveHarmony } from "../audio/melodies";

export const sunsetLoveTemplate: Template = {
  id: "sunset-love",
  name: "Sunset Romance",
  description: "Warm sunset tones for heartfelt messages to someone special",
  category: "love",

  blueprint: {
    globalStyle:
      "bg-gradient-to-br from-rose-900 via-purple-900 to-orange-900 font-serif text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 35,
      desktopDensity: 90,
    },

    audio: {
      engine: "tonejs",
      key: "F",
      mode: "major",
      tempo: 65,
      instrument: instrumentPresets.softPad,
      melody: sunsetLoveMelody,
      harmony: sunsetLoveHarmony,
      loop: true,
      fadeIn: 2.5,
      volume: -12,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-rose-200/70 text-center pt-12 pb-1",
        bindTo: "recipient_name",
        prefix: "💖  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl italic font-light text-center leading-tight py-2 text-rose-100",
        bindTo: "love_line",
        animation: "scale_in",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-rose-50/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personal_message",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-rose-200/70",
        bindTo: "sender_name",
        prefix: "Forever yours,  ",
        animation: "fade_up",
      },
      {
        id: "hearts",
        type: "floating_hearts",
        style: "",
      },
    ],

    requiredInputs: [
      {
        key: "recipient_name",
        type: "text",
        label: "Who is this for?",
        placeholder: "My Love",
        maxLength: 30,
        required: true,
      },
      {
        key: "love_line",
        type: "text",
        label: "Your love message",
        placeholder: "You Make My World Brighter",
        maxLength: 40,
        required: true,
      },
      {
        key: "personal_message",
        type: "textarea",
        label: "Your heartfelt message",
        placeholder: "Every sunset reminds me of the beauty you bring to my life...",
        maxLength: 280,
        required: true,
      },
      {
        key: "sender_name",
        type: "text",
        label: "Your name",
        placeholder: "Alex",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
