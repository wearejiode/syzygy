# 📄 resume.fahrnbach.one

This Cloudflare Worker serves personalized resumes by slug, with Open Graph meta preview support and optional fallback behavior.

It integrates with R2 for file storage and supports dynamic PDF routing for URLs like:

```
https://resume.fahrnbach.one/google
https://resume.fahrnbach.one/openai
https://resume.fahrnbach.one/resume/default
```

## 📦 Project Structure

- `resumes/` — Folder containing `.pdf` files (e.g., `openai.pdf`, `default.pdf`)
- `images/` — Folder containing the preview image used in meta tags
- `resume-meta-worker/` — Cloudflare Worker logic
- `scripts/upload-resumes.js` — Script to upload all resumes to R2

---

## 🚀 Deployment Guide

All commands should be run from the **project root**.

### 🔁 Upload or Update Resume PDFs

Uploads all resumes in the `resumes/` folder to the correct R2 bucket:

```bash
npm run upload:resume
```

---

### 🖼️ Upload or Update Preview Image

Uploads the default Open Graph preview image:
### default-preview.webp & default-preview.png
```
wrangler r2 object put resume-data/hotlink-ok/default-preview.webp \
  --file Frontend/resume.fahrnbach.one/images/default-preview.webp \
  --remote \
  --config Frontend/resume.fahrnbach.one/resume-meta-worker/wrangler.toml
```
```
wrangler r2 object put resume-data/images/hotlink-ok/default-preview.png \
  --file Frontend/resume.fahrnbach.one/images/default-preview.png \
  --remote \
  --config Frontend/resume.fahrnbach.one/resume-meta-worker/wrangler.toml
```

---

### 🌐 Deploy the Resume Worker

Deploys the latest worker to Cloudflare:

```bash
npm run deploy:resume
```

---

## ✨ Features

- 📄 Dynamic resume loading based on slug
- 📦 R2-backed asset storage for PDFs and images
- 🔗 OG metadata for easy sharing on social platforms
- 📁 Graceful fallback for missing slugs
- 🎯 Simple config and low-latency CDN delivery

## 🖼️ Updating Background Image

If you want to update the Open Graph Image (like `default-preview.webp`), it may **need to be manually updated** in the Cloudflare dashboard — or uploaded using the following command:

```bash
npx wrangler r2 object put resume-data/images/default-preview.webp --file Frontend/resume.fahrnbach.one/images/default-preview.webp --remote --config Frontend/resume.fahrnbach.one/resume-meta-worker/wrangler.toml
```

Thumbnail previews are **AUTOMATICALLY** generated and handled by the worker.

---
## 🛠️ Useful Scripts

| Script          | Description                                           |
|-----------------|-------------------------------------------------------|
| `upload:resume` | Bulk Upload Resumes from /resume to R2        |
| `deploy:resume` | Bulk Upload Resume + deploy resume worker               |

---

## 🔮 Future Improvements

Add a smart check feature to only upload a resume if it has changed

---

For questions or debugging tips, check out the [Devlog Index](https://github.com/fahrnbach/one/discussions/4) or explore [fahrnbach.one](https://fahrnbach.one) for more projects.
