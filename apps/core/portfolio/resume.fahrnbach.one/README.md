# Resume Worker – Dev Workflow

## 🚀 Overview

This Cloudflare Worker serves the Resume app pages by delivering HTML, CSS, JavaScript, and data stored in R2. It dynamically responds to requests for the resume application, providing a performant and scalable front-end experience backed by R2 object storage.

## 🛠 Build + Bundle

The worker is built using a set of templates and static assets:

- **Templates**:  
  - `index.html` — The main HTML scaffold for the resume app  
  - `styles.css` — CSS styles for the resume pages  
  - `client.js` — Client-side JavaScript for interactivity and data fetching  

- **Build Script**:  
  Running the build script processes these templates, bundles the client JS, and generates the worker script.

- **Worker Output**:  
  The final bundled worker script is output as `meta-worker.generated.js` in the `dist` directory, ready for deployment.

## 💻 Development

To start development:

```bash
pnpm dev:resume
```

This command launches a local development server with live reload support. Changes to templates, styles, or client code update the served pages instantly.

### Local R2 Seeding

During development, the local R2 storage is seeded with `data.json` to simulate production data. This allows testing of data-driven features without deploying.

### Useful Endpoints

- `GET /__health` — Health check endpoint for readiness  
- `GET /__r2list` — Lists objects currently in local R2 storage  
- `GET /__r2get?key=<object-key>` — Retrieves the content of a specific R2 object  

These endpoints assist in debugging and verifying the local R2 environment.

## ⚙️ CI Pipeline

- **Staging Deployments**  
  Automatically triggered on pushes to staging branches. The pipeline builds the worker, bundles assets, and deploys to the staging environment using Wrangler.

- **Production Deployments**  
  Managed through a manual "Promote to Prod" workflow that deploys stable releases to production environments.

## 📦 Deploy

Manual deployment steps:

1. Bundle the worker:

   ```bash
   pnpm bundle-worker
   ```

2. Deploy with Wrangler:

   ```bash
   wrangler deploy --env production
   ```

3. Push or sync updated data and assets to R2 as needed.

## ⚠️ Notes & Gotchas

- **Current Working Directory (CWD)**  
  Ensure commands are run from the root of the resume worker directory to avoid path issues.

- **Disposable `dist` Directory**  
  The `dist` directory is a build artifact and can be safely deleted or regenerated.

- **Data Model**  
  The resume data model is defined in `data.json`. Keep it in sync with client expectations to avoid runtime errors.

## ✅ Checklist

- [ ] Start dev server with `pnpm dev:resume` and verify no errors  
- [ ] Confirm `GET /__health` returns a successful response  
- [ ] Use `GET /__r2list` to verify local R2 objects are seeded  
- [ ] Modify `styles.css` and verify live reload updates the page  
- [ ] Run full build and deploy to staging environment without errors  

## 🖼 Assets

Static assets such as images are stored under the R2 prefix `resume-data/images/`. These assets are uploaded during CI or manually via Wrangler commands to ensure availability in production.

---

Happy coding! 🚀
