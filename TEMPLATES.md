# Creating Templates — Guidelines & Rules

This document outlines how to create new wish templates for the project. Templates define the visual appearance, user inputs, and audio experience of a generated wish.

---

## Overview

A template consists of:

1. **Template definition** (`src/lib/templates/<template-id>.ts`) — metadata, preview, blueprint (modules, inputs, visuals, audio)
2. **Melody & harmony** (`src/lib/audio/melodies.ts`) — the musical composition
3. **Instrument preset** (`src/lib/audio/instruments.ts`) — the synth sound used to play the music
4. **Registry entry** (`src/lib/templates/index.ts`) — export and register the template

---

## Step-by-Step Process

### 1. Design the Template

Before writing code, decide:

- **Name & ID**: Use kebab-case for the ID (e.g., `morning-coffee`)
- **Mood & occasion**: What feeling should it evoke? What events is it for?
- **Color palette**: Background, text, accent colors. Ensure good contrast.
- **Musical character**: Key, tempo, instrument feel. Audio must match the visuals.

### 2. Create the Audio

#### 2a. Compose the melody and harmony in `src/lib/audio/melodies.ts`

- Use the `Note` type from `../types`
- Keep melodies **loop-friendly** (resolve back to the tonic or a smooth transition)
- Typical length: **4 bars** (can be longer, but keep it simple)
- Use pleasant, consonant intervals. Avoid dissonance or jarring leaps.
- Recommended velocity range: `0.5` – `0.8` for melody, `0.25` – `0.35` for harmony
- Export both `melody` and `harmony` arrays
- Add the pair to `melodiesByTemplate` at the bottom of the file

**Timing format** (Tone.js transport time):
- `"0:0"` = bar 0, beat 0
- `"0:1:2"` = bar 0, beat 1, 8th-note subdivision
- Durations: `"1n"`, `"2n"`, `"4n"`, `"8n"`, `"16n"`

**Tips for pleasant audio:**
- Use major or minor pentatonic scales for universally pleasant melodies
- Keep melodies in a comfortable register (roughly C4–C6)
- Space out notes — don't overcrowd
- Harmony should support, not compete with, the melody
- Always listen mentally for whether it would feel robotic or mechanical

#### 2b. Choose or create an instrument preset in `src/lib/audio/instruments.ts`

Existing presets:

| Preset | Synth | Feel | Best for |
|--------|-------|------|----------|
| `gentleBells` | AMSynth | Warm, bell-like | Elegant, celebration |
| `brightFM` | FMSynth | Energetic, modern | Parties, birthdays |
| `softPad` | DuoSynth | Romantic, dreamy | Love, weddings |
| `simplePluck` | Synth | Clean, minimalist | Nature, calm |
| `warmPluck` | Synth | Friendly, acoustic-guitar-like | Casual, friendship |
| `glassMarimba` | AMSynth | Light, serene, floating | Wellness, mindful |
| `mellowEP` | FMSynth | Smooth, jazzy, sophisticated | Congratulations, urban |

If none fit, create a new preset in `instrumentPresets`. Follow these rules:
- Pick the synth type that matches the desired timbre
- Use gentle envelope settings (avoid `attack: 0` or extremely short releases for pleasant sounds)
- Add effects sparingly — `reverb` is almost always good; `delay`, `chorus`, `filter` should match the aesthetic
- Avoid harsh oscillator types (e.g., raw `square` or `sawtooth` without filtering) for pleasant templates

### 3. Write the Template File

Create `src/lib/templates/<template-id>.ts`. Follow this structure:

