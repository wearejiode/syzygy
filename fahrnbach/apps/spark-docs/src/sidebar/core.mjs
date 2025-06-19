// --- 🚀 Core Systems ---
export const coreSidebar = {
  label: '🚀 Core Systems',
  collapsed: false,
  items: [
    { label: 'Core Overview', link: '/core/overview/overview' },
    {
      label: 'Blog',
      items: [
        { label: 'Design System', link: '/core/blog/blog-design' },
        { label: 'API Planning', link: '/core/blog/blog-apis' },
        {
          label: 'Components',
          items: [
            { label: 'Hot Posts Module', link: '/core/blog/blog-components/hot-posts' },
          ],
        },
      ],
    },
    {
      label: 'Sesame',
      items: [
        { label: 'Overview', link: '/core/sesame/overview' },
        { label: 'Pitch Pages', link: '/core/sesame/pitch-pages' },
        { label: 'Meta Tags Previews', link: '/core/sesame/meta-tags' },
        { label: 'Admin Dashboard', link: '/core/sesame/admin-dash' },
      ],
    },
    {
      label: 'Nexus',
      items: [
        { label: 'Global Layout', link: '/core/nexus/layout' },
        { label: 'Routing & SSR', link: '/core/nexus/routing' },
        { label: 'Search + Genie Omnibar', link: '/core/nexus/genie' },
      ],
    },
    {
      label: 'Store',
      items: [
        { label: 'Print Fulfillment', link: '/core/store/fulfillment' },
        { label: 'Licensing & Legal', link: '/core/store/licensing' },
        { label: 'Standards of Operation', link: '/core/store/sop' },
      ],
    },
    {
      label: 'Library',
      items: [
        { label: 'Components', link: '/core/library/components' },
        { label: 'Architecture Docs', link: '/core/library/architecture' },
        { label: 'Snippets + Code Index', link: '/core/library/snippets' },
      ],
    },
    {
      label: 'Admin',
      items: [
        { label: 'Login UI', link: '/core/admin/login' },
        { label: 'Dashboard UX', link: '/core/admin/dashboard' },
      ],
    },
    {
      label: 'API',
      items: [
        { label: 'Api-Blog', link: '/core/api/api-blog' },
        { label: 'GraphQL & REST Strategy', link: '/core/api/strategy' },
        { label: 'GraphQL Schema', link: '/core/api/schema' },
      ],
    },
    {
      label: 'Tooling',
      items: [
        { label: 'Monorepo Setup (Nx)', link: '/core/tooling/nx-monorepo' },
        { label: 'Zsh Dotfiles & NVM', link: '/core/tooling/zsh-nvm' },
      ],
    },
  ],
};
