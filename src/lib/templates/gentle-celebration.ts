import type { Template } from "../types";

export const gentleCelebrationTemplate: Template = {
  id: "gentle-celebration",
  name: "Gentle Celebration",
  description: "Soft and elegant template with warm tones",
  thumbnail: "/thumbnails/gentle.png",
  category: "celebration",

  blueprint: {
    globalStyle: "bg-cream font-serif text-ink overflow-hidden",

    visuals: {
      engine: "tsparticles",
      preset: "confetti",
      mobileDensity: 10,
      desktopDensity: 30,
    },

    modules: [
      {
        id: "title",
        type: "standard_text",
        style:
          "text-2xl md:text-4xl font-semibold text-rose-600 mt-6 text-center",
        bindTo: "main_message",
      },
    ],

    requiredInputs: [
      {
        key: "main_message",
        type: "textarea",
        label: "Your Message",
        placeholder: "Share a thoughtful note...",
        maxLength: 300,
        required: true,
      },
    ],
  },
};
