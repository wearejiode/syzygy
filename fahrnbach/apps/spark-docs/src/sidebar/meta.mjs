// --- 🧪 Indexium Core ---
export const metaSidebar = {
  label: '🧪 Meta Notes',
  collapsed: true,
  items: [
    { label: 'Meta Overview', link: '/meta/overview/overview' },
    {
      label: 'Info',
      items: [
        { label: 'Monorepo Quirks', link: '/meta/monorepo-quirks' },
        { label: 'Tips', link: '/meta/tips' },
        { label: 'Troubleshooting', link: '/meta/troubleshooting' },
      ],
    },
    {
      label: 'Process',
      items: [
        { label: 'Getting Started', link: '/meta/futuredx/getting-started' },
        { label: 'Article Generation', link: '/meta/futuredx/article-generation' },
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
  ],
};
