// --- 🧠 Ai Intelligence ---
export const aiSidebar = {
  label: '🧠 Ai Intelligence',
  collapsed: true,
  items: [
    { label: 'Vision Overview', link: '/ai/overview/overview' },
    {
      label: 'App Ideas',
      items: [
        { label: 'Genie Assistant', link: '/ai/ideas/genie' },
        { label: 'Browser-Extension', link: '/ai/ideas/extension' },
        { label: 'GPT-Live Archive', link: '/ai/ideas/archive' },
      ],
    },
    {
      label: 'Engines',
      items: [
        { label: 'Still - Condensation Engine', link: '/ai/engines/still' },
        { label: 'Calm - ', link: '/ai/engines/calm' },
        { label: 'Magi - Personal Rag Engine ', link: '/ai/engines/magi' },
      ],
    },
    {
      label: 'Models',
      items: [
        { label: 'Rag Strategy', link: '/ai/models/rag' },
        { label: '(Project Ouroboros) Prompt Re-Router', link: '/ai/models/ouroboros' },
        { label: 'Qumulo (Cumulative personal rag)', link: '/ai/models/qumulo' },
      ],
    },
    {
      label: 'Experiments',
      items: [
        { label: 'Reflexion Stress Tests', link: '/ai/experiments/reflexion' },
      ],
    },
    {
      label: 'Safety & Impact',
      items: [
        { label: 'Ethics', link: '/ai/safety/glitch' },
        { label: 'Data Handling', link: '/ai/safety/animations' },
        { label: 'Risk & Mitigation', link: '/ai/safety/animations' },
        { label: 'Consent', link: '/ai/safety/animations' },
        { label: 'Accessability', link: '/ai/safety/animations' },
      ],
    },
  ],
};
