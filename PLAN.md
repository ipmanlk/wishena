# Wishena MVP Implementation Plan

## Overview
A procedural wish generation platform where anyone can select a template, customize it with their message, and share it via a unique link. **No authentication required.** All data stored in localStorage for the MVP.

---

## Human-Centric Design Philosophy

### Core Design Principles

This product must feel **warm, personal, and authentically human** — never sterile or "AI-generated." Every design decision should evoke the feeling of receiving a handwritten card or a carefully crafted gift.

#### 1. Color Palette Guidelines

**Avoid:**
- ❌ Electric purples (#8B5CF6, #A855F7) — screams "AI product"
- ❌ Neon gradients without purpose
- ❌ Over-saturated "tech" colors
- ❌ Pure black (#000000) backgrounds
- ❌ Harsh contrast ratios

**Embrace:**
- ✅ **Warm neutrals**: Cream (#FDF8F3), Soft beige (#F5F0E8), Warm gray (#E8E4DE)
- ✅ **Earth tones**: Terracotta (#D4846A), Sage green (#8FA68E), Dusty rose (#C9A9A6)
- ✅ **Muted accents**: Muted coral (#E07A5F), Soft mustard (#E9C46A), Deep teal (#2A9D8F)
- ✅ **Off-whites**: Never pure white, always slightly warm (#FFFCF8)
- ✅ **Soft shadows**: Warm-tinted shadows instead of gray

**Color Usage Patterns:**
```css
/* Backgrounds */
--bg-primary: #FDF8F3;        /* Warm cream */
--bg-secondary: #F5F0E8;      /* Soft beige */
--bg-card: #FFFCF8;           /* Off-white */

/* Text */
--text-primary: #3D3D3D;      /* Soft black */
--text-secondary: #6B6B6B;    /* Warm gray */
--text-muted: #9B9B9B;        /* Light gray */

/* Accents (use sparingly) */
--accent-warm: #D4846A;       /* Terracotta */
--accent-nature: #8FA68E;     /* Sage */
--accent-soft: #C9A9A6;       /* Dusty rose */

/* Interactive states */
--hover-bg: rgba(212, 132, 106, 0.08);
--active-bg: rgba(212, 132, 106, 0.12);
```

#### 2. Typography Guidelines

**Font Selection:**
- **Headings**: Serif fonts with character (e.g., "Playfair Display", "Crimson Pro", "Source Serif 4")
- **Body**: Clean but warm sans-serif (e.g., "Inter", "Source Sans 3", "DM Sans")
- **Accent/Quotes**: Handwritten or script fonts for special moments (e.g., "Caveat", "Dancing Script")

**Typography Patterns:**
```css
/* Headings should feel editorial */
h1 { font-weight: 400; letter-spacing: -0.02em; }
h2 { font-weight: 500; }

/* Body text should be highly readable */
body { 
  font-weight: 400; 
  line-height: 1.6;
  letter-spacing: 0.01em;
}

/* Slight italic for warmth in appropriate places */
.emphasis { font-style: italic; font-weight: 400; }
```

**Never use:**
- All caps for body text
- Letter-spacing wider than 0.1em
- Font weights below 400 for body text
- More than 3 font families

#### 3. UI Component Guidelines

**Buttons:**
- Rounded corners (8-12px) — not too sharp, not too pill-shaped
- Subtle shadows that lift on hover
- Text should feel like a conversation, not a command
- **Good**: "Create your wish", "Send with love"
- **Bad**: "SUBMIT", "CLICK HERE", "GENERATE"

```css
/* Button styling */
.btn-primary {
  background: var(--accent-warm);
  color: white;
  border-radius: 10px;
  padding: 12px 24px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(212, 132, 106, 0.2);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(212, 132, 106, 0.3);
}

.btn-secondary {
  background: transparent;
  border: 1.5px solid var(--text-secondary);
  color: var(--text-primary);
}
```

**Cards:**
- Soft shadows, never harsh
- Slight border radius (12-16px)
- Subtle borders in warm gray tones
- Generous internal padding

```css
.card {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.02);
  padding: 24px;
}
```

**Inputs:**
- Underline-style or soft bordered
- Placeholder text should be helpful and warm
- Focus states with warm accent color
- Generous padding for comfort

```css
.input {
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--text-muted);
  padding: 12px 4px;
  font-size: 16px;
  transition: border-color 0.2s ease;
}

.input:focus {
  border-color: var(--accent-warm);
  outline: none;
}

.input::placeholder {
  color: var(--text-muted);
  font-style: italic;
}
```

#### 4. Animation Guidelines

**Movement should feel organic:**
- Use spring physics, not linear timing
- Ease-out for entrances (decelerate)
- Ease-in-out for continuous motion
- Stagger delays should feel natural (80-150ms)

**Animation patterns:**
```css
/* Gentle fade up */
@keyframes gentleFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Soft scale in */
@keyframes softScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Gentle pulse for CTAs */
@keyframes gentlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
```

**Never use:**
- Jarring bounces
- Flashing or rapid animations
- Animations longer than 600ms for UI elements
- More than 3 elements animating simultaneously

#### 5. Layout & Spacing

**Spacing philosophy:**
- Generous whitespace — let elements breathe
- Asymmetric layouts feel more human than perfect grids
- Use the 8px grid system but don't be rigid
- Section padding: 64px mobile, 96px+ desktop

**Layout patterns:**
```css
/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Section spacing */
.section {
  padding: 80px 0;
}

/* Card grid with organic feel */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

/* Asymmetric hero layout */
.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 64px;
  align-items: center;
}
```

#### 6. Imagery & Visual Elements

**Illustrations:**
- Hand-drawn or organic shapes
- Avoid geometric perfection
- Soft edges and imperfect lines
- Warm color palettes

**Icons:**
- Use Lucide icons with rounded stroke
- Never sharp, angular icons
- Consistent 1.5-2px stroke width

**Decorative elements:**
- Subtle texture overlays (paper grain, watercolor)
- Organic blob shapes as backgrounds
- Hand-drawn dividers or flourishes

#### 7. Microcopy & Language

**Tone guidelines:**
- Warm and conversational
- Personal, not corporate
- Encouraging, not demanding
- Specific, not generic

**Examples:**

| ❌ Avoid | ✅ Use |
|---------|--------|
| "Enter your message" | "What would you like to say?" |
| "Invalid input" | "Please share a bit more" |
| "Processing..." | "Creating something special..." |
| "Error occurred" | "Oops, let's try that again" |
| "Click here" | "Tap to open your wish" |
| "Submit" | "Create your wish" |
| "Generate" | "Make it magical" |

#### 8. Template-Specific Design Guidelines

**Each template should have its own personality while maintaining warmth:**

**Birthday Template:**
- Warm yellows and soft oranges
- Confetti that feels like paper, not digital
- Playful but not childish
- "Celebration" not "party"

**Love/Romantic Template:**
- Deep roses and burgundies, not bright pinks
- Elegant script fonts for accents
- Soft, dreamy animations
- "Cherish" not "crush"

**Celebration Template:**
- Rich greens and golds
- Organic laurel or botanical elements
- Proud, uplifting tone
- "Honor" not "congrats"

**Thank You Template:**
- Soft sage and cream
- Handwritten-style elements
- Grateful, humble tone
- "Appreciate" not "thanks"

---

## Design Implementation Checklist

Before shipping any feature, verify:

- [ ] No electric purples or AI-style gradients
- [ ] Colors are warm and muted
- [ ] Typography uses serif headings + sans-serif body
- [ ] Buttons feel conversational
- [ ] Animations are gentle and organic
- [ ] Spacing is generous
- [ ] Microcopy is warm and personal
- [ ] No harsh shadows or borders
- [ ] Overall feeling is "handcrafted" not "generated"

---

## Core Architecture

### Data Flow
```
Template (Static JSON) 
  → User Customization (Form) 
  → Wish Instance (localStorage) 
  → Shareable Link (/w/[id])
```

### Key Design Decisions

1. **No Database**: All wish instances stored in browser localStorage
2. **Static Templates**: Templates are hardcoded TypeScript objects (easy to extend later)
3. **Client-Side Rendering**: Wish pages read from localStorage on mount
4. **Shareable Links**: Links contain the wish ID; recipient's browser loads from their own localStorage (or shows "not found")
5. **Export/Import**: Users can export their wish as JSON to share across devices

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Landing page → redirects to /create
│   ├── globals.css             # Global styles + Tailwind
│   │
│   ├── create/
│   │   └── page.tsx            # Template selection + customization form
│   │
│   ├── w/
│   │   └── [id]/
│   │       ├── page.tsx        # Wish display page (client component)
│   │       └── layout.tsx      # Wish page layout with OG meta
│   │
│   └── api/
│       └── og/
│           └── route.tsx       # Open Graph image generation
│
├── components/
│   ├── ui/                     # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   │
│   ├── wish-elements/          # Visual effect components
│   │   ├── ParticleBackground.tsx    # tsParticles wrapper
│   │   ├── AudioPlayer.tsx           # Tone.js wrapper
│   │   └── TapToReveal.tsx           # Audio start overlay
│   │
│   ├── modules/                # Template module renderers
│   │   ├── NeonText.tsx
│   │   ├── StandardText.tsx
│   │   ├── Countdown.tsx
│   │   └── FloatingHearts.tsx
│   │
│   └── wish/
│       ├── WishRenderer.tsx    # Core rendering engine
│       ├── ModuleRenderer.tsx  # Renders individual modules
│       └── ShareButtons.tsx    # Copy link, share native
│
├── lib/
│   ├── templates/
│   │   ├── index.ts            # Template registry
│   │   ├── neon-birthday.ts    # Template: Cyber Neon Birthday
│   │   └── gentle-celebration.ts # Template: Soft & Elegant
│   │
│   ├── storage/
│   │   ├── local-storage.ts    # localStorage abstraction
│   │   └── wish-repository.ts  # CRUD operations for wishes
│   │
│   ├── component-map.ts        # Maps module types to components
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # Helper functions
│
└── hooks/
    ├── useWish.ts              # Load wish from storage
    ├── useAudio.ts             # Audio playback management
    └── useParticles.ts         # Particle config management
```

---

## Data Models

### Template Structure (Static)

```typescript
interface Template {
  id: string;                    // "neon-birthday"
  name: string;                  // "Cyber Neon"
  description: string;           // "A vibrant neon celebration"
  thumbnail: string;             // "/thumbnails/neon.png"
  category: "birthday" | "celebration" | "love";
  
  blueprint: {
    globalStyle: string;         // Tailwind classes
    
    visuals?: {
      engine: "tsparticles";
      preset: string;            // "glow-dust" | "confetti" | "snow"
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

interface Module {
  id: string;
  type: "neon_text" | "standard_text" | "countdown" | "floating_hearts";
  style: string;                 // Tailwind classes
  bindTo?: string;               // Key from payload
  prefix?: string;               // e.g., "Sent by "
  animation?: "fade_up" | "scale_in" | "typewriter";
  props?: Record<string, any>;   // Component-specific props
}

interface InputField {
  key: string;                   // "main_message"
  type: "text" | "textarea" | "date";
  label: string;                 // "Your Message"
  placeholder?: string;
  maxLength?: number;
  required: boolean;
}

interface Note {
  time: string;                  // "0:0", "0:1"
  note: string;                  // "C4", "E4"
  duration: string;              // "4n", "8n"
}
```

### Wish Instance Structure (localStorage)

```typescript
interface Wish {
  id: string;                    // UUID (nanoid)
  templateId: string;            // Reference to template
  payload: Record<string, string>; // User inputs
  createdAt: string;             // ISO timestamp
  expiresAt?: string;            // Optional expiration
}

// localStorage key: "wishena:wishes"
// Value: Record<wishId, Wish> (object map for O(1) lookup)
```

---

## Implementation Phases

### Phase 1: Foundation (Days 1-2)

**Dependencies to Install:**
```bash
# Core animation & effects
npm install framer-motion

# Particles
npm install @tsparticles/react @tsparticles/slim

# Audio synthesis
npm install tone

# ID generation
npm install nanoid

# Icons
npm install lucide-react
```

**Tasks:**
1. Clean up default Next.js template (remove default page content)
2. Set up base Tailwind configuration with custom colors
3. Create TypeScript type definitions (`lib/types.ts`)
4. Create localStorage abstraction layer (`lib/storage/local-storage.ts`)
5. Create wish repository with CRUD operations (`lib/storage/wish-repository.ts`)
6. Build base UI components (Button, Input, Card)

**Key Implementation Details:**

```typescript
// lib/storage/wish-repository.ts
const STORAGE_KEY = "wishena:wishes";

export const wishRepository = {
  getAll(): Record<string, Wish> {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },
  
  getById(id: string): Wish | null {
    const wishes = this.getAll();
    return wishes[id] || null;
  },
  
  save(wish: Wish): void {
    const wishes = this.getAll();
    wishes[wish.id] = wish;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  },
  
  delete(id: string): void {
    const wishes = this.getAll();
    delete wishes[id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  }
};
```

---

### Phase 2: Template System (Days 3-4)

**Tasks:**
1. Create template registry with 2 starter templates
2. Build component map for dynamic module rendering
3. Create module components (NeonText, StandardText)
4. Implement animation wrappers with Framer Motion

**Template 1: Neon Birthday**

```typescript
// lib/templates/neon-birthday.ts
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
      desktopDensity: 80
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
        { time: "0:3", note: "C4", duration: "2n" }
      ]
    },
    
    modules: [
      {
        id: "title",
        type: "neon_text",
        style: "text-5xl md:text-7xl font-bold text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] mt-20 text-center",
        bindTo: "main_message",
        animation: "fade_up"
      },
      {
        id: "subtitle",
        type: "standard_text",
        style: "text-xl text-cyan-400 mt-6 text-center tracking-widest uppercase",
        bindTo: "sender_name",
        prefix: "From "
      },
      {
        id: "hearts",
        type: "floating_hearts",
        style: "absolute inset-0 pointer-events-none"
      }
    ],
    
    requiredInputs: [
      {
        key: "main_message",
        type: "text",
        label: "Your Birthday Message",
        placeholder: "Happy 25th Birthday, Alex!",
        maxLength: 50,
        required: true
      },
      {
        key: "sender_name",
        type: "text",
        label: "Your Name",
        placeholder: "Your name",
        maxLength: 20,
        required: true
      }
    ]
  }
};
```

**Component Map:**

```typescript
// lib/component-map.ts
import { NeonText } from "@/components/modules/NeonText";
import { StandardText } from "@/components/modules/StandardText";
import { FloatingHearts } from "@/components/modules/FloatingHearts";
import { Countdown } from "@/components/modules/Countdown";

export const componentMap: Record<string, React.FC<any>> = {
  neon_text: NeonText,
  standard_text: StandardText,
  floating_hearts: FloatingHearts,
  countdown: Countdown
};

// Animation variants
export const animationVariants = {
  fade_up: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  scale_in: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "backOut" }
  },
  typewriter: {
    // Special handling in component
  }
};
```

---

### Phase 3: Visual Effects Engine (Days 5-6)

**Tasks:**
1. Integrate tsParticles with preset configurations
2. Create particle preset configs (glow-dust, confetti, snow)
3. Build responsive density switching (mobile vs desktop)
4. Create Tone.js audio player with user interaction requirement

**Particle Background Component:**

```typescript
// components/wish-elements/ParticleBackground.tsx
"use client";

import { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ParticleBackgroundProps {
  preset: "glow-dust" | "confetti" | "snow";
  mobileDensity: number;
  desktopDensity: number;
}

const presets = {
  "glow-dust": {
    particles: {
      color: { value: ["#ec4899", "#06b6d4", "#8b5cf6"] },
      move: { enable: true, speed: 0.5, direction: "none" },
      opacity: { value: { min: 0.3, max: 0.8 } },
      size: { value: { min: 1, max: 3 } },
      blur: { enable: true, value: 5 }
    }
  },
  "confetti": { /* ... */ },
  "snow": { /* ... */ }
};

export function ParticleBackground({ 
  preset, 
  mobileDensity, 
  desktopDensity 
}: ParticleBackgroundProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);
  
  const options = useMemo(() => ({
    ...presets[preset],
    particles: {
      ...presets[preset].particles,
      number: { value: isMobile ? mobileDensity : desktopDensity }
    }
  }), [preset, isMobile, mobileDensity, desktopDensity]);
  
  return <Particles options={options} className="absolute inset-0 -z-10" />;
}
```

**Audio Player Component:**

```typescript
// components/wish-elements/AudioPlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

interface AudioPlayerProps {
  synth: "FMSynth" | "AMSynth" | "Synth";
  tempo: number;
  melody: Note[];
  isPlaying: boolean;
}

export function AudioPlayer({ synth, tempo, melody, isPlaying }: AudioPlayerProps) {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const partRef = useRef<Tone.Part | null>(null);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    // Initialize synth
    const SynthClass = synth === "FMSynth" ? Tone.FMSynth : 
                       synth === "AMSynth" ? Tone.AMSynth : Tone.Synth;
    
    synthRef.current = new Tone.PolySynth(SynthClass).toDestination();
    synthRef.current.volume.value = -10;
    
    // Create melody part
    Tone.Transport.bpm.value = tempo;
    
    partRef.current = new Tone.Part((time, value) => {
      synthRef.current?.triggerAttackRelease(
        value.note, 
        value.duration, 
        time
      );
    }, melody.map(m => [m.time, m])).start(0);
    
    Tone.Transport.start();
    
    return () => {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      synthRef.current?.dispose();
      partRef.current?.dispose();
    };
  }, [isPlaying, synth, tempo, melody]);
  
  return null; // Invisible component
}
```

**Tap to Reveal Overlay:**

```typescript
// components/wish-elements/TapToReveal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";

interface TapToRevealProps {
  isRevealed: boolean;
  onReveal: () => void;
  previewText?: string;
}

export function TapToReveal({ isRevealed, onReveal, previewText }: TapToRevealProps) {
  return (
    <AnimatePresence>
      {!isRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={onReveal}
        >
          <motion.div 
            className="text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          >
            <Volume2 className="w-16 h-16 mx-auto mb-4 text-white" />
            <p className="text-2xl font-semibold text-white">Tap to Open</p>
            {previewText && (
              <p className="mt-2 text-white/60 text-sm">{previewText}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

### Phase 4: Creator Interface (Days 7-8)

**Tasks:**
1. Build template selection grid on `/create`
2. Create dynamic form generator from template's `requiredInputs`
3. Build live preview in mobile-sized container
4. Implement wish creation and storage

**Create Page Structure:**

```typescript
// app/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { templates } from "@/lib/templates";
import { wishRepository } from "@/lib/storage/wish-repository";
import { TemplateCard } from "@/components/TemplateCard";
import { DynamicForm } from "@/components/DynamicForm";
import { LivePreview } from "@/components/LivePreview";

export default function CreatePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"select" | "customize" | "preview">("select");
  
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    // Initialize form with empty values
    const initialData: Record<string, string> = {};
    template.blueprint.requiredInputs.forEach(input => {
      initialData[input.key] = "";
    });
    setFormData(initialData);
    setStep("customize");
  };
  
  const handleCreateWish = () => {
    if (!selectedTemplate) return;
    
    const wish: Wish = {
      id: nanoid(10),
      templateId: selectedTemplate.id,
      payload: formData,
      createdAt: new Date().toISOString()
    };
    
    wishRepository.save(wish);
    router.push(`/w/${wish.id}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {step === "select" && (
        <TemplateGrid 
          templates={templates} 
          onSelect={handleTemplateSelect} 
        />
      )}
      
      {step === "customize" && selectedTemplate && (
        <div className="grid lg:grid-cols-2 gap-8 p-8">
          <DynamicForm
            template={selectedTemplate}
            formData={formData}
            onChange={setFormData}
            onSubmit={handleCreateWish}
          />
          <LivePreview
            template={selectedTemplate}
            payload={formData}
          />
        </div>
      )}
    </div>
  );
}
```

**Dynamic Form Component:**

```typescript
// components/DynamicForm.tsx
interface DynamicFormProps {
  template: Template;
  formData: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
  onSubmit: () => void;
}

export function DynamicForm({ template, formData, onChange, onSubmit }: DynamicFormProps) {
  const handleChange = (key: string, value: string) => {
    onChange({ ...formData, [key]: value });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customize Your Wish</h2>
      
      {template.blueprint.requiredInputs.map((input) => (
        <div key={input.key}>
          <label className="block text-sm font-medium mb-2">
            {input.label}
          </label>
          {input.type === "textarea" ? (
            <textarea
              value={formData[input.key] || ""}
              onChange={(e) => handleChange(input.key, e.target.value)}
              maxLength={input.maxLength}
              placeholder={input.placeholder}
              className="w-full p-3 border rounded-lg"
              rows={4}
            />
          ) : (
            <input
              type="text"
              value={formData[input.key] || ""}
              onChange={(e) => handleChange(input.key, e.target.value)}
              maxLength={input.maxLength}
              placeholder={input.placeholder}
              className="w-full p-3 border rounded-lg"
            />
          )}
          {input.maxLength && (
            <p className="text-sm text-gray-500 mt-1">
              {formData[input.key]?.length || 0}/{input.maxLength}
            </p>
          )}
        </div>
      ))}
      
      <button
        onClick={onSubmit}
        disabled={!template.blueprint.requiredInputs.every(
          i => !i.required || formData[i.key]?.trim()
        )}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50"
      >
        Create Wish
      </button>
    </div>
  );
}
```

---

### Phase 5: Wish Display Page (Days 9-10)

**Tasks:**
1. Build `/w/[id]` page with client-side data loading
2. Implement WishRenderer that combines template + payload
3. Add share buttons (copy link, native share)
4. Handle "wish not found" state

**Wish Page:**

```typescript
// app/w/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { wishRepository } from "@/lib/storage/wish-repository";
import { getTemplateById } from "@/lib/templates";
import { WishRenderer } from "@/components/wish/WishRenderer";
import { ShareButtons } from "@/components/wish/ShareButtons";
import { NotFound } from "@/components/NotFound";

export default function WishPage() {
  const params = useParams();
  const [wish, setWish] = useState<Wish | null>(null);
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const id = params.id as string;
    const foundWish = wishRepository.getById(id);
    
    if (foundWish) {
      setWish(foundWish);
      const foundTemplate = getTemplateById(foundWish.templateId);
      setTemplate(foundTemplate);
    }
    
    setIsLoading(false);
  }, [params.id]);
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!wish || !template) {
    return <NotFound />;
  }
  
  return (
    <>
      <WishRenderer template={template} payload={wish.payload} />
      <ShareButtons wishId={wish.id} />
    </>
  );
}
```

**Wish Renderer:**

```typescript
// components/wish/WishRenderer.tsx
"use client";

import { useState } from "react";
import { componentMap, animationVariants } from "@/lib/component-map";
import { ParticleBackground } from "@/components/wish-elements/ParticleBackground";
import { AudioPlayer } from "@/components/wish-elements/AudioPlayer";
import { TapToReveal } from "@/components/wish-elements/TapToReveal";
import { motion } from "framer-motion";

interface WishRendererProps {
  template: Template;
  payload: Record<string, string>;
}

export function WishRenderer({ template, payload }: WishRendererProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const { blueprint } = template;
  
  return (
    <main className={`min-h-[100dvh] w-full flex flex-col items-center relative ${blueprint.globalStyle}`}>
      {/* Background Effects */}
      {blueprint.visuals && (
        <ParticleBackground
          preset={blueprint.visuals.preset}
          mobileDensity={blueprint.visuals.mobileDensity}
          desktopDensity={blueprint.visuals.desktopDensity}
        />
      )}
      
      {/* Audio (starts after reveal) */}
      {blueprint.audio && (
        <AudioPlayer
          synth={blueprint.audio.synth}
          tempo={blueprint.audio.tempo}
          melody={blueprint.audio.melody}
          isPlaying={isRevealed}
        />
      )}
      
      {/* Tap to Reveal Overlay */}
      {!isRevealed && (
        <TapToReveal
          isRevealed={isRevealed}
          onReveal={() => setIsRevealed(true)}
          previewText={payload[blueprint.requiredInputs[0]?.key]}
        />
      )}
      
      {/* Content Modules */}
      <div className="z-10 flex flex-col items-center w-full max-w-md px-4">
        {blueprint.modules.map((module, index) => {
          const Component = componentMap[module.type];
          if (!Component) return null;
          
          const text = module.bindTo ? payload[module.bindTo] : undefined;
          const animation = module.animation ? animationVariants[module.animation] : null;
          
          return (
            <motion.div
              key={module.id}
              initial={animation?.initial || { opacity: 0 }}
              animate={isRevealed ? animation?.animate || { opacity: 1 } : { opacity: 0 }}
              transition={{ 
                ...animation?.transition,
                delay: index * 0.2 // Stagger animations
              }}
            >
              <Component
                className={module.style}
                text={text}
                prefix={module.prefix}
                {...module.props}
              />
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
```

---

### Phase 6: Social Sharing & OG Images (Days 11-12)

**Tasks:**
1. Implement `@vercel/og` for dynamic image generation
2. Add Open Graph meta tags to wish pages
3. Create share buttons with native Web Share API fallback

**OG Image Route:**

```typescript
// app/api/og/route.tsx
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text") || "A special wish for you!";
  const template = searchParams.get("template") || "neon-birthday";
  
  // Template-specific backgrounds
  const backgrounds: Record<string, string> = {
    "neon-birthday": "radial-gradient(circle, #ec4899 0%, #020617 70%)",
    "gentle-celebration": "linear-gradient(135deg, #fce7f3 0%, #ddd6fe 100%)"
  };
  
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: backgrounds[template] || backgrounds["neon-birthday"],
          padding: "40px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
              color: "white",
              textShadow: "0 0 30px rgba(255,255,255,0.5)",
              lineHeight: 1.2
            }}
          >
            {text.length > 60 ? text.slice(0, 60) + "..." : text}
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 24,
              color: "rgba(255,255,255,0.8)"
            }}
          >
            Open to view your wish ✨
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
```

**Metadata for Wish Pages:**

```typescript
// app/w/[id]/layout.tsx
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  // Note: In client component pages, we'll use <Head> instead
  // This is for reference when we add server-side wish loading later
  
  return {
    title: "Someone sent you a wish! ✨",
    description: "Open to view your special message",
    openGraph: {
      images: [`/api/og?id=${params.id}`]
    }
  };
}
```

**Share Buttons:**

```typescript
// components/wish/ShareButtons.tsx
"use client";

import { useState } from "react";
import { Copy, Share2, Check } from "lucide-react";

interface ShareButtonsProps {
  wishId: string;
}

export function ShareButtons({ wishId }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/w/${wishId}`;
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Someone sent you a wish!",
        text: "Open to view your special message ✨",
        url
      });
    }
  };
  
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full shadow-lg text-sm font-medium"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied!" : "Copy Link"}
      </button>
      
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg text-sm font-medium"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      )}
    </div>
  );
}
```

---

### Phase 7: Polish & Cross-Device Sharing (Days 13-14)

**Tasks:**
1. Add export/import functionality for cross-device sharing
2. Optimize animations for 60fps on mobile
3. Add error boundaries
4. Test on various devices

**Export/Import Feature:**

```typescript
// components/ExportImport.tsx
"use client";

import { useState } from "react";
import { Download, Upload } from "lucide-react";
import { wishRepository } from "@/lib/storage/wish-repository";

export function ExportImport() {
  const [showImport, setShowImport] = useState(false);
  
  const handleExport = () => {
    const wishes = wishRepository.getAll();
    const blob = new Blob([JSON.stringify(wishes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wishena-wishes-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wishes = JSON.parse(e.target?.result as string);
        Object.values(wishes).forEach((wish: any) => {
          wishRepository.save(wish);
        });
        alert("Wishes imported successfully!");
        window.location.reload();
      } catch {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };
  
  return (
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
      >
        <Download className="w-4 h-4" />
        Export
      </button>
      
      <label className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 cursor-pointer">
        <Upload className="w-4 h-4" />
        Import
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}
```

---

## Extensibility Guide

### Adding a New Template

1. **Create template file** in `lib/templates/my-template.ts`:

```typescript
export const myTemplate: Template = {
  id: "my-template",
  name: "My Template",
  // ... blueprint configuration
};
```

2. **Register in** `lib/templates/index.ts`:

```typescript
export const templates = [
  neonBirthdayTemplate,
  gentleCelebrationTemplate,
  myTemplate // Add here
];
```

3. **Add thumbnail** to `/public/thumbnails/my-template.png`

### Adding a New Module Type

1. **Create component** in `components/modules/MyModule.tsx`:

```typescript
interface MyModuleProps {
  className?: string;
  text?: string;
  // ... other props
}

export function MyModule({ className, text }: MyModuleProps) {
  return <div className={className}>{text}</div>;
}
```

2. **Register in** `lib/component-map.ts`:

```typescript
export const componentMap = {
  // ... existing modules
  my_module: MyModule
};
```

3. **Use in template blueprint**:

```typescript
modules: [
  {
    id: "unique-id",
    type: "my_module",
    style: "text-xl font-bold",
    bindTo: "input_key"
  }
]
```

---

## Performance Considerations

1. **Lazy load heavy components**:
   ```typescript
   const ParticleBackground = dynamic(
     () => import("@/components/wish-elements/ParticleBackground"),
     { ssr: false }
   );
   ```

2. **Reduce particle density on mobile** (already in blueprint)

3. **Use `will-change` sparingly** for animated elements

4. **Debounce rapid input changes** in the creator form

5. **Clean up Tone.js on unmount** to prevent memory leaks

---

## Future Enhancements (Post-MVP)

1. **Server-side storage** with PostgreSQL
2. **More templates**: Holiday themes, romantic, congratulations
3. **Custom uploads**: User-uploaded images/backgrounds
4. **Advanced animations**: Lottie integration, 3D effects
5. **Analytics**: View counts, share tracking
6. **QR Code generation** for physical cards
7. **Scheduled delivery**: Send wishes at specific times

---

## Dependencies Summary

```json
{
  "dependencies": {
    "next": "16.2.3",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "framer-motion": "^11.x",
    "@tsparticles/react": "^3.x",
    "@tsparticles/slim": "^3.x",
    "tone": "^15.x",
    "nanoid": "^5.x",
    "lucide-react": "^0.x"
  }
}
```

---

## Success Criteria

### Functional Requirements
- [ ] User can select from 2+ templates
- [ ] User can fill out a form and create a wish
- [ ] Wish displays with animations and effects
- [ ] Audio plays after user interaction
- [ ] Link can be copied and shared
- [ ] OG image generates for social previews
- [ ] Works smoothly on mobile devices (60fps)
- [ ] Wishes persist in localStorage
- [ ] Export/import allows cross-device sharing

### Design Requirements (Human-Centric)
- [ ] No electric purples or AI-style gradients used
- [ ] Colors are warm and muted (cream, terracotta, sage)
- [ ] Typography uses serif headings + sans-serif body
- [ ] Buttons feel conversational (not "SUBMIT", but "Create your wish")
- [ ] Animations are gentle and organic (no jarring movements)
- [ ] Spacing is generous with room to breathe
- [ ] Microcopy is warm and personal
- [ ] Overall feeling is "handcrafted" not "generated"
- [ ] Templates have distinct personalities while maintaining warmth
