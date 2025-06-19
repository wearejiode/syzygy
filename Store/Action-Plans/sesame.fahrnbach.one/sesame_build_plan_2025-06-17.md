# 🚀 Sesame 2.0 Architecture & Build Plan
> A scalable, CDN-aware platform for building and serving personalized microsites — using Bun, Cloudflare Workers, R2, and a database-backed versioning model.

## 🔧 Project Goals (Context Recap)
You're building a web app where:
- Users can log in and build their own **custom microsite**
- Each site is served at:  
  `https://sesame.fahrnbach.one/username`
- Microsites are generated as **static HTML**, optimized for:
  - ✅ SEO
  - ✅ Speed (CDN-cached)
  - ✅ Scalability
- Users can **edit content** repeatedly, but we want to:
  - Avoid rebuilding all sites at once
  - Avoid invalidating the entire CDN cache
  - Keep infra lean but scalable

## 📦 Infrastructure Overview

### 🧠 App Responsibilities
| Layer | Responsibility |
|-------|----------------|
| 🧑‍🚀 Frontend (User UI) | Content editing, profile view, settings |
| ⚙️ Bun Backend API | Auth, queueing updates, building HTML, writing to R2 |
| 📂 R2 Storage | Host static `index.v=hash.html` per user |
| 🌍 Cloudflare Worker | Serve latest version of each user’s microsite at clean URL |
| 🗃️ Database (e.g., SQLite/Postgres) | Store user data + version hashes |
| 🪄 Optional Queue | Throttle updates or schedule rebuilds to avoid spam |

## ✅ Phase 1: Scaffold Project Structure
```plaintext
sesame-platform/
├── apps/
│   ├── frontend/         → User-facing UI (Angular or Astro or Vite)
│   ├── builder-api/      → Bun app server (build/update endpoints)
│   └── edge-router/      → Cloudflare Worker
├── packages/
│   ├── builder-lib/      → Site generation logic (shared by queue + API)
│   └── types/            → Shared TS types (User, SiteContent, etc.)
├── db/
│   └── schema.sql        → Users, Builds, Slugs, Versions
├── scripts/
│   └── upload-to-r2.ts   → Helper for writing HTML to R2
```

## 🛠️ Phase 2: API Endpoints in Bun

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/update/:slug` | POST | Accepts user content and queues a rebuild |
| `/api/build/:slug` | POST | Builds HTML, writes to R2, updates DB |
| `/api/invalidate/:slug` | POST | (optional) Invalidate cache via API or update version |
| `/api/status/:slug` | GET | Show last updated time/hash |
| `/api/auth/login` | POST | User login/token issuance |

### Highlights:
- Content updates get debounced/throttled
- Content stored in DB (JSON or structured fields)
- Each user has a `versionHash` (e.g., SHA256 of latest content)

## 🧠 Phase 3: Microsite Build Logic (Builder-lib)

### Build Flow (Bun)
```ts
function buildMicrosite(slug: string, content: UserContent): string {
  const html = renderTemplate(content);           // SSR to HTML
  const hash = sha256(html);                      // Version hash
  const path = `microsites/${slug}/index.v=${hash}.html`;
  writeToDisk(path, html);
  uploadToR2(path, html);
  updateVersionInDB(slug, hash);
}
```

### Advantages:
- Immutable builds
- Version-controlled
- Easy rollback/fallback
- Cache-busting without invalidation

## 🌐 Phase 4: CDN-Aware Edge Router (Cloudflare Worker)

### Route: `/username`
- Lookup `slug → versionHash` in DB or KV
- Fetch file from R2:
```ts
const version = await getVersion(slug);
const obj = await env.R2.get(`microsites/${slug}/index.v=${version}.html`);
return new Response(obj.body, { headers: { 'Content-Type': 'text/html' } });
```

### ✨ SEO-safe:
- Responds from `/username`, no version in URL
- Canonical tags included in HTML
- Cache-control:
```http
Cache-Control: max-age=300, stale-while-revalidate=300
```

## 📅 Phase 5: Throttling & Debounce Strategy

### Why?
- Prevent abuse (e.g. 50 updates/min)
- Optimize compute cost and R2 PUT frequency

### How:
- Track update count per user per hour
- Debounce rebuilds using a short delay window (e.g., 15s – 5min)
- Optional: Use a message queue to batch build jobs

### UX:
> “⏳ Your site will update shortly. Last update: 2 min ago.”

## 🧼 Phase 6: Versioning vs Invalidation

| Method | Pros | Cons |
|--------|------|------|
| `?v=hash` / filename | ✅ Easy to cache, SEO-safe with routing | ❌ Requires DB + smarter fetcher |
| Purge API | ✅ No routing logic needed | ❌ Very expensive at scale (1000s users) |

✅ Use **versioned filenames in R2**  
✅ Serve via **clean routes** using Workers  
✅ Avoid **purge_cache** entirely

## 🔁 Full Flow Diagram
```
[User Browser] 
     ↓ Request: /username
[Cloudflare Worker] 
     ↓ DB Lookup: slug → version
     ↓ R2 Fetch: /username/index.v=abcd1234.html
     ↓ Serve HTML to user
```

## 📊 DB Schema (simplified)
```sql
Users (id, username, email, password_hash)
Microsites (user_id, content_json, version_hash, updated_at)
```

## 🔋 Optional Future Enhancements

| Feature | Notes |
|--------|-------|
| Suggested content recommendations | Based on tags/interactions |
| Scheduled auto-updates or publishing | User selects update time |
| Site export (ZIP of HTML) | Offer downloadable static site |
| Preview / staging builds | Build but don’t publish |
| Admin dashboard | Track builds, users, errors |
| Editable themes | Theme selection per microsite |
| OAuth integration | Social login support |

## ✅ Immediate Next Actions

### Phase 1: Infra Setup
- [ ] Initialize Bun server + routes
- [ ] Set up R2 bucket + credentials
- [ ] Deploy base Cloudflare Worker

### Phase 2: Build Flow
- [ ] Create `buildMicrosite(slug, content)` logic
- [ ] Implement R2 upload + version tracking
- [ ] Create Worker logic for version resolution and HTML serving

### Phase 3: Dev Experience
- [ ] Add queue/debounce logic to API
- [ ] Add status and logging endpoint
- [ ] UX: Add “Site updates pending” notice on frontend
