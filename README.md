Pathwisse is an AI-powered education and capability platform built around one ladder: **Learn → Practice → Build → Review → Prove**. Every surface is a step on it. Build with the `Pathwisse` bundle (`window.Pathwisse`), `tokens.css` and `components/bundle.css`.

## Content fundamentals

- Pathwisse measures evidence, not activity. Never show streaks, XP, minutes-spent or "80% through a course". A learner has a capability at a known stage, backed by artifacts a reviewer has read.
- Green means **verified**, never merely "done". Use the `verified` proof-cell state and `status-success-*` only for externally attested work (Review, Prove) or checks that have actually passed.
- Show one clear next action per screen, as a primary `Button`.
- The companion explains and cites; it does not pretend to be a person, does not complete graded work and says what it is looking at.
- Plain, direct sentences. Left-aligned. No "magic", sparkle or celebration language. Empty states say what to do next. Rejections carry a human-readable reason.

## Visual foundations

- **Principles:** evidence is the unit of progress; editorial not ornamental; compact and calm; tactile where it counts; honest about AI.
- **Not Pathwisse:** gradients, glassmorphism, glowing orbs, sparkle icons, oversized rounded cards, pill buttons, confetti, mascots.
- **Colour:** `bg-canvas` is the page, `bg-surface` is cards and inputs, text is `text-primary` (charcoal, never pure black). `brand` navy marks primary action, selection edge and the companion rule. Stage accents (`stage-learn-*` blue, `stage-practice-*` amber, `stage-build-*` purple, `stage-review-*` navy, `stage-prove-*` green) are for stages and status only. Red (`status-danger-*`) is for errors and failed checks only.
- **Stage scoping:** put `data-stage="build"` on any element and its subtree receives `--tone-solid`, `--tone-text`, `--tone-tint` and `--tone-line`. Use `stage-*-solid` for fills, borders and marks; `stage-*-text` for text (amber and green have a separate, darker text token).
- **Colour is never the only signal:** every stage also has a glyph (open book, ring, stacked blocks, annotation, check), a text label and a position in the sequence.
- **Type:** Geist for language, Geist Mono for evidence (identifiers, timestamps, levels, counts, code, section indices). One `t-display` per screen; `t-h1` lesson and card titles; `t-h2` section titles; `t-h3` item titles; `t-reading` lesson copy capped at `reading-measure` (66ch); `t-body` default UI; `t-small` dense UI and buttons; `t-caption` metadata; `t-label` mono uppercase for indices and eyebrows; `t-code` for code. Left-align always. Use tabular figures (`pw-num`) in tables, timelines and stats. Do not set body copy in mono.
- **Spacing:** 8px grid with 4px half-steps (`space-N` = N × 4px). 40px (`space-10`) between page sections, 24px in card grids, 16px inside cards. Layout is 12 columns, `layout-gutter` 24px (16px below 960px), max `layout-max` 1280px.
- **Geometry:** `radius-mark` 2px for proof cells, pips and ticks; `radius-control` 6px for buttons, inputs and tags; `radius-surface` 8px for cards, panes and banners. Nothing is fully round; no pills, circles or radii above 8px. Borders are 1px (`border-width`); selection edge, focus ring and stamps are 2px.
- **Elevation:** borders first. Cards are flat with `border-default`. `shadow-raised` is a 1px lower edge. `shadow-overlay` is for popovers and menus only. No glows.
- **Controls:** every interactive target is at least `control-sm` (28px); primary targets use `control-md` (32px) or `control-lg`.
- **Focus:** a 2px solid `focus-ring` outline with 2px offset on every focusable element (inputs: the ring replaces the border). Never remove it. Large hit areas ring the whole target.
- **States:** hover strengthens the border or uses `action-ghost-bg-hover`, never a colour change that alters meaning. Pressed commit controls translate down by `press-depth` (primary button and choice options 2px, everything else 1px). Selected is `bg-selected` plus a 2px `brand` edge (lists), a 2px ring (cells) or a filled square (choices). Disabled is `bg-inset` with `text-disabled`, still in the DOM. Loading keeps focus, ignores clicks and shows a 2px marching bar.
- **Motion:** short and tied to a state change. Durations `dur-instant` 80ms (press), `dur-fast` 120ms (hover), `dur-base` 180ms (stamp, cell fill), `dur-slow` 280ms (meter fill). Easings `ease-standard`, `ease-press`, `ease-settle`. These are declared in `bundle.css`, not `tokens.json`. Vocabulary: press, fill (rises, never bounces), stamp (scale 1.06 → 1 once on verification), step (discrete on/off). Under `prefers-reduced-motion` all durations collapse to near zero.
- **Themes:** `[data-theme="light"]` (default) and `[data-theme="dark"]` override the same roles. Dark is warm-neutral charcoal, not blue-black; stage accents lighten, tints become deep washes and the primary action inverts to pale navy with navy ink.

