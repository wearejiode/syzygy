# Resume Worker – Dev Workflow

This Worker serves the Resume app pages by delivering HTML, CSS, and JS assets along with data stored in R2.

---

## 📦 Build + Bundle

We no longer inline HTML/CSS/JS directly. Instead:

- Templates live under `templates/`:

  - `page.template.js` → main HTML scaffold (as a template literal).
  - `styles.css` → pulled into the template at build time.
  - `client.js` → any client-side script you want injected.

- `scripts/build-worker.mjs` stitches these pieces together and writes
  `dist/apps/resume.fahrnbach.one/meta-worker.generated.js`.

> **Tip:** The placeholder lines in `meta-worker.js` (`/*__INLINE_CSS__*/`,
> `/*__INLINE_JS__*/`, `/*__RENDER_FUNCTION__*/`) get replaced automatically.
> Don’t delete them.

---

## 🛠 Development

Run local dev server with live updates:

1. Seed data.json into the local R2 preview bucket (`resume-data-preview`).
2. Bundle the worker (`bundle-worker`).
3. Watch `templates/*` for changes and re-bundle automatically.
4. Start Wrangler dev with persistent state (`.wrangler/state`).

Run the following command:

```bash
pnpm dev:resume
```

This will start all the above processes in parallel.

Visit http://localhost:8787 while it runs.

### Debug Endpoints

While in dev, the worker exposes helpers:

- `/__health` → returns ok if the worker is alive.
- `/__r2` → checks if `data.json` exists in R2.
- `/__r2list` → lists keys in the bound bucket.
- `/__r2get` → confirms fetch of `data.json`.
- `/__seed` (POST) → lets you re-seed `data.json` through the worker itself.

---

## 🤖 CI Pipeline

- For **staging**, simply push to GitHub and the GitHub Actions will automatically deploy to `staging.resume.fahrnbach.one` and save artifacts to GitHub artifacts.
- For **production**, use the "Promote to Prod" workflow within GitHub to deploy from saved artifacts.

---

## 🌐 Deploy

(These may be deprecated — see CI Pipeline above)

To deploy the latest bundled worker:

```bash
pnpm -w nx run resume.fahrnbach.one:release
```

This runs `bundle-worker` then `wrangler deploy` using `wrangler.toml`.

For just pushing data (prod bucket `resume-data`):

```bash
pnpm -w nx run resume.fahrnbach.one:push:data
```

---

## ⚙️ Notes & Gotchas

- CWD matters. Both `wrangler dev` and `wrangler r2 … --local` must run from  
  the workspace root so they share `.wrangler/state`.
- Dist is disposable. Don’t commit `dist/`; the build step will blow it away  
  and recreate cleanly.
- Data model. `data.json` can be a map of slugs (`{ "open": {...}, "foo": {...} }`)  
  or a single object (worker will auto-detect).

---

## ✅ Checklist

- Run `pnpm dev:resume` → confirm worker comes up and `/__health` works.
- Visit `/__r2list` → confirm `data.json` is present.
- Edit `templates/styles.css` → confirm changes hot-reload locally.
- Deploy with release target when ready.

Code 4 times as fast in half the time!

---

## 📁 Assets

Images and other static assets are stored in R2 under the prefix `resume-data/images/`.  
These must be uploaded either via the CI pipeline or manually using Wrangler commands.  

Happy coding ✨
