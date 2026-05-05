# Wishena

Wishena is a platform for creating and sharing personalised digital wishes and event invitations. Send a beautifully animated birthday wish, celebrate a milestone, or manage your entire guest list for a wedding or party — all from a shareable link.

## What it does

### Wishes

Pick a template (birthday, celebration, love, and more), fill in your personal message and recipient's name, and Wishena generates a unique, shareable page at `/w/[id]`. The wish page plays an immersive experience for the recipient complete with:

- **Particle backgrounds** — glow dust, confetti, or snow depending on the template
- **Animated text modules** — fade-in, scale-in, or typewriter animations
- **Synthesised music** — auto-generated melodies using Tone.js (FMSynth / AMSynth)
- **Custom content** — countdown timers, floating hearts, neon text, and more

Wishes can be created as a guest (no account required) or saved to an account for later access.

### Invitations

Authenticated users can create invite projects to manage events end-to-end:

1. **Choose a template** — e.g. garden romance, elegant evening
2. **Fill in event details** — date, venue, message
3. **Add guests** — each guest gets their own personalised invite link at `/i/[guestId]`
4. **Track RSVPs** — guests respond via their link; responses are collected in the dashboard
5. **Manage the guest list** — add, edit, and remove guests at any time

Guest records support a personal note shown on the invite, private internal notes (host-only), contact details, and fully configurable custom fields (e.g. table number, dietary requirements) with per-field public/private visibility.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Animations | Framer Motion |
| Particles | tsParticles (slim) |
| Audio | Tone.js |
| Database / Auth | Supabase (Postgres + Row Level Security) |
| OG images | @vercel/og |
| Package manager | Bun |
| Linter / formatter | Biome |

## Getting started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.x
- A [Supabase](https://supabase.com) project — apply `supabase-schema.sql` to set up the database schema

### Environment variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

### Run locally

```bash
bun install
bun run dev        # starts on http://localhost:3000
```

### Build and lint

```bash
bun run build      # TypeScript check + production build
bun run lint       # Biome static analysis
bun run format     # Biome auto-format
```

## Routes

### Public

| Route | Description |
|---|---|
| `/` | Landing page |
| `/guest/wishes/new` | Create a wish without an account |
| `/guest/wishes/new/[templateId]` | Create a wish from a specific template |
| `/w/[id]` | View / experience a wish |
| `/i/[guestId]` | Personalised invite for a specific guest |
| `/auth/login` `/auth/signup` `/auth/verify` `/auth/callback` | Authentication |

### Authenticated

| Route | Description |
|---|---|
| `/me/wishes` | Your saved wishes |
| `/me/wishes/new` | Create a new wish |
| `/me/wishes/new/[templateId]` | Create a wish from a template |
| `/me/invites` | Your invite projects |
| `/me/invites/new` | Start a new invite project |
| `/me/invites/new/[kind]/[templateId]` | New project from a specific template |
| `/me/invites/[projectId]` | Project dashboard (guest list, RSVPs) |
| `/me/invites/[projectId]/edit` | Edit project details |
| `/me/invites/[projectId]/guests/new` | Add a guest |
| `/me/invites/[projectId]/guests/[guestId]/edit` | Edit a guest |

## Project structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (public)/           # Unauthenticated routes (auth, guest wishes, viewers)
│   └── me/                 # Authenticated routes (wishes, invites)
├── components/
│   ├── modules/            # Template module renderers (NeonText, Countdown, …)
│   ├── wish-elements/      # Visual and audio effects
│   ├── wish/               # Wish renderer and share bar
│   └── invites/            # Invite project and guest UI
└── lib/
    ├── templates/          # Wish template registry
    ├── invite-templates/   # Invite template registry
    ├── storage/            # Supabase repository layer
    ├── component-map.ts    # Maps module type strings → React components
    └── types.ts            # Shared TypeScript interfaces
```
