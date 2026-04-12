# Wishena Codebase Reference

This document provides a comprehensive reference for the Wishena MVP codebase, a procedural wish generation platform.

## Project Overview

**Wishena** is a wish generation platform where users can:
- Select from templates (birthday, celebration, etc.)
- Customize with personal messages
- Generate shareable links
- View wishes with animations, particles, and audio

**Key Constraints:**
- No authentication required
- All data stored in browser localStorage
- Client-side rendering only
- Links contain wish ID; recipient loads from their localStorage

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
  → Wish Instance (localStorage)
  → Shareable Link (/w/[id])
```

### Core Abstractions

**Template System:**
- Templates are static TypeScript objects with a `blueprint`
- Blueprint contains: globalStyle, visuals, audio, modules, requiredInputs
- Modules define what renders on the wish page (text, effects, etc.)
- Templates registered in `src/lib/templates/index.ts`

**Storage Layer:**
- Key: `wishena:wishes`
- Value: `Record<string, Wish>` (object map for O(1) lookup)
- Repository pattern in `src/lib/storage/wish-repository.ts`
- Safe localStorage wrappers handle SSR/Edge cases

**Component Mapping:**
- Module types (e.g., "neon_text") map to React components
- Defined in `src/lib/component-map.ts`
- Used by WishRenderer to dynamically render modules

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts (Playfair, Source Sans, Caveat)
│   ├── page.tsx                # Redirects to /create
│   ├── globals.css             # Tailwind + custom CSS properties (warm colors)
│   ├── create/
│   │   └── page.tsx            # Template selection + form
│   ├── w/
│   │   └── [id]/
│   │       ├── page.tsx        # Wish display (client component)
│   │       └── layout.tsx      # OG meta tags
│   └── api/
│       └── og/
│           └── route.tsx       # Open Graph image generation (@vercel/og)
│
├── components/
│   ├── modules/                # Template module renderers
│   │   ├── NeonText.tsx        # Glowing neon text
│   │   ├── StandardText.tsx    # Regular text display
│   │   ├── Countdown.tsx       # Date countdown
│   │   └── FloatingHearts.tsx  # Decorative hearts
│   │
│   ├── wish-elements/          # Visual/audio effects
│   │   ├── ParticleBackground.tsx   # tsParticles wrapper
│   │   ├── AudioPlayer.tsx          # Tone.js wrapper
│   │   └── TapToReveal.tsx          # Overlay for audio start
│   │
│   └── wish/
│       ├── WishRenderer.tsx    # Core rendering engine
│       ├── ShareButtons.tsx    # Copy link + native share
│       └── NotFound.tsx        # Wish not found state
│
├── lib/
│   ├── templates/
│   │   ├── index.ts            # Template registry + getTemplateById
│   │   ├── neon-birthday.ts    # Cyber neon template
│   │   └── gentle-celebration.ts # Soft elegant template
│   │
│   ├── storage/
│   │   ├── local-storage.ts    # Safe localStorage wrappers
│   │   └── wish-repository.ts  # CRUD operations
│   │
│   ├── component-map.ts        # Maps module types → components
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # Helper functions (generateId, etc.)
│
└── hooks/
    └── (currently empty, reserved for future)
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
export const componentMap: Record<string, React.FC<Record<string, unknown>>> = {
  neon_text: NeonText,
  standard_text: StandardText,
  floating_hearts: FloatingHearts,
  countdown: Countdown,
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
- **OG Images:** Generated via `@vercel/og` at `/api/og`

### Cross-Device Sharing

Since data is localStorage-only:
- Users can **Export** wishes as JSON file
- Users can **Import** wishes from JSON file
- Links work if both sender and receiver have the wish in localStorage

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
- Wish stored in sender's localStorage only
- Recipient needs wish imported or in their localStorage
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