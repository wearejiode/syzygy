# 🧾 Blog Frontmatter & Database Metadata Guide

This guide outlines all metadata fields used across our blog post system — both in Markdown frontmatter and in the SQL database schema. It includes a checklist-style chart to show what lives where, and tips for usage.

---

## 📦 Frontmatter Template

```yaml
---
id: art-app
slug: art-app
slugPrefix: false

# Content Meta
title: "🎨 Case Study: Designing My Art App"
description: "A practical comparison of Vercel and Cloudflare..."
author: Jacob Fahrnbach
cover: /assets/screenshots/git-merge-disaster.webp
ogImageAlt: "An abstract Image for blog.fahrnbach.one cover"
images:
  - /assets/thumbs/art-app.png
  - /assets/ui/gear-panel.png

# Timing
created: 2025-06-02
edited: 2025-06-13
scheduled: 2025-06-20T10:00:00Z

# Structure & Logic
excerpt: "How I turned a social art platform..."
summaryPoints:
  - Why I rebuilt the app from scratch
  - What SVG taught me about UI
  - Lessons for other designers
readingTime: 6
languages: en
layout: default
index: true
comments: true

# Tags & Series
tags:
  - design
  - ui
categories:
  - case-study
  - UX
isSeries: true
series: "Crafting Your Own Genie"
series_part: 2

# Control Flags
draft: true
featured: true
dirty: false
published: false
visibility: public
status: published
authRequired: false

# Legacy & Credits
redirectFrom:
  - "/old-url"
  - "/short-slug"
contributors:
  - Jacob Fahrnbach
  - ChatGPT
usedAI: true
originalPrompt: https://github.com/fahrnbach/one/discussions/4
source: md
canonical: https://fahrnbach.one/blog/art-app
---
```

---

## 📊 Metadata Reference Chart

| Datapoint        | Example                               | Description                                | FrontMatter | Database |
| ---------------- | ------------------------------------- | ------------------------------------------ | ----------- | -------- |
| `id`             | art-app                               | Stable post identifier                     | ✅           | ✅        |
| `title`          | "🎨 Case Study: Designing My Art App" | Title of the post                          | ✅           | ✅        |
| `description`    | "A practical comparison..."           | Short page description for SEO             | ✅           | ✅        |
| `slug`           | art-app                               | URL-safe slug                              | ✅           | ✅        |
| `slugPrefix`     | false                                 | Optional prefix                            | ✅           | ✅        |
| `created`        | 2025-06-02                            | Creation date                              | ✅           | ✅        |
| `edited`         | 2025-06-13                            | Last modified                              | ✅           | ✅        |
| `excerpt`        | "How I turned a..."                   | Summary paragraph                          | ✅           | ✅        |
| `summaryPoints`  | ["Why I rebuilt..."]                  | Bullet summary list                        | ✅           | ✅        |
| `cover`          | /assets/...                           | Image used in previews                     | ✅           | ✅        |
| `ogImageAlt`     | "An abstract image..."                | Alt text for OG images                     | ✅           | ✅        |
| `images`         | ["/a.png", "/b.png"]                  | Extra images                               | ✅           | ❌        |
| `languages`      | en                                    | Language code                              | ✅           | ✅        |
| `author`         | Jacob Fahrnbach                       | Main author name                           | ✅           | ✅        |
| `readingTime`    | 6                                     | Estimated reading time in minutes          | ✅           | ✅        |
| `tags`           | ["design"]                            | Topic tags                                 | ✅           | ✅ (rel)  |
| `categories`     | ["UX"]                                | Higher-level grouping                      | ✅           | ✅ (rel)  |
| `isSeries`       | true                                  | Marks if part of a series                  | ✅           | ✅        |
| `series`         | "Crafting Your Own Genie"             | Series name                                | ✅           | ✅        |
| `series_part`    | 2                                     | Part number in the series                  | ✅           | ✅        |
| `draft`          | true                                  | Unpublished toggle                         | ✅           | ✅        |
| `featured`       | true                                  | Highlight toggle                           | ✅           | ✅        |
| `dirty`          | false                                 | Unsynced local changes                     | ✅           | ✅        |
| `published`      | false                                 | Explicit visibility toggle                 | ✅           | ✅        |
| `visibility`     | public                                | Role-based access: public/internal/private | ✅           | ✅        |
| `status`         | published                             | Draft, scheduled, archived, etc.           | ✅           | ✅        |
| `scheduled`      | 2025-06-20T10:00:00Z                  | Publish later flag                         | ✅           | ✅        |
| `layout`         | default                               | Template selection                         | ✅           | ✅        |
| `index`          | true                                  | Search indexing toggle                     | ✅           | ✅        |
| `comments`       | true                                  | Enable or disable comments                 | ✅           | ✅        |
| `redirectFrom`   | ["/old-url"]                          | Legacy links                               | ✅           | ✅        |
| `contributors`   | ["Jacob", "GPT"]                      | List of helpers or editors                 | ✅           | ✅        |
| `usedAI`         | true                                  | Did GPT help?                              | ✅           | ✅        |
| `originalPrompt` | URL                                   | Where the post originated                  | ✅           | ✅        |
| `source`         | md                                    | md / discussion / external                 | ✅           | ✅        |
| `canonical`      | URL                                   | Canonical link for SEO                     | ✅           | ✅        |
| `authRequired`   | false                                 | Logged-in only flag                        | ✅           | ✅        |

---

## 🧠 Usage Tips

- Frontmatter drives **build-time behavior** (e.g. post previews, tag filters, layout options)
- Database fields enable **runtime querying, filtering, and search**
- Keeping both in sync ensures maximum flexibility
- If adding fields only needed client-side (like `images`), it's fine to omit from DB

---

## 📁 Project Tree Overview

```
.
├── README.md
├── TODO.md
├── package.json
├── posts
│   └── [*.md]
├── schema
│   ├── schema.sql
│   ├── FMSchema.md ← this file
│   └── zod/
├── util/
│   └── uploadPosts.js
└── yoga-blog-worker/
    └── yoga-blog-worker.js
```

---

Let me know if you'd like a web UI for editing this metadata directly ✨

