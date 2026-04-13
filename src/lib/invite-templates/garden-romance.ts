import type { InviteTemplate } from "../types";

export const gardenRomanceTemplate: InviteTemplate = {
  id: "garden-romance",
  name: "Garden Romance",
  description:
    "Soft florals and elegant serifs for a romantic outdoor celebration",
  inviteKind: "wedding",
  preview: {
    background: "linear-gradient(to bottom, #Fdfbf7, #fdf4f6)",
    lines: [
      {
        text: "S & J",
        className: "font-serif text-3xl text-[#9c6a6c] mb-2 font-medium",
      },
      {
        text: "You're invited",
        className: "text-xs tracking-[0.2em] uppercase text-[#738276]",
      },
    ],
  },
  blueprint: {
    globalStyle:
      "bg-[#Fdfbf7] text-[#4a4a4a] font-sans selection:bg-[#fce7f3] selection:text-[#9c6a6c]",
    visuals: {
      engine: "tsparticles",
      preset: "petals",
      mobileDensity: 20,
      desktopDensity: 40,
    },
    modules: [
      {
        id: "m_header",
        type: "invite_header",
        animation: "fade_up",
        props: {
          text: "Together with their families",
          className:
            "text-[#738276] text-sm tracking-[0.2em] uppercase text-center mb-8",
        },
      },
      {
        id: "m_names",
        type: "honoree_names",
        bindSource: "project",
        bindTo: "coupleNames",
        animation: "scale_in",
        props: {
          className:
            "font-serif text-5xl md:text-6xl text-[#9c6a6c] text-center mb-8 font-medium leading-tight",
        },
      },
      {
        id: "m_action",
        type: "invite_header",
        animation: "fade_up",
        props: {
          text: "joyfully invite you to their wedding celebration",
          className: "text-[#738276] text-sm italic text-center mb-10",
        },
      },
      {
        id: "m_div_1",
        type: "decorative_divider",
        animation: "fade_up",
        props: {
          variant: "leaf",
          className: "text-[#738276] opacity-50 mb-10",
        },
      },
      {
        id: "m_details",
        type: "event_details",
        bindSource: "project",
        animation: "fade_up",
        props: {
          className: "text-center text-[#4a4a4a] leading-relaxed mb-10",
          dateStyle: "font-serif text-xl text-[#9c6a6c] mb-3",
          timeStyle: "mb-3",
          venueStyle: "font-medium",
        },
      },
      {
        id: "m_address",
        type: "guest_address",
        bindSource: "guest",
        bindTo: "name",
        prefix: "Dear ",
        animation: "typewriter",
        props: {
          className:
            "font-serif text-2xl text-[#9c6a6c] text-center mb-6 mt-12",
        },
      },
      {
        id: "m_note",
        type: "custom_note",
        bindSource: "guest",
        bindTo: "note",
        animation: "fade_up",
        props: {
          className: "text-center italic text-[#738276] mb-8 font-serif px-6",
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
          textStyle: "text-xs tracking-[0.2em] uppercase text-[#738276] mb-6",
          buttonConfig: {
            theme: "rose",
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
        placeholder: "Sarah & James",
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
        placeholder: "The Botanical Gardens\n123 Floral Way, Springfield",
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
    guestInputs: [
      {
        key: "name",
        label: "Guest Name(s)",
        type: "text",
        required: true,
        scope: "guest",
        placeholder: "Priya & Vikram",
        maxLength: 60,
      },
      {
        key: "note",
        label: "Personal Note (Optional)",
        type: "textarea",
        required: false,
        scope: "guest",
        placeholder: "We can't wait to celebrate with you!",
        maxLength: 200,
      },
      {
        key: "tableNumber",
        label: "Table Number (Optional)",
        type: "text",
        required: false,
        scope: "guest",
        placeholder: "Table 7",
        maxLength: 20,
      },
    ],
  },
};
