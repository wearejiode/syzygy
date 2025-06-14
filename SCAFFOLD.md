>What is a good top level folder structure?

I’m finding that a lot of the apps I’ve got in my front end folder actually contain some serverless functions too!

Are they still considered frontend? Or should I create an Apps or a Subdomains folder?

What’s the convention here?

Great question — organizing your project at the top-level becomes especially important as you scale. Since you’re managing multiple apps, subdomains, and serverless functions, here’s a breakdown of conventional patterns and a suggested strategy tailored to your setup:

🧱 Recommended Structure with Frontend + Backend
/
├── apps/                            # All deployable units (frontend + backend)
│   ├── art-app-frontend/            # Angular or static frontend
│   ├── art-app-backend/             # Express/Nest/Fastify/etc.
│   ├── blog.fahrnbach.one/
│   ├── sesame.fahrnbach.one/
│   └── fahrnbach.one/
│
├── packages/                        # Shared libs, types, components
│   ├── genie-assistant/
│   ├── shared-ui/
│   ├── db-client/                   # (e.g. Prisma client or Supabase wrapper)
│   └── validation-schemas/
│
├── scripts/                         # One-off utility scripts
│   └── seed-db.ts
│
├── docs/                            # Internal documentation or architecture notes
│
├── public/                          # Global assets
│
├── .github/                         # GitHub workflows, templates
│
├── package.json                     # Can include top-level dev dependencies
└── tsconfig.base.json

Why Use /apps Instead of /frontend
	•	Clarity: Not everything is purely frontend anymore — some folders have metadata workers, Cloudflare logic, etc.
	•	Scalability: apps/ scales naturally if you add a marketing site, API gateway, admin panel, etc.
	•	Convention: Popular monorepos (e.g., Nx, Turborepo) use apps/ and packages/ as defaults.

  And adopt the apps/ + packages/ model. It communicates professionalism, separates concerns cleanly, and will help you (and recruiters!) understand the architecture at a glance.

  If you’re using tooling like Nx or Turborepo, you can add tags or labels:

  ```
  {
  "name": "art-app-backend",
  "tags": ["type:backend", "scope:art-app"]
}
  ```

  Helps organize large monorepos with linting, deployment boundaries, etc.