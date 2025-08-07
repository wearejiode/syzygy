---
title: "Meta Tips2"
description: "A running list of tips we've encountered to make astro run the way it should"
tags: [astro, mjs, quirks, troubleshooting, starlight]
---

## Head

tip Meta Tip: Restart Required 🌀
Any time you update `sidebar.mjs`, be sure to **restart the dev server** for changes to take effect.

Astro loads sidebar configuration **once at startup**, so edits won’t be reflected until a restart.
