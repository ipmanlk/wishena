import type { InviteTemplate } from "../types";

export const goldenCeremonyTemplate: InviteTemplate = {
  id: "golden-ceremony",
  name: "Golden Ceremony",
  description: "Classic navy and gold foil elegance for formal events",
  inviteKind: "wedding",
  preview: {
    background: "linear-gradient(to bottom, #0f172a, #1e293b)",
    lines: [
      {
        text: "M & D",
        className: "font-serif text-3xl text-amber-300 mb-2 font-medium",
      },
      {
        text: "invitation",
        className: "text-xs tracking-[0.3em] uppercase text-zinc-400",
      },
    ],
  },
  blueprint: {
    globalStyle:
      "bg-slate-900 text-zinc-300 font-sans selection:bg-amber-900/50 selection:text-amber-200",
    visuals: {
      engine: "tsparticles",
      preset: "gold-dust",
      mobileDensity: 30,
      desktopDensity: 60,
    },
    modules: [
      {
        id: "m_header",
        type: "invite_header",
        animation: "fade_up",
        props: {
          text: "The honor of your presence is requested at the marriage of",
          className:
            "text-amber-200/70 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-center mb-10 leading-relaxed max-w-[280px] mx-auto",
        },
      },
      {
        id: "m_names",
        type: "honoree_names",
        bindSource: "project",
        bindTo: "coupleNames",
        animation: "fade_up",
        props: {
          className:
            "font-serif text-4xl sm:text-5xl md:text-6xl text-amber-400 text-center mb-12 font-medium leading-tight drop-shadow-sm",
        },
      },
      {
        id: "m_div_1",
        type: "decorative_divider",
        animation: "fade_up",
        props: {
          variant: "diamond",
          className: "text-amber-400/50 mb-10",
        },
      },
      {
        id: "m_details",
        type: "event_details",
        bindSource: "project",
        animation: "fade_up",
        props: {
          className:
            "text-center text-zinc-300 leading-relaxed mb-10 uppercase tracking-wider text-sm",
          dateStyle: "text-amber-400 mb-4 font-medium",
          timeStyle: "mb-4",
          venueStyle: "opacity-80",
        },
      },
      {
        id: "m_address",
        type: "guest_address",
        bindSource: "guest",
        bindTo: "displayName",
        prefix: "Reserved for ",
        animation: "fade_up",
        props: {
          className:
            "font-serif text-xl sm:text-2xl text-amber-200 text-center mb-6 mt-16 italic",
        },
      },
      {
        id: "m_note",
        type: "custom_note",
        bindSource: "guest",
        bindTo: "personalNote",
        animation: "fade_up",
        props: {
          className: "text-center italic text-zinc-400 mb-8 font-serif px-6",
        },
      },
      {
        id: "m_rsvp",
        type: "rsvp_prompt",
        bindSource: "project",
        bindTo: "rsvpDate",
        animation: "fade_up",
        props: {
          className: "mt-12 text-center",
          textStyle:
            "text-[10px] tracking-[0.2em] uppercase text-amber-200/70 mb-6",
          buttonConfig: {
            theme: "gold",
          },
        },
      },
      {
        id: "m_custom_fields",
        type: "guest_custom_fields",
        animation: "fade_up",
        props: {
          className: "text-center text-[#d4af37] mt-16 mb-8 font-serif px-6",
          labelClassName:
            "font-sans uppercase tracking-[0.25em] text-[10px] mb-1 opacity-80",
          valueClassName: "italic font-light",
        },
      },
    ],
    projectInputs: [
      {
        key: "coupleNames",
        label: "Couple Names",
        type: "text",
        required: true,
        scope: "project",
        placeholder: "Michael & David",
        maxLength: 60,
      },
      {
        key: "date",
        label: "Wedding Date",
        type: "date",
        required: true,
        scope: "project",
      },
      {
        key: "time",
        label: "Time",
        type: "time",
        required: true,
        scope: "project",
      },
      {
        key: "venue",
        label: "Venue Name & Address",
        type: "textarea",
        required: true,
        scope: "project",
        placeholder: "The Grand Hotel\nDowntown",
      },
      {
        key: "rsvpDate",
        label: "RSVP By",
        description:
          "The last date guests can respond — displayed on their invite card.",
        type: "date",
        required: false,
        scope: "project",
      },
    ],
  },
};
