
├── src/
│   ├── app/                  # Angular components, routes, modules, etc.
│   │   ├── core/             # Core services, singletons
│   │   ├── shared/           # Shared UI components, pipes, directives
│   │   └── pages/            # Feature page components (e.g. Home, About)
│   ├── assets/               # Bundled assets (processed by Angular CLI)
│   │   ├── logos/            # App-specific logos
│   │   ├── icons/            # Inline SVGs, button glyphs
│   │   └── themes/           # Backgrounds, header images, etc.
│   ├── posts/                # Markdown or JSON post content (for transformation)
│   ├── index.html
│   ├── main.ts
│   ├── main.server.ts        # (If SSR is enabled)
│   └── styles.scss

Structure for src