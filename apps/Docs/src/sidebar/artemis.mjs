// --- 🌌 Artemis: The Art App ---
export const artemisSidebar = {
  label: '🌌 Artemis: The Art App',
  collapsed: true,
  items: [
    { label: 'Vision Overview', link: '/artemis/overview/overview' },
    {
      label: 'App Structure',
      items: [
        { label: 'Frontend Plan', link: '/artemis/art-app/frontend' },
        { label: 'Dynamic Gallery UI', link: '/artemis/art-app/gallery' },
      ],
    },
    {
      label: 'Worldbuilding',
      items: [
        { label: 'Theme & Lore', link: '/artemis/worldbuilding/theme' },
        { label: 'Celestial UX Concepts', link: '/artemis/worldbuilding/celestial-ui' },
      ],
    },
    {
      label: 'Experiments',
      items: [
        { label: 'Glitch Art Pipeline', link: '/artemis/experiments/glitch' },
        { label: 'Interactive Animations', link: '/artemis/experiments/animations' },
      ],
    },
  ],
};
