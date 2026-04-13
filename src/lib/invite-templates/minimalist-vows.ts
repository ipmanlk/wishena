import type { InviteTemplate } from "../types";

export const minimalistVowsTemplate: InviteTemplate = {
  id: "minimalist-vows",
  name: "Minimalist Vows",
  description: "Clean, editorial design focusing on modern typography",
  inviteKind: "wedding",
  preview: {
    background: "#fafafa",
    lines: [
      {
        text: "E & A",
        className:
          "font-sans text-2xl text-zinc-900 mb-2 font-light tracking-tight",
      },
      {
        text: "join us",
        className: "text-[10px] tracking-[0.2em] uppercase text-zinc-500",
      },
    ],
  },
  blueprint: {
    globalStyle:
      "bg-zinc-50 text-zinc-800 font-sans selection:bg-zinc-200 selection:text-zinc-900",
    visuals: {
      engine: "tsparticles",
      preset: "linen",
      mobileDensity: 80,
      desktopDensity: 150,
    },
    modules: [
      {
        id: "m_names",
        type: "honoree_names",
        bindSource: "project",
        bindTo: "coupleNames",
        animation: "fade_up",
        props: {
          className:
            "font-sans text-4xl sm:text-5xl text-zinc-900 text-center mb-6 font-light tracking-tighter lowercase",
        },
      },
      {
        id: "m_header",
        type: "invite_header",
        animation: "fade_up",
        props: {
          text: "are getting married",
          className:
            "text-zinc-500 text-sm tracking-widest uppercase text-center mb-16",
        },
      },
      {
        id: "m_details",
        type: "event_details",
        bindSource: "project",
        animation: "fade_up",
        props: {
          className: "text-center text-zinc-700 leading-loose mb-16 mt-8",
          dateStyle: "font-medium text-lg uppercase tracking-wider mb-2",
          timeStyle: "mb-2 text-zinc-500 font-light",
          venueStyle: "font-light",
        },
      },
      {
        id: "m_address",
        type: "guest_address",
        bindSource: "guest",
        bindTo: "displayName",
        prefix: "for ",
        animation: "fade_up",
        props: {
          className:
            "font-sans text-xl text-zinc-900 text-center mb-4 mt-12 lowercase font-light tracking-tight",
        },
      },
      {
        id: "m_note",
        type: "custom_note",
        bindSource: "guest",
        bindTo: "personalNote",
        animation: "fade_up",
        props: {
          className: "text-center text-zinc-500 mb-8 text-sm",
        },
      },
      {
        id: "m_rsvp",
        type: "rsvp_prompt",
        bindSource: "project",
        bindTo: "rsvpDate",
        animation: "fade_up",
        props: {
          className:
            "mt-16 text-center border-t border-zinc-200 pt-8 max-w-[80%] mx-auto",
          textStyle:
            "text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-6",
          buttonConfig: {
            theme: "minimal",
          },
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
        placeholder: "Emma & Alex",
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
        placeholder: "City Hall\nNew York",
        maxLength: 100,
      },
      {
        key: "rsvpDate",
        label: "RSVP By",
        type: "date",
        required: false,
        scope: "project",
        description:
          "The last date guests can respond — displayed on their invite card.",
      },
    ],
  },
};
