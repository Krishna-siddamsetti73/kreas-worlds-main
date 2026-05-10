# KRIS — Multi-Page Award Site

Transform the current single-page kriyas scroll into a 6-page **KRIS** site where each page is its own creative world with distinct interaction patterns.

## Pages & Routes

```
/              Home — cinematic entry
/services      Services — each service = mini experience
/work          Work — case studies + live metrics + demo
/about         About — story, timeline, team, values
/playground    Playground — experiments lab (the showpiece)
/contact       Contact — conversational step flow
```

## Shared shell

- Rebrand `kriyas` → `KRIS` in `Nav.tsx`, root metadata, footer.
- `Nav.tsx` becomes route-aware using `<Link>` with `activeProps`; nav items: Home / Services / Work / About / Playground / Contact.
- Keep custom `Cursor` globally in `__root.tsx` (move from index route so it persists across pages).
- Add a `PageTransition` wrapper (framer-motion `AnimatePresence` keyed on pathname) doing fade + slight zoom + blur — applied inside `__root.tsx` around `<Outlet />`.
- Reuse existing tokens in `src/styles.css`; add `--electric` (cyan) and `--magenta` accents for Playground/Services variety.

## Page 1 — Home (`/`)

Replaces current `index.tsx` content. Six sections, each a different world:

1. **CinematicHero** — black screen, single dot expands via scaling + radial gradient bloom into a particle field (canvas with 400 particles drifting from center). Headline `KRIS CREATES DIGITAL GROWTH SYSTEMS` reveals after expansion. Camera-zoom feel via `scale` + `filter: blur` driven by `useScroll`.
2. **TypoDistort** — pure typography. Words `BUILD / BREAK / REPEAT` stretched independently using `useTransform` on scroll Y → individual `scaleX` / `letterSpacing` / `skewY` per word.
3. **ImageSequence** — Apple-style frame scrub. Generate 1 hero asset; simulate sequence by morphing CSS variables (rotation, gradient stops, mask position) across 24 scroll-driven steps to look like a product assembling.
4. **SplitProblemSolution** — left half dark/red glitch visuals on hover, right half bright/green clean visuals on hover. Center divider slides based on cursor X.
5. **FullscreenTakeover** — sticky `100vh × 4` container that pins and runs an internal animation timeline (scene 1 → 2 → 3) before releasing scroll. Big sequential statements.
6. **HiddenCTA** — empty space with hint text "move closer". Cursor proximity within 200px reveals the CTA button with scale + blur-out animation.

## Page 2 — Services (`/services`)

Five stacked full-viewport sections, each its own aesthetic:

1. **Web Dev** — wireframe boxes self-assembling into a UI mockup (staggered framer-motion).
2. **App Dev** — phone frame center; UI panels fly in from sides and snap into screen.
3. **Marketing** — animated SVG data streams flowing into a funnel.
4. **SEO** — bar chart climbing + rank list reordering on scroll-into-view.
5. **Consulting** — animated SVG node graph; nodes connect with drawn lines.

Each section uses different color tokens to avoid repetition.

## Page 3 — Work (`/work`)

1. **ProjectGrid** — 6 cards; hover plays a mini gradient/motion preview, click expands inline (layout animation) into a detailed view.
2. **CaseStudyFilm** — three sticky scenes: Problem (dark, red tint, glitch), Solution (transition with split reveal), Result (bright, green tint). Driven by scroll progress.
3. **LiveMetrics** — animated counters + SVG line chart that draws on view.
4. **InteractiveDemo** — small fake dashboard with toggles/sliders the user can play with (pure client state).

## Page 4 — About (`/about`)

1. **CinematicSubtitles** — text appears line by line like film subtitles, centered, with timing.
2. **TimelinePath** — animated SVG path drawn on scroll, milestones pop along it.
3. **TeamExperimental** — 3 cards each with a _different_ hover behavior (one flips, one distorts, one reveals via mask).
4. **ValuesAccordion** — click tiles expand with layout animation showing concept detail.

## Page 5 — Playground (`/playground`) ⭐

The showpiece. Grid of 5 interactive experiments, each in its own bordered "lab cell":

1. **CursorTrail** — particle trail following cursor with color shift.
2. **ScrollWarp** — image/text that warps (skew + scale) based on scroll velocity.
3. **PseudoThreeD** — CSS 3D cube the user rotates by dragging.
4. **TextMorph** — letters morph between words using SVG `<text>` + per-letter framer transitions.
5. **UIConcept** — animated pricing card / toggle showcase.

Header treats it like a lab notebook (mono font, numbered experiments, "EXP_01" labels).

## Page 6 — Contact (`/contact`)

- Conversational step form: 4 questions (project type → budget → timeline → email), one at a time, slide transitions between steps.
- Background gradient mesh shifts hue based on current step + selected answer.
- Final step shows a confirm screen with the user's answers as a generated "brief".

## Technical notes

- All routes use `createFileRoute` with per-route `head()` (unique title + description + og tags). No hash anchors.
- Move `Cursor` into `__root.tsx`; wrap `<Outlet />` in `<AnimatePresence mode="wait">` keyed by `useLocation().pathname` for page transitions.
- Delete unused old sections (`Marquee`, `Transformation`, `HorizontalScroll`, `VideoBg`, `Process`, `Editorial`, `PinterestGrid`, `Accordion`, `Numbers`, `Testimonials`) **only if** not reused; otherwise repurpose into the new pages. Plan: keep `Footer`, repurpose `HorizontalScroll` into Work's grid, `Numbers` into LiveMetrics, `Editorial` into About story, `Testimonials` into About values area. Drop the rest.
- Generate ~3 new assets only where needed (hero particle backdrop, project preview thumbs). Reuse existing 8 assets where possible to keep image-gen cost down.
- Verify build after wiring all routes.

## Out of scope

- No real backend / form submission (Contact is UI only — submits to a thank-you state).
- No real WebGL/Three.js (using Canvas 2D + CSS 3D for performance and simplicity).
- No CMS for case studies (hardcoded content).
