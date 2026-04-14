import { instrumentPresets } from "@templates/audio";
import { sunsetLoveHarmony, sunsetLoveMelody } from "@templates/audio/melodies";
import type { Template } from "@/lib/types";

export const sunsetLoveTemplate: Template = {
  id: "sunset-love",
  name: "Sunset Romance",
  description: "Warm sunset tones for heartfelt messages to someone special",
  categories: ["love", "romance"],
  preview: {
    background: "linear-gradient(135deg, #881337 0%, #9A3412 100%)",
    lines: [
      {
        text: "You Make My World Brighter",
        className: "text-xl font-light italic",
        style: { color: "#FECDD3", fontFamily: "Georgia, serif" },
      },
      {
        text: "sunset romance",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#FDA4AF" },
      },
    ],
  },
  defaultValues: {
    recipientName: "My Love",
    loveLine: "You Make My World Brighter",
    personalMessage:
      "Every sunset reminds me of the beauty you bring to my life.",
    senderName: "Alex",
  },

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
        bindTo: "recipientName",
        prefix: "💖  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "standard_text",
        style:
          "text-4xl md:text-6xl italic font-light text-center leading-tight py-2 text-rose-100",
        bindTo: "loveLine",
        animation: "scale_in",
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-rose-50/80 text-center mt-6 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-8 pb-10 text-rose-200/70",
        bindTo: "senderName",
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
        key: "recipientName",
        type: "text",
        label: "Who is this for?",
        placeholder: "My Love",
        maxLength: 30,
        required: true,
      },
      {
        key: "loveLine",
        type: "text",
        label: "Your love message",
        placeholder: "You Make My World Brighter",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your heartfelt message",
        placeholder:
          "Every sunset reminds me of the beauty you bring to my life...",
        maxLength: 280,
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
