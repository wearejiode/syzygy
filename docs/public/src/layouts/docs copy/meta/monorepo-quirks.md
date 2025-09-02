---
title: 'Why .mjs Matters (and Other Monorepo Mysteries)'
description: 'A running list of quirks we’ve uncovered while working with Astro inside a monorepo'
tags: [monorepo, astro, mjs, quirks, troubleshooting, starlight]
---

## 🧘 Overview

Monorepos are powerful — but with great structure comes great confusion. Here are some key quirks we’ve discovered (and fixed) in our Astro + Starlight setup so far.

---

## 1. Why `.mjs` Matters in a Monorepo

Astro's config files (`astro.config`, `content.config`, and `sidebar`) default to `.ts` in most examples — but in a monorepo setup, you might hit some very odd errors unless you use `.mjs` instead.

**Symptoms of this issue:**

- Mysterious `Unexpected "export"` errors
- `astro sync` fails without a clear reason
- Sidebar fails to load, or layout config silently breaks

✅ **Solution:** Rename those files to `.mjs` and use standard JavaScript `export` syntax.

---

## 2. Astro Can’t Find Your `pages/` Directory

If your project lives in a subfolder (like `apps/fresh-docs/`), Astro may assume your `src/pages` should exist in the root — not your app directory.

**Fix:**

```js
// astro.config.mjs
export default defineConfig({
  srcDir: './src', // 👈 Required for monorepo subfolder apps!
  ...
});
```
