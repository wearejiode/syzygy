## 🚀 Day 10: 1 Shell, 2 Bosses

> ⚔️ Retrospective: “Felt like a double boss fight — Monorepo meets Astro.”

**Highlights:**
- Integrated **Starlight (Astro)** into the Nx monorepo under `apps/docs`
- Structured Starlight content folders: `core/`, `meta/`, `guides/`, and `sandbox/`
- Created custom sidebar with `sidebar.mjs`, replacing `_category_.json` strategy
- Solved frontmatter parsing errors caused by single quotes and bad indentation
- Began creating internal documentation: Tips, Observations, Future-DX ideas
- Designed reusable layout for one-liner logs with scrollable code block
- Formalized docs section hierarchy (root `meta`, `logs`, `futuredx`, etc.)
- Cleaned up routing inconsistencies (e.g., case-sensitivity in folder names)
- Added `monorepo-quirks.md`, `lint-frontmatter.md`, and `observations.md` docs
- Introduced Markdown formatting guidelines for consistency

**Summary:**
Today was the real start of our documentation era. We fully wired up Astro’s Starlight inside our Nx monorepo, wrestled with sidebar config (hint: lowercase slugs only), and wrote down everything we learned in a rapidly growing `meta/` section. This wasn’t just doc-writing — this was doc-scaping.

We encountered YAML frontmatter quirks, casing issues, sidebar config overrides, and the realities of building a multi-app monorepo with conflicting mental models.

We also prepped for scaling, realizing that logs like this one — plus observability, DX tips, and future planning — deserved a permanent home.

**Intent:**
Create a rock-solid internal documentation space so we never have to repeat the same troubleshooting twice. Build toward an open-source-worthy, self-documenting platform.

**Lessons Learned:**
- Astro enforces lowercase slugs in `/src/content/docs/` — ignore this at your peril.
- Starlight’s `_category_.json` is ignored if `sidebar.mjs` is in play.
- Frontmatter should always use **double quotes** and consistent indentation.
- Restart your dev server more often than you think.

**Future Improvements:**
- Add `meta.md` overview page with links to all subsections
- Extract reusable Observations Log component
- Add animated flare when viewing new documentation sections

CAME UP with the DEV Spark ⚡️ Series
CAME UP with the Zendex 🧘 Series
---
🗃️ Want to see the raw quirks? Browse the [`meta/logs`](https://docs.fahrnbach.one/meta/logs/observations)  
🧠 Missed yesterday’s planning session? [Catch up here](https://github.com/fahrnbach/one/discussions/4)

**Tags:** `#astro` `#starlight` `#monorepo` `#dx` `#devlog`  
🎧 **Coding Fuel:** [ZENTRONIC (Deep Downtempo)](https://www.youtube.com/watch?v=GgEjPt0ZnSU)  
📅 *June 18 2025*
