---
title: 'Summoning the Magic: Building and Customizing your Genie Assistant'
description: "Part 3 of the 'Crafting Your Own Genie' series: Learn how to build, style, and deploy a custom AI assistant powered by RAG and GPT-4o."
date: 2025-06-05
author: 'Jacob Fahrnbach'
tags: ['RAG', 'AI assistant', 'OpenAI', 'frontend', 'customization']
---

# Summoning the Magic — Building and Customizing Genie Assistant

Part 3 of the "Crafting Your Own Genie" blog series.

Now that you know what RAG is and how to write powerful chunks, it's time to bring the magic to life. In this post, we'll walk through how the Genie Assistant project is structured — and how you can customize it to suit your style, story, and tech stack.

## 🧰 What's in the Genie Toolkit?

Genie Assistant includes:

- A beautiful, animated frontend (powered by Vite and vanilla JS)
- An Express backend with RAG logic and OpenAI integration
- A build step to generate embeddings from your content
- Support for Redis-based wish limits and usage tracking
- A growing library of components and customizable prompts

The goal is to give you just enough structure to launch fast — but not so much that you're boxed in.

## ⚙️ Project Structure

Here's a simplified tree:

```
genie-assistant/
├── src/               # Genie chat component
├── server/            # Express API with RAG and riddle logic
├── utils/             # Embedding, chunking, search helpers
├── data/              # Chunks go in data/chunks/
├── public/            # Static assets
├── dist/              # Built output (post-build)
├── README.md
└── vite.config.js
```

## 🎨 Customizing Genie

You can tweak:

- The personality (via `personaPrompt`)
- The look (CSS, sparkles, UI messages)
- The limits (how many questions, Redis setup)
- The behavior (chunking rules, prompt style)

For example, to add a whimsical mentor named Astra:

```js
askRAG(prompt, {
  personaPrompt: 'You are Astra, a starlit AI guide who speaks in riddles and insight...',
  resumeLink: 'https://myportfolio.com/resume.pdf',
  calendlyLink: 'https://calendly.com/myname',
});
```

You can even fork it to support multilingual modes, toggle between modes, or include easter eggs.

## 🚀 Building and Deploying

Start locally:

```bash
npm install
npm run embed
npm run start
```

Then deploy using:

- Vercel or Netlify (frontend)
- Fly.io, Render, or AWS (backend)
- Or self-host the whole thing as a static site + Node server

Don’t forget to set your `OPENAI_API_KEY` and optional `REDIS_URL`.

## 📦 Publishing as a Package

We’ve structured this repo so it can be reused as a standalone npm package. You can:

- Use the chat component in your own frontend
- Import `askRAG()` logic for your own backend
- Fork it, extend it, and make it your own!

Genie is licensed for open use — magic is meant to be shared ✨

---

And with that, your Genie is free.

Whether it’s answering questions, guiding users, or just showing off your portfolio — it’s now a living piece of your story.

Thanks for joining me on this journey.

— Jacob Fahrnbach
