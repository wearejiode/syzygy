## 🧠 Day 8: Architecture Astral Projection

> 🔵 Retrospective: “We didn’t write much code — but we rewrote the entire blueprint of the universe.”

**Highlights:**
- Made critical **architectural decisions** across portfolio, blog, docs, and the Sesame app
- Researched and clarified roles of **Fastify**, **Yoga**, **Hono**, and **Bun**
- Committed to switching from **JS to TypeScript**
- Finalized direction for **Sesame v1 and v2** architecture
- Realized the need for a dedicated **docs site** to scale future planning
- Reimagined the portfolio homepage into a **modular, interactive ecosystem**
- Sketched out flow logic for **Genie invites**, **login unlocking**, and **custom pitch personalization**

---

**Summary:**

Today was a deep dive into system design — a full day's worth of technical soul-searching. We laid the mental groundwork for not just one project, but the entire Fahrnbach site ecosystem.

We reviewed modern server runtimes and framework roles:
- **Yoga** is perfect for GraphQL serverless APIs
- **Fastify** shines in full monolithic or SSR apps
- **Hono** is an elegant express alternative for edge functions and HTTP handlers
- **Bun** is blazing fast and tempting for SSG or edge-rendered apps — but not yet mature enough to replace Node fully

We decided:
- ✅ **Sesame v1** should be a static site (SSG) using Bun or Astro — especially if it goes viral
- ✅ **Sesame v2** will be a dynamic, full app (not suitable for SSG due to personalized pages and live content updates)
- ✅ **The blog** will be a dedicated SSR app for optimal reader experience and modular embedding into the homepage
- ✅ **The homepage** is now the *nexus* of the brand — a dynamic launchpad, not just a portfolio
- ✅ Genie will evolve into a full assistant and navigation concierge

We also:
- Sketched **"magic links"** (e.g., `?invite=Daniel` or `?source=linkedin`) to customize pitch and unlock extra Genie features
- Added a login unlock mechanism to **bypass Genie throttling**
- Defined new **modular UX flows** for sesame:
  - “✨ Share with a colleague”
  - “💌 Custom intro greeting”
  - “🌟 Invite-only extras”
- Brainstormed UI animations and delight elements (e.g., sparkles, swipe gestures, "floating invite" cards)

---

**Intent:**

Clarify roles of tools and routes across the Fahrnbach ecosystem, future-proof decision trees, and build excitement through narrative structure and modular flows. Prepare every subproject with clear separation of concern, and start designing with both **SSG performance** and **dynamic interactivity** in mind.

---

**Lessons Learned:**

- The difference between serverless functions and servers matters a lot more when you scale
- Serverless servers… are a thing? 😆
- You can mentally prototype architecture faster than code — but you must write it down (hence, docs.fahrnbach.one)
- Bun is cool, but be cautious until the ecosystem matures
- A "portfolio" should evolve with your career — don't limit yourself with outdated metaphors

---

**Future Improvements:**

- Add **custom invitation** builder with share links and Genie unlockables
- Convert Sesame v1 to Bun- or Astro-powered **SSG**
- Add **Genie login** option for power users
- Expand homepage with:
  - An omnibar across all subdomains
  - Responsive sparkly nav buttons (especially on mobile)
  - A zoom-out masthead reveal on first interaction
- Begin writing formal docs:
  - Component registry
  - Change logs
  - Dev workflows
  - Subdomain roles and responsibilities

> “We’re gonna need a bigger boat.”  
> That realization led to the birth of [`docs.fahrnbach.one`](https://docs.fahrnbach.one), our new command center for the future.

---

✨ Want to follow along? [See the full Devlog Index](https://github.com/fahrnbach/one/discussions/4)  
🌐 Or visit the growing [Nexus site](https://fahrnbach.one)

**Tags:** `#architecture` `#ssg` `#ssr` `#bun` `#astro` `#fastify` `#portfolio-nexus` `#docs`  
 
🎧 **Coding Fuel:** [Zed's Dead](https://www.youtube.com/watch?v=UJcLD-JukyE)  
BONUS 🎧 **Coding Fuel:** [LSDREAM & CloZee](https://www.youtube.com/watch?v=qLjOc5Dq81A)  
📅 *June 17 2025*

