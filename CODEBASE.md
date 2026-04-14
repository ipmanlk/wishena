# Wishena Codebase Reference

This document provides a comprehensive reference for the Wishena codebase, a wish and invite platform.

## Project Overview

**Wishena** is a wish and invite platform where users can:
- Select from templates (birthday, celebration, etc.)
- Customize with personal messages
- Generate shareable links
- View wishes with animations, particles, and audio
- Create invite projects and manage guest lists

**Key Constraints:**
- Guest wish creation is supported (limited via guest sessions)
- Authenticated users can manage invite projects and save wishes
- Data is stored in Supabase (wishes, invites, guests, RSVPs)

## Tech Stack

- **Framework:** Next.js 16.2.3 (App Router)
- **React:** 19.2.4
- **TypeScript:** 5.x (Strict mode)
- **Styling:** Tailwind CSS v4
- **Package Manager:** Bun
- **Linting:** Biome

### Key Dependencies

```json
{
  "framer-motion": "^12.x",        // Animations
  "@tsparticles/react": "^3.x",    // Particle backgrounds
  "@tsparticles/slim": "^3.x",     // Particle engine
  "tone": "^15.x",                 // Audio synthesis
  "nanoid": "^5.x",                // ID generation
  "lucide-react": "^1.x",          // Icons
  "@vercel/og": "^0.11.x"          // OG image generation
}
```

## Architecture

### Data Flow

```
Template (Static JSON)
  → User Customization (Form)
  → Wish Instance (Supabase)
  → Shareable Link (/w/[id])

Invite Template
  → Project Details
  → Guest List
  → Guest Links (/i/[guestId])
```

### Core Abstractions

**Template System:**
- Templates are static TypeScript objects with a `blueprint`
- Blueprint contains: globalStyle, visuals, audio, modules, requiredInputs
- Modules define what renders on the wish page (text, effects, etc.)
- Templates registered in `src/lib/templates/index.ts`

**Storage Layer:**
- Supabase repositories in `src/lib/storage/*`
- Guest wishes stored in `guest_wishes` with session cookie flow

**Component Mapping:**
- Module types (e.g., "neon_text") map to React components
- Defined in `src/lib/component-map.ts`
- Used by WishRenderer to dynamically render modules

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts (Playfair, Source Sans, Caveat)
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Tailwind + custom CSS properties (warm colors)
│   ├── (public)/
│   │   ├── auth/                # Login / signup / verify
│   │   ├── guest/wishes/new/    # Guest wish creation
│   │   ├── w/[id]/              # Wish viewer
│   │   └── i/[guestId]/         # Invite guest view
│   ├── me/
│   │   ├── wishes/              # Authenticated wish list + create
│   │   └── invites/             # Authenticated invite projects
│   ├── @modal/                  # Invite guest modals
│   └── _shared/                 # Shared route utilities
│
├── components/
│   ├── modules/                # Template module renderers
│   ├── wish-elements/          # Visual/audio effects
│   ├── wish/                   # Wish renderer + share
│   └── invites/                # Invite UI
│
├── lib/
│   ├── templates/              # Wish template registry
│   ├── invite-templates/       # Invite templates
│   ├── storage/                # Supabase repositories
│   ├── component-map.ts        # Maps module types → components
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # Helper functions (generateId, etc.)
└── hooks/
```

## Design Philosophy

### Human-Centric Design

The product must feel **warm, personal, and authentically human** — never sterile or "AI-generated."

**Colors:**
- Backgrounds: Warm cream (`#FDF8F3`), soft beige (`#F5F0E8`), off-white (`#FFFCF8`)
- Accents: Terracotta (`#D4846A`), sage (`#8FA68E`), dusty rose (`#C9A9A6`)
- Avoid: Electric purples, neon gradients, pure black backgrounds

**Typography:**
- Headings: Serif fonts (Playfair Display) - editorial feel
- Body: Sans-serif (Source Sans 3) - warm and readable
- Accent/Quotes: Handwritten (Caveat)

**Microcopy:**
- Warm and conversational: "Create your wish", not "Submit"
- Personal, not corporate: "What would you like to say?", not "Enter your message"
- Encouraging, not demanding

## TypeScript Rules

### No `any` Types - EVER

- ❌ **Forbidden:** `const data: any = ...`
- ❌ **Forbidden:** `useState<any | null>(null)`
- ❌ **Forbidden:** Casting with `as any`
- ❌ **Forbidden:** `Record<string, any>`
- ✅ **Required:** Define proper interfaces and types
- ✅ **Required:** Use `unknown` with type guards when type is truly unknown

### No `React.FC` - Use Regular Functions

- ❌ **Forbidden:** `const Component: React.FC<Props> = () => {}`
- ✅ **Required:** Use regular functions with explicit props interfaces
- ✅ **Allowed:** Arrow function style with explicit type annotation: `const Component = (props: Props) => {}`
- ✅ **Required:** For dynamic component maps: `type ComponentType = (props: Props) => React.ReactNode`

See `AGENTS.md` for full TypeScript guidelines.

## Key Implementation Details

### Template Blueprint Structure

```typescript
interface Template {
  id: string;
  name: string;
  description: string;
  category: "birthday" | "celebration" | "love";
  
  blueprint: {
    globalStyle: string;          // Tailwind classes
    
    visuals?: {
      engine: "tsparticles";
      preset: "glow-dust" | "confetti" | "snow";
      mobileDensity: number;
      desktopDensity: number;
    };
    
    audio?: {
      engine: "tonejs";
      synth: "FMSynth" | "AMSynth" | "Synth";
      tempo: number;
      melody: Note[];
    };
    
    modules: Module[];
    requiredInputs: InputField[];
  };
}
```

