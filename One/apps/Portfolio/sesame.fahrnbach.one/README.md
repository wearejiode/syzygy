# 🌱 sesame.fahrnbach.one

A magical microapp that generates personalized, Open Graph–enabled landing pages for outreach — all powered by a single JSON file and a serverless worker. ✨

Each slug like `/google` or `/openai` pulls from `data.json` to dynamically render a video, description, and a customizable link list with OG previews.

---

## 📁 Project Structure

```
Frontend/
  sesame.fahrnbach.one/
    ├── data.json                 # Main config file per slug
    ├── sesame-meta-worker/      # Cloudflare worker logic
      └── wrangler.toml
```

---

## 🧪 Local Dev

Run the worker locally if the preview `data.json` already exists:

```
npm run dev:sesame
```

If the preview file isn’t there yet, it will fall back to remote mode.

---

## 📤 Staging Preview Data

Push your updated `data.json` to the `sesame-data-preview` R2 bucket and run in remote dev mode:

```
npm run stage:sesame
```

---

## 🧾 Deploying to Production

_Deploys the Sesame worker with the latest R2 data._

```
npm run deploy:sesame
```

---

## 🔍 Features

- 🧞 Dynamic video, summary, and link grid per slug
- 🧠 JSON-driven config with fallback logic
- 🖼️ YouTube thumbnail previews + Open Graph tags
- 🎨 Responsive UI with graceful mobile support
- 🪄 Built-in riddle logic + Easter egg ready

---

## 🛠️ Useful Scripts

| Script          | Description                                           |
|-----------------|-------------------------------------------------------|
| `dev:sesame`    | Local worker dev (with fallback to remote)           |
| `stage:sesame`  | Upload preview JSON and launch remote dev            |
| `deploy:sesame` | Upload JSON + deploy sesame worker                |

---


## 🖼️ Updating Background Image

If you want to update the background image (like `Background.webp`), it may **need to be manually updated** in the Cloudflare dashboard — or uploaded using the following command:

```bash
npx wrangler r2 object put sesame-data/images/Background.webp --file Frontend/sesame.fahrnbach.one/images/Background.webp --remote --config Frontend/sesame.fahrnbach.one/sesame-meta-worker/wrangler.toml
```

Thumbnail previews are **AUTOMATICALLY** generated and handled by the worker.

## ✨ More Coming Soon

Planned future features include:
- Admin login + link editor
- Markdown-powered blurbs
- Custom thumbnails and themes

---

💬 Questions? Explore the [Devlog Index](https://github.com/fahrnbach/one/discussions/4) or visit [fahrnbach.one](https://fahrnbach.one) to see it all come together.