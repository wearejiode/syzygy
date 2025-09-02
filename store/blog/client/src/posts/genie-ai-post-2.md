---
title: 'Part 2: Open Sesame: Genie in Training; Writing Powerful Chunks for RAG'
description: "Part 2 of the 'Crafting Your Own Genie' blog series. Learn how to structure content chunks that help your AI assistant answer with precision and personality."
author: 'Jacob Fahrnbach'
date: 2025-06-05
tags: ['RAG', 'AI Assistant', 'Prompt Engineering', 'LangChain', 'Embeddings']
series: 'Crafting Your Own Genie'
series_part: 2
---

# Teaching the Genie — Writing Powerful Chunks for RAG

Part 2 of the "Crafting Your Own Genie" blog series.

Once your Genie is awakened, it needs a brain — and in Retrieval-Augmented Generation (RAG), that means giving it the right _chunks_ of information to work with.

This guide will show you how to create smart, searchable knowledge chunks that help your assistant respond with clarity, confidence, and personality.

## 🧩 What Is a Chunk?

A “chunk” is a small passage of text (typically under 300 tokens) that represents a unit of knowledge. Think of them like memory cards — the assistant pulls the most relevant ones in real-time to craft its answer.

These come from your `.md`, `.txt`, or `.html` files in the `data/chunks/` folder. They’re parsed, embedded into vectors, and stored in a JSON database.

## ✍️ Best Practices for Writing Chunks

✅ **Keep it short** — Stick to 1-2 paragraphs per chunk.

✅ **One idea per chunk** — This improves search precision.

✅ **Plain language wins** — Avoid excessive formatting or code.

✅ **Use headings** — `## Project Foo` makes things easier to find.

✅ **Test iteratively** — Ask your Genie sample questions and revise based on what’s retrieved.

## 📁 Example Chunk File

Here’s a simple `.md` chunk file:

```md
## Portfolio Overview

Jacob Fahrnbach is a self-taught full-stack developer and designer. His portfolio includes web apps, UI/UX design, and creative tools like Genie Assistant.

## Notable Projects

- [Genie Assistant](https://github.com/fahrnbach/genie-assistant)
- [Art App](https://art.fahrnbach.one)
```

This would be split into two chunks, each embeddable and searchable.

## 🛠️ Embedding Your Chunks

Once you’ve written or updated your chunk files, run:

```bash
npm run embed
```

This regenerates your `data/embeddings/data.json` and updates the timestamp.

Congrats — you’ve just taught your Genie something new 🧞‍♂️

---

In Part 3 → Deploying the Magic, we’ll learn how to host, preview, and share your Genie with the world.

Until then: keep your knowledge well-structured and your wishes precise.

— Jacob Fahrnbach
