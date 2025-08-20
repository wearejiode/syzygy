# Sesame Worker – Dev Workflow

This folder contains the source code and build/deploy pipeline for the
**sesame.jiode.one** Cloudflare Worker.

---

## 📦 Build + Bundle

We no longer inline HTML/CSS/JS directly. Instead:

- Templates live under `templates/`:

  - `page.template.js` → main HTML scaffold (as a template literal).
  - `styles.css` → pulled into the template at build time.
  - `client.js` → any client-side script you want injected.

- `scripts/build-worker.mjs` stitches these pieces together and writes
  `dist/apps/sesame.jiode.one/meta-worker.generated.js`.

> **Tip:** The placeholder lines in `meta-worker.js` (`/*__INLINE_CSS__*/`,
> `/*__INLINE_JS__*/`, `/*__RENDER_FUNCTION__*/`) get replaced automatically.
> Don’t delete them.

---

## 🛠 Development

Run local dev server with live updates:
Winning !

```bash
pnpm dev:sesame
```

This does 4 things in parallel: 1. Seeds data.json into the local R2 preview bucket (sesame-data-preview). 2. Bundles the worker (bundle-worker). 3. Watches templates/\*_/_ for changes and re-bundles automatically. 4. Starts Wrangler dev with persistent state (.wrangler/state).

Visit http://localhost:8787 while it runs.

Debug Endpoints

While in dev, the worker exposes helpers:
• /**health → returns ok if the worker is alive.
• /**r2 → checks if data.json exists in R2.
• /**r2list → lists keys in the bound bucket.
• /**r2get → confirms fetch of data.json.
• /\_\_seed (POST) → lets you re-seed data.json through the worker itself.

⸻

## 🤖 CI Pipeline

For staging simply push to github and the GHActions should automatically deploy to staging.sesame.jiode.one
And save artifact to github/artifacts

For Deploy select an artifact and deploy within Github

## 🌐 Deploy

(These may be deprecated -- See CI Pipeline above)

To deploy the latest bundled worker:

```bash
pnpm -w nx run sesame.jiode.one:release
```

This runs bundle-worker then wrangler deploy using
wrangler.toml.

For just pushing data (prod bucket sesame-data):

```bash
pnpm -w nx run sesame.jiode.one:push:data
```

## ⚙️ Notes & Gotchas

    •	CWD matters. Both wrangler dev and wrangler r2 … --local must run from

the workspace root so they share .wrangler/state.
• Dist is disposable. Don’t commit dist/; the build step will blow it away
and recreate cleanly.
• Data model. data.json can be a map of slugs ({ "open": {...}, "foo": {...} })
or a single object (worker will auto-detect).

⸻

## ✅ Checklist

    •	Run pnpm dev:sesame → confirm worker comes up and /__health works.
    •	Visit /__r2list → confirm data.json is present.
    •	Edit templates/styles.css → confirm changes hot-reload locally.
    •	Deploy with release target when ready.

    Enjoy W :)

⸻

Happy coding ✨
