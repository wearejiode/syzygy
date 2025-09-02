# 🧞‍♂️ Genie Assistant

A magical riddle-locked AI chat assistant — ask it 3 questions and discover Jacob Fahrnbach's work... or fork it for your own.
![CI](https://github.com/fahrnbach/genie-assistant/actions/workflows/ci.yml/badge.svg)

## 🌟 Features

- Customizable frontend UI
- Riddle verification flow
- Uses OpenAI GPT-4o (or dummy fallback)
- Built with vanilla JS + optional Vite demo
- Deploy anywhere or integrate into your own site

---

## 🚀 Quick Start (Demo)

### 1. Clone & Install

````bash
git clone https://github.com/yourname/genie-assistant.git
cd genie-assistant
npm install


## 🔍 Why We Copy index.html for Preview

When building this project as a library using Vite, the `build` step does **not** include the demo HTML file by default. This is intentional — Vite assumes you're publishing a JS library, not a website.

However, to preview the assistant *as it would look in production*, we copy the `demo/index.html` file into the `dist/` folder after build using this command:

```bash
shx cp demo/index.html dist/index.html'

## 🎯 Pro tip: vite preview is like a mini production server — it shows you exactly what your site will look like after deploy.

Made with ✨ by Jacob Fahrnbach
````