### Module System

Modules define what renders on the wish page:

```typescript
interface Module {
  id: string;
  type: "neon_text" | "standard_text" | "countdown" | "floating_hearts";
  style?: string;                 // Tailwind classes
  bindTo?: string;                // Key from payload (user input)
  prefix?: string;                // e.g., "From "
  animation?: "fade_up" | "scale_in" | "typewriter";
  props?: Record<string, unknown>;
}
```

Component mapping in `src/lib/component-map.ts`:

```typescript
type ModuleComponent = (props: Record<string, unknown>) => React.ReactNode;

export const componentMap: Record<string, ModuleComponent> = {
  neon_text: NeonText as ModuleComponent,
  standard_text: StandardText as ModuleComponent,
  floating_hearts: FloatingHearts as ModuleComponent,
  countdown: Countdown as ModuleComponent,
};
```

### Wish Rendering Pipeline

1. **TapToReveal Overlay:** User must tap to start (required for Web Audio API)
2. **Particle Background:** tsParticles initialized based on template visuals
3. **Audio Player:** Tone.js starts after user interaction
4. **Module Rendering:** Each module rendered with framer-motion animations
5. **Share Buttons:** Fixed bottom bar with copy link + native share

### Animation System

Uses framer-motion with predefined variants:

```typescript
export const animationVariants = {
  fade_up: {
    initial: { opacity: 0, transform: "translateY(20px)" },
    animate: { opacity: 1, transform: "translateY(0)" },
    transition: { duration: 600 },
  },
  scale_in: {
    initial: { opacity: 0, transform: "scale(0.95)" },
    animate: { opacity: 1, transform: "scale(1)" },
    transition: { duration: 500 },
  },
  typewriter: {
    initial: { opacity: 0, transform: "translateY(10px)" },
    animate: { opacity: 1, transform: "translateY(0)" },
    transition: { duration: 800 },
  },
};
```

### Particle Presets

**Glow Dust:**
- Colors: Pink, cyan, purple
- Movement: Slow drift, no direction
- Opacity: 0.3-0.8
- Blur: 5px

**Confetti:**
- Colors: Multi-color (amber, pink, green, blue)
- Movement: Fall down at speed 2
- Size: 4-8px circles

**Snow:**
- Color: White
- Movement: Fall down at speed 1
- Opacity: 0.5-1.0

### Audio System

Uses Tone.js:
- Requires user interaction (TapToReveal overlay)
- Supports FMSynth, AMSynth, or basic Synth
- PolySynth for polyphonic playback
- Transport for timing
- Cleanup on unmount: stop transport, cancel events, dispose synths

### Share Functionality

- **Copy Link:** Uses `navigator.clipboard.writeText()`
- **Native Share:** Uses `navigator.share()` when available (mobile)
- **OG Images:** Generated via `@vercel/og`

## Performance Considerations

- Particle density reduced on mobile (30 vs 80)
- Tone.js transport cleanup prevents memory leaks
- Framer-motion uses GPU-accelerated transforms
- OG images edge-rendered for fast social previews

## Extending the System

### Adding a New Template

1. Create file: `src/lib/templates/my-template.ts`
2. Define template with blueprint (modules, inputs, visuals, audio)
3. Register in `src/lib/templates/index.ts`
4. Add thumbnail to `/public/thumbnails/my-template.png`

### Adding a New Module Type

1. Create component: `src/components/modules/MyModule.tsx`
2. Export function with proper Props interface
3. Register in `src/lib/component-map.ts`
4. Add type to Module type union in `src/lib/types.ts`
5. Use in template blueprint: `{ type: "my_module", ... }`

## Testing

- Build: `bun run build` (must pass TypeScript strict checks)
- Lint: `bun run lint` (uses Biome)
- Format: `bun run format`
- Dev: `bun run dev`

## Common Patterns

### Creating a Form Input

```typescript
// In template blueprint
requiredInputs: [
  {
    key: "main_message",      // Used in payload and bindTo
    type: "text" | "textarea" | "date",
    label: "Your Message",
    placeholder: "Happy Birthday!",
    maxLength: 50,
    required: true,
  }
]

// Binding in module
modules: [
  {
    type: "standard_text",
    bindTo: "main_message",   // Links to input key
    style: "text-xl",
  }
]
```

### Using Animation Variants

```typescript
import { motion } from "framer-motion";
import { animationVariants } from "@/lib/component-map";

<motion.div
  initial={animationVariants.fade_up.initial}
  animate={animationVariants.fade_up.animate}
  transition={{ ...animationVariants.fade_up.transition, delay: index * 0.2 }}
>
  <Component />
</motion.div>
```

## Troubleshooting

**Audio not playing:**
- Ensure user tapped "Tap to Open" overlay (required by Web Audio API)
- Check browser console for Tone.js errors

**Particles not showing:**
- Check if `initParticlesEngine` completed
- Verify preset name matches presets object
- Check mobileDensity/desktopDensity values

**Wish not found:**
- Wish may have expired (guest)
- Check wish ID in URL matches stored wish

**Type errors:**
- Never use `any` - define proper types
- Never use `React.FC` - use regular functions
- Run `bun run build` to check for TypeScript errors

## References

- **AGENTS.md:** TypeScript and React coding guidelines
- **PLAN.md:** Original implementation plan (spec reference)
- **CLAUDE.md:** Points to AGENTS.md
- **Next.js 16 Docs:** `node_modules/next/dist/docs/` (breaking changes from training data)
