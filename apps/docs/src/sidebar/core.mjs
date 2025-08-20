// --- 🚀 Core Systems ---
export const coreSidebar = {
  label: '🚀 Core Systems',
  collapsed: false,
  items: [
    { label: 'Core Overview', link: '/core/overview/overview' },
    {
      label: 'Blog',
      items: [
        { label: 'Overview', link: '/core/blog/overview' },
        {
          label: 'Design System',
          items: [
            { label: 'Design Overview', link: '/core/blog/blog-design' },
          ],
        },
        {
          label: 'Components',
          items: [
            { label: 'Hot Posts Module', link: '/core/blog/blog-components/hot-posts' },
          ],
        },
        {
          label: 'CMS',
          items: [
            { label: 'CMS Auth', link: '/core/blog/cms/auth' },
            { label: 'CMS Guide', link: '/core/blog/cms/guide' },
            { label: 'CMS Usage', link: '/core/blog/cms/usage' },
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
        {
          label: 'Tabs',
          items: [
            { label: 'Home', link: '/core/nexus/tabs/home' },
            { label: 'Contact', link: '/core/nexus/tabs/contact' },
            { label: 'Blog', link: '/core/nexus/tabs/blog' },
            { label: 'Press', link: '/core/nexus/tabs/press' },
            { label: 'Store', link: '/core/nexus/tabs/store' },
            { label: 'Events', link: '/core/nexus/tabs/events' },
            { label: 'Showcase', link: '/core/nexus/tabs/showcase' },
            { label: 'Social', link: '/core/nexus/tabs/social' },
            { label: 'FAQs', link: '/core/nexus/tabs/faqs' },
            { label: 'Ethos', link: '/core/nexus/tabs/ethos' },
            { label: 'Media', link: '/core/nexus/tabs/media' },
          ],
        },
        { label: 'Global Layout', link: '/core/nexus/layout' },
        { label: 'Routing & SSR', link: '/core/nexus/routing' },
        { label: 'Genie', link: '/core/nexus/genie' },
        { label: 'Omnibar', link: '/core/nexus/omnibar' },
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
        { label: 'Getting Started', link: '/core/library/getting-started' },
        { label: 'Components', link: '/core/library/components' },
        { label: 'Toolbox', link: '/core/library/toolbox' },
      ],
    },
    {
      label: 'Admin',
      items: [
        { label: 'Login UI', link: '/core/admin/login' },
        { label: 'Dashboard UX', link: '/core/admin/dashboard' },
        { label: 'Authentication', link: '/core/admin/auth' },
      ],
    },
    {
      label: 'API',
      items: [
        { label: 'Api-Blog', link: '/core/api/api-blog' },
        { label: 'GraphQL & REST Strategy', link: '/core/api/strategy' },
        { label: 'Main GraphQL Schema', link: '/core/api/schema' },
        { label: 'SQL Schema', link: '/core/api/sql-schema' },
        { label: 'Zod Schema', link: '/core/api/zod-schema' }
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
