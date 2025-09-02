---
title: '🌀 Case Study: Building This Blog (Yes, This One)'
date: 2025-06-04
slug: blog-monorepo
excerpt: 'A meta look into how and why I built this very blog, including Angular routing, Markdown rendering, frontmatter parsing, and the importance of documenting personal work.'
image: /assets/thumbs/blog.png
tags: [angular, blog, markdown, meta, case-study, documentation]
---

# 🌀 Case Study: Building This Blog (Yes, This One)

<br/>

![Homepage Screenshot](/assets/screenshots/blog-screenshot.png)

## 🤔 Overview

Welcome to a **case study about the blog you’re reading... on this blog**. That’s right — this post is a bit **meta**, but I think there’s something valuable in reflecting on the tools, challenges, and decisions that made this possible.

This site isn’t just a way to share what I’ve built — it’s a project in and of itself, complete with dynamic routing, Markdown parsing, frontmatter extraction, and Angular-powered rendering. It’s lightweight, self-contained, and easy to expand.

## 🧠 Goals

- 📝 Build a blog engine from scratch with Angular
- 🧹 Keep the Markdown clean and simple, but support frontmatter, images, and styling
- ⚡️ Make posts load dynamically with async routing and fallback states
- 💬 Document my work in a way that’s readable, visually nice, and future-friendly

## 🧰 Tech Stack

- **Framework**: Angular
- **Markdown Parsing**: `marked`
- **Frontmatter Parsing**: `frontmatter`
- **Routing**: Angular Router with dynamic slug support
- **Deployment**: Cloudflare Pages
- **Styling**: Global CSS with Markdown overrides

## 🔄 Process

The blog system loads `.md` files from the `assets/posts/` directory and parses them using `frontmatter` to extract metadata like the title, date, excerpt, tags, and thumbnail. The remaining Markdown body is rendered to HTML using `marked`.

I inject the HTML into the component using Angular’s `[innerHTML]`, and ensure global styles make the post content look clean and responsive.

I also added a mechanism to dynamically update the page title based on the frontmatter — so each blog post gets proper metadata.

## 🎨 Styling

Because Angular component styles don’t apply to dynamically injected HTML, I had to rely on **global styles** for the blog content. This included:

- `img { max-width: 100%; height: auto; }`
- Clean typography
- Margins and spacing for headers, code blocks, and paragraphs

This keeps the layout looking nice across devices, without needing a CSS framework.

## 🧩 Challenges

- Parsing and rendering Markdown securely and consistently
- Ensuring image paths worked from Markdown relative to `assets/`
- Making the design minimal but not boring
- Getting Angular to play nicely with dynamic routing and Markdown content
- Fighting the occasional `ts(2345)` type error 😅

## 📚 Why Write Blog Posts?

This blog isn’t just for show. Writing these case studies helps me:

- Reflect on the technical and creative process
- Document my decisions for future me (and others)
- Make my work more transparent, approachable, and searchable
- Share the deeper thinking behind the code

In a world flooded with quick demos and polished portfolios, I wanted to **slow down and show the process**. That’s what this blog is for — and yes, building it was part of that journey.

## ✅ Outcome

This blog is small, fast, and fully under my control — no CMS, no external dependencies, just clean Angular code and Markdown. I can now publish new posts in seconds, and each post doubles as a personal reflection and a showcase of problem-solving.

It’s the platform for the rest of the portfolio — and now, one more portfolio project of its own.

## 🔗 Links

- 🔗 [Live Blog](https://blog.fahrnbach.one)
- 💻 [Source Code](https://github.com/fahrnbach/blog-monorepo)
- 😼 [Github](https://github.com/fahrnbach)

---

### 🛠️ Looking Ahead

While this Angular-based blog system works beautifully for now, I’m also developing a custom **Python-powered CMS** to manage content more flexibly in the future. The goal is to support dynamic post creation, editing, and tagging — with a lightweight API backend and Markdown-based content management.

Stay tuned for a future post diving into that build process!

> Let’s stack these like dominoes — one push and they all fall in line. 🧩