```typescript
import { instrumentPresets } from "../audio";
import { yourMelody, yourHarmony } from "../audio/melodies";
import type { Template } from "../types";

export const yourTemplate: Template = {
  id: "your-template-id",
  name: "Your Template Name",
  description: "Short description of the vibe and occasion",
  categories: ["celebration", "optional-second-category"],
  preview: {
    background: "linear-gradient(...)",
    lines: [
      { text: "Preview Line 1", className: "...", style: { color: "#..." } },
      { text: "preview subtitle", className: "text-xs tracking-[0.3em] uppercase", style: { color: "#..." } },
    ],
  },
  defaultValues: {
    recipientName: "...",
    mainLine: "...",
    personalMessage: "...",
    senderName: "...",
  },
  blueprint: {
    globalStyle: "bg-... font-... text-... overflow-hidden justify-center",
    visuals: {
      engine: "tsparticles",
      preset: "glow-dust" | "confetti" | "snow",
      mobileDensity: number,
      desktopDensity: number,
    },
    audio: {
      engine: "tonejs",
      key: "C" | "G" | "D" | "A" | "F" | "Bb" | "Am" | "Em" | "Dm" | "Gm",
      mode: "major" | "minor" | "dorian" | "lydian" | "mixolydian",
      tempo: number,
      instrument: instrumentPresets.yourPreset,
      melody: yourMelody,
      harmony: yourHarmony,
      loop: true,
      fadeIn: number,
      volume: number,
    },
    modules: [ /* see below */ ],
    requiredInputs: [ /* see below */ ],
  },
};
```

#### Module types available

- `standard_text` — regular text block
- `neon_text` — glowing text (pass `props: { color: "#..." }`)
- `countdown` — countdown to a date
- `floating_hearts` — decorative floating hearts

#### Animation types

- `fade_up`
- `scale_in`
- `typewriter`

#### Visuals presets

- `glow-dust` — soft glowing particles (versatile, dreamy, modern)
- `confetti` — celebratory falling shapes
- `snow` — wintery falling particles

### 4. Register the Template

In `src/lib/templates/index.ts`:

1. Import the template
2. Add it to the `templates` array

### 5. Build and Verify

Run:

```bash
bun run build
bun run lint
```

Fix any TypeScript errors. Common issues:
- Missing imports
- Mismatched key in `melodiesByTemplate`
- Invalid `Note` values

---

## Design Rules

### Visuals

1. **Contrast first**: Text must be readable against the background
2. **Consistent palette**: Use 2–3 main colors, not a rainbow
3. **Match the mood**: Dark + neon = energetic; soft pastels = calm; warm earth tones = gratitude
4. **Preview must reflect the template**: The `preview` object is what users see on the selection grid

### Audio

1. **Audio must match the template mood**: A cozy template should not have aggressive electronic sounds
2. **No weird or robotic noises**: Avoid harsh FM ratios, raw sawtooth/square without filters, or atonal melodies
3. **Keep it pleasant and loopable**: The music plays continuously while the wish is viewed
4. **Volume should be comfortable**: Usually `-10` to `-14` dB
5. **Fade in is mandatory**: Use at least `0.5s` fade-in so the audio doesn't startle the user
6. **Unique to the template**: Each template should have its own melody and ideally its own instrument character

### Content

1. **Default values should feel natural**: Write placeholder text that fits the occasion
2. **Input labels should be clear**: Users should immediately understand what to write
3. **Max lengths should be generous but realistic**: `250–300` for messages, `30–40` for names/lines
4. **Categories should be accurate**: These are used for filtering on the template grid

### Code Style

1. **No `any` types** — ever
2. **Use explicit types** — import `Template`, `Note`, etc.
3. **Follow existing formatting** — match the style of existing template files
4. **Comment your melodies**: Include a short JSDoc explaining the key, tempo, feel, and visual match

---

## Quick Reference: Template Checklist

- [ ] Template file created and exported
- [ ] Melody and harmony composed in `melodies.ts`
- [ ] Melody/harmony registered in `melodiesByTemplate`
- [ ] Instrument preset chosen or created
- [ ] Template imported and added to `templates` array in `index.ts`
- [ ] Preview colors match the blueprint
- [ ] Audio key/mode matches the melody
- [ ] Build passes without errors
- [ ] Audio is pleasant, non-robotic, and matches the mood
