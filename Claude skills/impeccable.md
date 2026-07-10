---
name: impeccable
description: Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code that avoids generic AI aesthetics. Use when the user asks to build web components, pages, artifacts, posters, or applications, or when any design skill requires project context.
version: 2.1.1
license: Apache 2.0. Based on Anthropic's frontend-design skill.
---

# Impeccable Design Skill

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

## Context Gathering Protocol

Design skills produce generic output without project context. Required context before any design work:

- **Target audience**: Who uses this product and in what context?
- **Use cases**: What jobs are they trying to get done?
- **Brand personality/tone**: How should the interface feel?

You cannot infer this context by reading the codebase. Code tells you what was built, not who it's for or what it should feel like.

---

## Design Direction

Commit to a BOLD aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc.
- **Differentiation**: What makes this UNFORGETTABLE?

Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work. The key is intentionality, not intensity.

---

## Frontend Aesthetics Guidelines

### Typography

Choose fonts that are beautiful, unique, and interesting. Pair a distinctive display font with a refined body font.

**Always apply:**
- Use a modular type scale with fluid sizing (`clamp`) for headings on marketing/content pages. Use fixed `rem` scales for app UIs and dashboards.
- Use fewer sizes with more contrast. A 5-step scale with at least 1.25 ratio between steps creates clearer hierarchy.
- Line-height scales inversely with line length. For light text on dark backgrounds, add 0.05-0.1 to normal line-height.
- Cap line length at ~65-75ch.

**Font selection — DO THIS BEFORE TYPING ANY FONT NAME:**

Step 1. Write down 3 concrete words for the brand voice (NOT "modern" or "elegant" — dead categories).

Step 2. List the 3 fonts you'd normally reach for. Reject every font in this list — they are training-data defaults that create monoculture:

> Fraunces, Newsreader, Lora, Crimson, Crimson Pro, Crimson Text, Playfair Display, Cormorant, Cormorant Garamond, Syne, IBM Plex Mono, IBM Plex Sans, IBM Plex Serif, Space Mono, Space Grotesk, Inter, DM Sans, DM Serif Display, DM Serif Text, Outfit, Plus Jakarta Sans, Instrument Sans, Instrument Serif

Step 3. Browse a font catalog with brand words in mind: Google Fonts, Pangram Pangram, Future Fonts, Adobe Fonts, ABC Dinamo, Klim Type Foundry, Velvetyne. Look for something that fits the brand as a *physical object*. Reject the first thing that "looks designy."

Step 4. Cross-check: the right font for "elegant" is NOT necessarily a serif. The right font for "technical" is NOT necessarily a sans-serif.

**Typography rules:**
- DO vary font choices across projects
- DO NOT use Inter, Roboto, Arial, Open Sans, or any font in the rejection list above
- DO NOT use monospace as lazy shorthand for "technical/developer" vibes
- DO NOT put large icons with rounded corners above every heading
- DO NOT use only one font family for the entire page
- DO NOT use a flat type hierarchy where sizes are too close together
- DO NOT set long body passages in uppercase

### Color & Theme

Commit to a cohesive palette. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.

**Always apply:**
- Use OKLCH, not HSL. OKLCH is perceptually uniform. As you move toward white or black, REDUCE chroma.
- Tint your neutrals toward your brand hue. Even chroma of 0.005-0.01 creates subconscious cohesion.
- 60-30-10 rule is about visual *weight*: 60% neutral/surface, 30% secondary text and borders, 10% accent.

**Theme selection:** Derive light vs dark from audience and viewing context, not from defaults:
- Fast trading sessions, SRE dashboards, dark offices → dark
- Hospital portals, children's apps, morning browsing → light
- Do NOT default everything to light "to play it safe." Do NOT default everything to dark "to look cool."

**Color rules:**
- DO use `oklch`, `color-mix`, `light-dark` for perceptually uniform palettes
- DO tint neutrals toward brand hue
- DO NOT use gray text on colored backgrounds — use a shade of the background color instead
- DO NOT use pure black `#000` or pure white `#fff`
- DO NOT use the AI color palette: cyan-on-dark, purple-to-blue gradients, neon accents on dark

### Layout & Space

Create visual rhythm through varied spacing. Embrace asymmetry and unexpected compositions.

**Always apply:**
- Use a 4pt spacing scale with semantic token names (`--space-sm`, `--space-md`). Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Use `gap` instead of margins for sibling spacing.
- Vary spacing for hierarchy — don't apply the same padding everywhere.
- Self-adjusting grid: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`
- Container queries for components, viewport queries for page layout.

**Spatial rules:**
- DO create visual rhythm through varied spacing
- DO use fluid spacing with `clamp()`
- DO use asymmetry; break the grid intentionally for emphasis
- DO NOT wrap everything in cards
- DO NOT nest cards inside cards
- DO NOT use identical card grids (same-sized cards with icon + heading + text, repeated endlessly)
- DO NOT use the hero metric layout template (big number, small label, supporting stats, gradient accent)
- DO NOT center everything
- DO NOT let body text wrap beyond ~80 characters per line

### Visual Details — Absolute Bans

These CSS patterns are NEVER acceptable. They are the most recognizable AI design tells.

**BAN 1: Side-stripe borders on cards/list items/callouts/alerts**
- PATTERN: `border-left:` or `border-right:` with width greater than 1px
- FORBIDDEN: `border-left: 3px solid red`, `border-left: 4px solid var(--color-warning)`, etc.
- REWRITE: use full borders, background tints, leading numbers/icons, or no visual indicator

**BAN 2: Gradient text**
- PATTERN: `background-clip: text` combined with a gradient background
- REWRITE: use a single solid color. For emphasis, use weight or size, not gradient fill.

**Other visual rules:**
- DO NOT use glassmorphism everywhere (blur effects, glass cards, glow borders used decoratively)
- DO NOT use sparklines as decoration
- DO NOT use rounded rectangles with generic drop shadows
- DO NOT use modals unless there's truly no better alternative

### Motion

Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions.

- DO use motion to convey state changes: entrances, exits, feedback
- DO use exponential easing (ease-out-quart/quint/expo) for natural deceleration
- DO use `grid-template-rows` transitions for height animations instead of animating height directly
- DO NOT animate layout properties (width, height, padding, margin) — use transform and opacity only
- DO NOT use bounce or elastic easing — they feel dated; real objects decelerate smoothly

### Interaction

Make interactions feel fast. Use optimistic UI: update immediately, sync later.

- DO use progressive disclosure: basic options first, advanced behind expandable sections
- DO design empty states that teach the interface
- DO make every interactive surface feel intentional and responsive
- DO NOT repeat the same information (redundant headers, intros that restate the heading)
- DO NOT make every button primary — use ghost buttons, text links, secondary styles

### Responsive

- DO use container queries (`@container`) for component-level responsiveness
- DO adapt the interface for different contexts, not just shrink it
- DO NOT hide critical functionality on mobile

---

## The AI Slop Test

**Critical quality check**: If you showed this interface to someone and said "AI made this," would they believe you immediately? If yes, that's the problem.

A distinctive interface should make someone ask "how was this made?" not "which AI made this?"

---

## Implementation Principles

Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations. Minimalist designs need restraint, precision, and careful attention to spacing, typography, and subtle details.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices across generations.
