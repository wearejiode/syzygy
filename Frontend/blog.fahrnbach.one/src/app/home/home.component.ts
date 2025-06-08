import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  recentPosts = [
    {
    title: "🧩 Case Study: Angular Component Library App",
    date: '2025-06-03',
    slug: 'angular-library',
    excerpt: "How I built a component-driven Angular app with dynamic search, responsive UI, and plans for documentation, theming, and open-source contribution.",
    image: '/assets/thumbs/angular-components.png',
    tags: '[angular, components, typescript, design-system, frontend, ui]',
    link: 'blog.fahrnbach.one/angular-library'
    },
    {
    title: "🎨 Case Study: Designing My Art App",
    date: '2025-06-02',
    slug: 'art-app',
    excerpt: "How I turned a social art platform into a design showcase using custom SVG elements, AI-assisted visuals, and hand-tuned HTML/CSS to explore futuristic UI design.",
    image: '/assets/thumbs/art-app.png',
    tags: '[design, art, javascript, vanilla-js, svg, ui, showcase]',
    link: 'blog.fahrnbach.one/art-app'
    },
    {
    title: "🌀 Case Study: Building This Blog (Yes, This One)",
    date: '2025-06-04',
    slug: 'blog-monorepo',
    excerpt: "A meta look into how and why I built this very blog, including Angular routing, Markdown rendering, frontmatter parsing, and the importance of documenting personal work.",
    image: '/assets/thumbs/blog.png',
    tags: '[angular, blog, markdown, meta, case-study, documentation]',
    link: 'blog.fahrnbach.one/blog-monorepo'
    },
    {
      title: "🚀 Case Study: Building My Portfolio Site",
      date: '2025-06-01',
      slug: 'portfolio-site',
      excerpt: "How I built my portfolio site from scratch using vanilla JavaScript, Three.js, and hand-crafted visuals to push the boundaries of futuristic web design.",
      image: '/assets/thumbs/portfolio.png',
      tags: '[portfolio, javascript, design, threejs, vanilla-js, futuristic]',
      link: 'blog.fahrnbach.one/portfolio-site'
    },
    {
      title: "🔐 How to Sign Git CLI Commits with GPG on GitHub",
      date: '2024-11-13',
      slug: 'sign-git-commits',
      excerpt: "Learn how to secure and verify your GitHub commits using GPG signatures in the command line.",
      image: '/assets/thumbs/git-gpg.png',
      tags: '[git, github, gpg, security, tutorial, cli]',
      link: 'blog.fahrnbach.one/sign-git-commits'
    },
    {
      title: '📦 Understanding the GPG Lock & Key Metaphor',
      excerpt: 'An easy-to-grasp story about digital keys and secure communication.',
      slug: 'gpg-lock-and-key',
      link: 'google.com'
    },
    {
      title: '🔐 Why Verified Commits Matter',
      excerpt: 'Digital identity, trust, and why you should sign your work.',
      slug: 'verified-commits'
    },
    {
      title: '📁 Organizing Your Angular Project Like a Pro',
      excerpt: 'Best practices and project structure tips for long-term maintainability.',
      slug: 'angular-structure-tips'
    }
  ];
}
