---
title: "Monorepo Mayhem & Folder Feng Shui"
description: "When config chaos strikes, realign your project’s chi."
pubDate: 2025-06-17
tags: [zendex, monorepo, astro, mjs, structure, tips]
---

## 🧘 Overview
The journey began with errors, mismatched extensions, and mysteriously vanishing sidebars. Sound familiar?

## The Config Crisis
Monorepos are powerful, but their quirks (especially around `.mjs` vs `.ts`) can feel like navigating a spiritual labyrinth.

## The `.mjs` Revelation
After hours of debugging, switching to `.mjs` resolved several mysterious failures. Why? Node’s native ESM support doesn't love `.ts` without extra config.

## Sidebar Salvation
Splitting up our sidebar into modules made organization easier — and the act of naming these parts was as clarifying as cleaning a cluttered room.

## Takeaways
- Use `.mjs` for config in monorepos unless you set up full TS support
- Alphabetical folder hacks (like `Zendex` with a Z) help mental clarity
- Structure is serenity
```
