## 📦 Day 6: Moving Day! 🛠️

```
⚫️ Retrospective: “Boxes packed, schemas stacked, and sanity mostly intact!”
```
### 🧠 Why Now?
As our projects grew, so did the complexity. Multiple folders, untyped scripts, and duplicated schemas were slowing us down. We needed a foundation strong enough to support real features with shared tooling and a future-proof architecture. We needed something more.

### So, what did we do?
>### We packed up, and **moved into a monorepo**.

### 🧳 From Clutter to Craftsmanship

Until now, our setup was like a tangle of half-labeled moving boxes scattered across dimly lit basements — each holding something useful, but hard to find or reuse.

>Now?  
We’ve moved into a **well-lit engineering workshop**. Tools are hung neatly. Stations are labeled. Everything lives under one structured roof, wired together by Nx and powered by pnpm.

It’s not just cleaner — it’s productive.

### 🧱 New Architecture: From Many to Monorepo

We consolidated our standalone apps and folders into a unified Nx monorepo — a major step forward in long-term maintainability and developer joy.

**Before:**
```
/blog
/portfolio
/api
/frontend
```

**After:**
```
/apps
  ├─ blog
  ├─ genie-assistant
  └─ admin-ui
/libs
  ├─ blog-schemas
  ├─ genie-core
  └─ ui
```

This unlocks:
- Shared validation logic and TS types across apps
- One-command builds, tests, and formatting
- 🚀 Better scalability and onboarding
- Cleaner mental models for architecture

**Bonus:**  
We **locked in the frontmatter schema** inside `libs/blog-schemas` — our new single source of truth. This means:
- Every Markdown post is now validated
- The CMS and GraphQL API will *automatically know* what fields to expect
- Future WYSIWYG editors can generate forms directly from schema 💡

---

### ⚡ Why `pnpm` > `npm` for Monorepos?

We switched to [`pnpm`](https://pnpm.io) — and haven’t looked back.

Compared to `npm`, `pnpm`:
- Uses a content-addressable cache for blazing-fast installs
- Saves disk space (no more duplicate `node_modules`)
- Handles monorepos with precision and speed
- Speeds up CI/CD and local builds dramatically

`pnpm` + `Nx` = smooth, scalable development workflows 🧹

---
### ✅ Summary

We:
- Set up an Nx-powered monorepo with `apps/` + `libs/`
- Installed `pnpm` for smarter, leaner dependency management
- Modularized and versioned our dotfiles
- Locked in a frontmatter schema for posts, CMS, and GraphQL syncing
- Cleaned out legacy structures to make room for real features

It might’ve felt like two steps back to take one forward — but the foundation is *rock solid*.

---

### 💡 Lessons Learned

- Colocating feels nice — but sharing feels smarter  
- Nx + pnpm = modern dev joy  
- Zod scales beautifully when split into libs

---

### 🛠️ Future Improvements

- Add build + lint targets to `blog-schemas`
- Explore DB schema → Zod auto-codegen
- Generate typed GraphQL bindings with `@graphql-codegen`

---

## BONUS
### 🗃️ What’s a Dotfile, and Why Should You Care?

As a bonus detour, we took a deep dive into dotfile land 🏝️.

Dotfiles are the hidden config files (`.zshrc`, `.vimrc`, `.gitconfig`, etc.) that define your dev setup. They’re your **developer blueprint** — and when managed well, they save hours of setup time.

We modularized everything:
- ✅ `.aliases.sh`, `.exports.sh`, `.functions.sh` — split and clean
- ✅ Safe `.gitignore` to avoid committing auth secrets
- ✅ `bootstrap.sh` and `mac-setup.sh` for quick reboots
- ✅ iTerm2 themes, VSCode prefs, and keyboard configs — all saved

Now, provisioning a new machine is as easy as `git clone && ./bootstrap.sh`.  
Your future self will thank you.

✨ Bonus: Stay tuned for our next post on **custom keyboard shortcuts** — a full power user rundown of how to save keystrokes and unlock productivity.

Read the full dotfiles post → [blog.fahrnbach.one/reboot-ready](https://blog.fahrnbach.one/reboot-ready)

---

> 🎉 Progress might’ve felt slow at moments, but solid foundations are worth it. This monorepo is our launchpad — and we’re ready to fly.

✨ Curious how it all comes together?  
Explore the [Devlog Index](https://github.com/fahrnbach/one/discussions/4)  
or visit the full [portfolio site](https://fahrnbach.one)

**Tags:** `#cloudflare` `#serverless` `#graphql` `#yoga` `#zod` `#open-graph` `#devlog`  
🎧 **Coding Fuel:** [Poranguí & Liquid Bloom](https://www.youtube.com/watch?v=C3kMfuSB9eM)  
📅 *June 14 2025*