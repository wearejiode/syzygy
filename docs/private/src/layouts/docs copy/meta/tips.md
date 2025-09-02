---
<<<<<<< Updated upstream
title: 'Meta Tips'
=======
title: "Meta Tips"
>>>>>>> Stashed changes
description: "A running list of tips we've encountered to make astro run the way it should"
tags: [astro, mjs, quirks, troubleshooting, starlight]
---

<<<<<<< Updated upstream

# HEAD

=======

## Overview

> > > > > > > Stashed changes
> > > > > > > :::tip Meta Tip: Frontmatter Quoting 📚
> > > > > > > Only use **double quotes** (`"`) for frontmatter values — this allows you to use **apostrophes** (`'`) safely in your descriptions and titles without breaking YAML formatting.

:::tip Meta Tip: Restart Required 🌀
Any time you update `sidebar.mjs`, be sure to **restart the dev server** for changes to take effect.

Astro loads sidebar configuration **once at startup**, so edits won’t be reflected until a restart.

```bash
CTRL + C      # Stop dev server
pnpm dev      # Restart to reload sidebar

## 🧩 Tip: Use Lowercase Folder and File Names for Routes

```

<<<<<<< Updated upstream

=======

> > > > > > > Stashed changes
> > > > > > > Astro (and Starlight) route matching can be **case-sensitive and inconsistent**, especially when resolving content paths via the sidebar or dynamic imports. For maximum compatibility:

- ✅ Use **lowercase** folder and file names (e.g., `futuredx`, not `futureDX`)
- ✅ Match case exactly in sidebar links (`link: '/meta/futuredx/sidebar-dx'`)
- 🚫 Avoid camelCase or PascalCase in filenames or folder names for content routes

This helps prevent mysterious 404s and `getStaticPaths()` warnings that occur when the route exists but **isn't matched** due to case mismatch.

_Consistency = clarity._
