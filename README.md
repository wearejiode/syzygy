# Resume Worker – Dev Workflow

## CI / CD Status

| Workflow | Status |
|----------|--------|
| **PR Checks** | ![PR Checks](https://github.com/wearejiode/syzygy/actions/workflows/sesame-pr.yml/badge.svg?branch=main) |
| **Staging Deploy** | ![Staging Deploy](https://github.com/wearejiode/syzygy/actions/workflows/sesame-release-staging.yml/badge.svg?branch=main) |
| **Production Deploy** | ![Production Deploy](https://github.com/wearejiode/syzygy/actions/workflows/sesame-promote-prod.yml/badge.svg?branch=main) |

## Overview

This Cloudflare Worker serves the Resume app pages, providing HTML, CSS, JavaScript, and resume data stored in R2. It delivers a fast, serverless experience by dynamically rendering the resume content and assets from R2 storage.

---

## Build + Bundle

The Worker is built from several template files:

- `index.html` – The HTML scaffold for the resume app.
- `styles.css` – CSS styles for the resume pages.
- `client.js` – Client-side JavaScript for interactivity.
- `data.json` – Resume data stored in R2.

The build process is handled by the `scripts/build-resume.js` script, which compiles and bundles these assets into a single Worker script named `meta-worker.generated.js`. This file contains all the code and assets needed to deploy the Worker.

To build and bundle the Worker, run:

```bash
pnpm bundle-worker resume
```

This produces the deployable Worker script in the `dist/` directory.

---

## Development

Start the development server with:

```bash
pnpm dev:resume
```

This runs the Worker locally with live reload on file changes. The dev environment seeds `data.json` into a local R2 bucket to simulate production data.

Useful endpoints during development:

- `GET /__health` – Returns a 200 OK status to verify the Worker is running.
- `GET /__r2list` – Lists all keys currently stored in the local R2 bucket.
- `GET /__r2get?key=<key>` – Retrieves the contents of a specific key from R2.

Changes to templates or styles automatically reload the Worker so you can see updates immediately.

---

## CI Pipeline

- **Staging**: On pushes to the repository, the CI pipeline builds the Worker and deploys to the staging environment automatically.
- **Production**: Deployments to production are controlled via the "Promote to Prod" workflow to ensure safe releases.

---

## Deploy

To manually deploy the Worker:

1. Bundle the Worker script:

   ```bash
   pnpm bundle-worker resume
   ```

2. Deploy with Wrangler:

   ```bash
   wrangler deploy --env production
   ```

3. Push updated `data.json` and assets to R2 using the provided upload scripts or Wrangler commands.

---

## Notes & Gotchas

- The Worker’s **current working directory (CWD)** is the root of the monorepo during local development and CI runs.
- The `dist/` directory is disposable and overwritten on each build.
- The resume data model in `data.json` must conform to the expected schema; otherwise, rendering errors may occur.
- Static assets and images are referenced by their R2 keys and must be uploaded separately.

---

## Checklist

- [ ] Run `pnpm dev:resume` and verify the Worker starts without errors.
- [ ] Access `http://localhost:8787/__health` and confirm a 200 OK response.
- [ ] Access `http://localhost:8787/__r2list` and verify keys are listed.
- [ ] Modify `styles.css` and confirm the Worker reloads with updated styles.
- [ ] Run the manual deploy steps and verify the Worker is live in production.

---

## Assets

Images and static assets used by the Resume app are stored under the R2 prefix `resume-data/images/`. These assets are uploaded during CI deployments or manually via Wrangler. Ensure any new images are added to this prefix and uploaded to keep the app consistent.

---

🚀 Happy coding! If you run into issues, check the data model and asset paths first.
