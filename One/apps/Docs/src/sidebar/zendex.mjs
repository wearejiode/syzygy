import { coreSidebar } from './core.mjs';
import { outreachSidebar } from './outreach.mjs';
import { artemisSidebar } from './artemis.mjs';
import { devSparksSidebar } from './devsparks.mjs';
import { metaSidebar } from './meta.mjs';
import { aiSidebar } from './ai.mjs';
import { web3Sidebar } from './web3.mjs';
import { toolsSidebar } from './tools.mjs';
import { soonSidebar } from './soon.mjs';

export const sidebar = [
  { label: 'Start Here', link: 'start' },
  coreSidebar,
  outreachSidebar,
  artemisSidebar,
  devSparksSidebar,
  metaSidebar,
  toolsSidebar,
  aiSidebar,
  soonSidebar,
  web3Sidebar
];
