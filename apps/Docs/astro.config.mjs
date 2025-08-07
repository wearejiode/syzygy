import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import { sidebar } from './src/sidebar/zendex.mjs'; // <- add .js if you're using .mjs

export default defineConfig({
  root: '.',
  srcDir: './src',
  integrations: [
    starlight({
      title: 'Spark Docs ⚡️',
      sidebar,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/fahrnbach/one'},
        { icon: 'seti:json', label: 'Blog', href: 'https://blog.fahrnbach.one'},
        { icon: 'rocket', label: 'Home', href: 'https://fahrnbach.one'},
      ],
    }),
    mdx(),
  ],
});