## The five signature devices

Use these together and nowhere else.

1. **Proof Cell** (`ProofCell`): a 16, 24 or 32px square. Glyph says which stage; fill says how much evidence exists.
2. **Fill Ladder:** `locked` (dashed, empty) → `available` (outline) → `active` (partial fill) → `done` (tint) → `verified` (solid). Same ladder on every component. `verified` is reserved for Review and Prove; learner-completed work is `done`, however good.
3. **Notch:** a folded top-right corner, only on work another person has verified (evidence cards, verification cards, verified cells). Set `--notch-cut` to the real background when a notched surface is not on `bg-canvas`.
4. **Ruled Section** (`Section`): a 1px `text-primary` rule, a mono index (`03 / Capability trail`) and a heading. Do not frame sections in shadowed cards.
5. **Ladder mark** (`LadderMark`): five rising bars ending in green, standing where a logo would sit.

## Iconography

Stage glyphs are 12px stroke icons (1.25px stroke, round joins) drawn inside the bundle: open book (Learn), ring (Practice), stacked blocks (Build), annotation (Review), check (Prove). Use `StageGlyph` rather than another icon set. Other UI icons are not defined by the source; use simple 1.25px-stroke line icons, no emoji and no sparkles.

## Logo

No logo file was supplied. `LadderMark` is built from the written description only (five rising bars, the last in `stage-prove-solid`); replace it with the real mark when available. Set the product name "Pathwisse" in `t-h3` weight 600 beside it.

## Using the components

- Presentational only: pass typed view-models in, receive events out. Components never fetch and never contain sample data.
- Every data-backed region needs three states: loading (skeleton with the real footprint), error (message plus *Try again*) and ready.
- Use semantic tokens only. Never use hex, rgb or a raw palette value in a component.
- Correctness of answers, checks and verification is decided server-side; the client shows labels and verdicts, never answer keys. Derived values (status text, stats, greeting) are computed in the UI and not stored.
- Accessibility target is WCAG 2.2 AA with 7:1 for body text. Stage = glyph + label + position; status = icon or stamp text + colour; check results = icon + visually-hidden word. Keep a skip link, landmarks and `aria-live="polite"` on feedback regions.

## Responsive

≥1200px: 216px rail, 12 columns, ledger trail, three-pane workspace. 960–1199px: rail, lesson plus switchable side pane. Below 960px: bottom tab bar, single column. Below 720px: trail rows stack (header hidden), one pane at a time, 16px gutters. Reading text caps at 66ch; tables and code scroll inside their own focusable region.

## Not yet in this system

The source spec also defines Lesson Navigator, Learning Workspace (with Lesson Reader and Concept Check), Practice Lab, AI Companion, Progress app shell and Async boundary. Their behaviour and anatomy are specified in the Pathwisse design spec; build them from the primitives here and follow the same rules (roving tabindex in the navigator, `⌘/Ctrl + Enter` runs practice, stale results are labelled and never shown green, the companion transcript is editorial with a 2px `brand` rule on companion messages only).
