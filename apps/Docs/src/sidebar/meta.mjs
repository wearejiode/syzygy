// --- 🧪 Indexium Core ---
export const metaSidebar = {
  label: '🧪 Meta Notes',
  collapsed: true,
  items: [
    { label: 'Meta Overview', link: '/meta/overview/overview' },
    {
      label: 'Content & Generation',
      items: [
        { label: 'Getting Started', link: '/meta/content/getting-started' },
        { label: 'Authoring Process', link: '/meta/content/authoring' },
        { label: 'Template', link: '/meta/content/template' },
        { label: 'Verify Sidebar', link: '/meta/content/verify' },
      ],
    },
    {
      label: 'Info',
      items: [
        { label: 'Monorepo Quirks', link: '/meta/monorepo-quirks' },
        { label: 'Meta Tips', link: '/meta/tips' },
        { label: 'Troubleshooting', link: '/meta/troubleshooting' },
      ],
    },
    {
      label: 'Logs',
      items: [
        { label: 'Observations', link: '/meta/logs/observations' },
      ],
    },
    {
      label: 'Future Dx',
      items: [
        { label: 'Sidebar dX Idea', link: '/meta/futuredx/sidebar-dx' },
        { label: 'Lint Frontmatter', link: '/meta/futuredx/lint-frontmatter' },
      ],
    },
    {
      label: 'Workflows - Tools We Use',
      items: [
        { label: 'Git Workflows', link: '/meta/workflows/git-workflows' },
      ],
    },
  ],
};
