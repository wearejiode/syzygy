---
title: "🚀 Smooth Scaling: Why We're Making the Move from 'Many' to Monorepos"
slug: 'smooth-scaling-monorepos'
description: "Our codebase used to be a scattered collection of sites, scripts, and services. Here's how moving to a structured monorepo with Nx and pnpm helped us reclaim clarity, speed, and sanity."
date: 2025-06-14
tags: ['monorepos', 'nx', 'pnpm', 'tooling', 'developer-experience']
author: Jacob Fahrnbach
layout: default
status: published
featured: true
comments: true
series: 'Dev Infrastructure'
series_part: 1
readingTime: 6
visibility: public
canonical: https://fahrnbach.one/blog/smooth-scaling-monorepos
---

## 🔧 From Many to One

The line that started it all:

```
npm install -g pnpm
```

> I even felt a little bad about it. I mean - npm has been with me through thick and thin - so it almost seemed a >little bit cruel to install its newer faster smarter replacement pnpm;
> using npm...

Our repo started like most do — one site here, one worker there, a script or two buried in `/Tools/`, and the occasional forgotten `package.json` lurking in a subdirectory.

But as our stack grew — Angular apps, GraphQL APIs, Cloudflare Workers, Markdown pipelines — so did the complexity.

**Every folder became its own ecosystem.**

- `node_modules` multiplied like gremlins
- Dev tools fell out of sync
- Shared logic turned into copy-paste spaghetti
- Deploys became a scavenger hunt

We realized: _this isn't just a project anymore — it's a platform._ And platforms need structure.

---

## 🧠 Why Monorepos Make Sense

When you centralize your apps and packages under one roof:

- ✅ **Shared tooling** just works (`tsconfig`, `prettier`, `eslint`, etc.)
- ✅ **Dependencies** are tracked, versioned, and linked cleanly
- ✅ **Scripts** and builds run faster and smarter
- ✅ **Deployment** becomes deterministic
- ✅ **You know where things live**

And with Nx + pnpm?
You get first-class workspace support, blazing speed, and zero overhead linking between apps and libs.

---

## 🛠 The Stack: Nx + pnpm

We chose:

- **Nx**: Task graph, incremental builds, Angular support, deploy targets
- **pnpm**: Fast installs, strict package isolation, workspace-aware dependency linking

Together they give us:

- 📦 A single lockfile for all projects
- 🧩 A shared schema and utilities folder (`packages/schemas`, `packages/utils`)
- 🎯 Smart script filtering (`pnpm --filter blog run dev`)
- 🧠 Visual dependency graph (`nx graph`)

---

## 🗺 Our Migration Plan

We didn’t nuke the old repo. We structured it:

1. Set up `apps/` and `packages/` folders
2. Installed Nx + pnpm
3. Added `pnpm-workspace.yaml`
4. Moved one project at a time (starting with `blog`)
5. Centralized our schema logic into `packages/schemas`
6. Replaced raw deploy scripts with `nx run` targets

---

## 📈 Results So Far

| Metric              | Before          | After Nx + pnpm    |
| ------------------- | --------------- | ------------------ |
| Dev startup time    | 🐢 ~15s         | 🚀 ~3s             |
| CI build time       | 🧱 Full rebuild | 🧠 Incremental     |
| Cross-project links | ❌ Manual       | ✅ Auto-linked     |
| Deploy clarity      | 😵‍💫 Scattered    | 🧭 `nx deploy all` |

---

## ✨ Final Thoughts

> “The real benefit wasn’t just speed — it was sanity. A monorepo turned our codebase from a bag of Legos into a well-sorted toolbox.”

This move wasn’t just about shipping faster — it was about **thinking clearer**, collaborating better, and finally having a place for everything.

Next up: automated deployments, visual schema builders, and a CMS worthy of the stack it lives in.
