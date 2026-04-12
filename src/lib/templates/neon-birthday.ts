import type { Template } from "../types";

export const neonBirthdayTemplate: Template = {
  id: "neon-birthday",
  name: "Cyber Neon",
  description: "A vibrant neon celebration with glowing text and particles",
  thumbnail: "/thumbnails/neon.png",
  category: "birthday",

  blueprint: {
    globalStyle: "bg-slate-950 font-sans text-white overflow-hidden",

    visuals: {
      engine: "tsparticles",
      preset: "glow-dust",
      mobileDensity: 30,
      desktopDensity: 80,
    },

    audio: {
      engine: "tonejs",
      synth: "FMSynth",
      tempo: 120,
      melody: [
        { time: "0:0", note: "C4", duration: "8n" },
        { time: "0:0:2", note: "E4", duration: "8n" },
        { time: "0:1", note: "G4", duration: "8n" },
        { time: "0:1:2", note: "C5", duration: "4n" },
        { time: "0:2", note: "G4", duration: "8n" },
        { time: "0:2:2", note: "E4", duration: "8n" },
        { time: "0:3", note: "C4", duration: "2n" },
      ],
    },

    modules: [
      {
        id: "title",
        type: "neon_text",
        style:
          "text-5xl md:text-7xl font-bold text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] mt-20 text-center",
        bindTo: "main_message",
        animation: "fade_up",
      },
      {
        id: "subtitle",
        type: "standard_text",
        style:
          "text-xl text-cyan-400 mt-6 text-center tracking-widest uppercase",
        bindTo: "sender_name",
        prefix: "From ",
      },
      {
        id: "hearts",
        type: "floating_hearts",
        style: "absolute inset-0 pointer-events-none",
      },
    ],

    requiredInputs: [
      {
        key: "main_message",
        type: "text",
        label: "Your Birthday Message",
        placeholder: "Happy 25th Birthday, Alex!",
        maxLength: 50,
        required: true,
      },
      {
        key: "sender_name",
        type: "text",
        label: "Your Name",
        placeholder: "Your name",
        maxLength: 20,
        required: true,
      },
    ],
  },
};
