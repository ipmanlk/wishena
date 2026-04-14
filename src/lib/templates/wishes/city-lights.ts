import { instrumentPresets } from "@templates/audio";
import { cityLightsHarmony, cityLightsMelody } from "@templates/audio/melodies";
import type { Template } from "@/lib/types";

export const cityLightsTemplate: Template = {
  id: "city-lights",
  name: "City Lights",
  isPremium: true,
  description:
    "Sophisticated and smooth — for celebrations of success and new beginnings",
  categories: ["celebration", "congratulations"],
  preview: {
    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    lines: [
      {
        text: "Cheers to You",
        className: "text-xl font-bold",
        style: { color: "#FCD34D" },
      },
      {
        text: "city lights",
        className: "text-xs tracking-[0.3em] uppercase",
        style: { color: "#94A3B8" },
      },
    ],
  },
  defaultValues: {
    recipientName: "Jordan",
    celebrationLine: "Cheers to You",
    personalMessage:
      "Here's to your success and all the bright moments ahead. The city is yours.",
    senderName: "Morgan",
  },

  blueprint: {
    globalStyle:
      "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 font-sans text-white overflow-hidden justify-center",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 35,
      desktopDensity: 90,
    },

    audio: {
      engine: "tonejs",
      key: "D",
      mode: "major",
      tempo: 88,
      instrument: instrumentPresets.mellowEP,
      melody: cityLightsMelody,
      harmony: cityLightsHarmony,
      loop: true,
      fadeIn: 1,
      volume: -10,
    },

    modules: [
      {
        id: "for-label",
        type: "standard_text",
        style:
          "text-xs tracking-[0.4em] uppercase text-slate-400 text-center pt-12 pb-1",
        bindTo: "recipientName",
        prefix: "✦  For  ",
        animation: "fade_up",
      },
      {
        id: "hero",
        type: "neon_text",
        style: "text-4xl md:text-6xl font-bold text-center leading-tight py-2",
        bindTo: "celebrationLine",
        animation: "scale_in",
        props: { color: "#FCD34D" },
      },
      {
        id: "message",
        type: "standard_text",
        style:
          "text-base md:text-lg text-slate-200/80 text-center mt-4 leading-relaxed max-w-sm mx-auto whitespace-pre-wrap",
        bindTo: "personalMessage",
        animation: "fade_up",
      },
      {
        id: "sender",
        type: "standard_text",
        style:
          "text-sm tracking-widest uppercase text-center mt-6 pb-10 text-slate-400",
        bindTo: "senderName",
        prefix: "— from  ",
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
        key: "celebrationLine",
        type: "text",
        label: "The celebration line",
        placeholder: "Cheers to You",
        maxLength: 40,
        required: true,
      },
      {
        key: "personalMessage",
        type: "textarea",
        label: "Your personal message",
        placeholder:
          "Here's to your success and all the bright moments ahead. The city is yours.",
        maxLength: 250,
        required: true,
      },
      {
        key: "senderName",
        type: "text",
        label: "Your name",
        placeholder: "Morgan",
        maxLength: 25,
        required: true,
      },
    ],
  },
};
