# 🧠 Angular Portfolio Rewrite Planning Log

## 🎯 Context
Jacob Fahrnbach has been exploring a full Angular rewrite of his current micro-portfolio. The original site, built with vanilla JS and Three.js, featured an immersive 3D design experience but had usability challenges on mobile. This conversation explores a hybrid solution — integrating the micro-site as an interactive landing component, followed by a structured, scrollable experience.

---

## ✨ Vision
- Retain the **interactive 3D canvas** for desktop
- Add a **"magic button"** on mobile to toggle interaction and reveal more content
- Create a **responsive masthead** and **structured site layout** below the 3D element
- Introduce innovative, ergonomic navigation for mobile (e.g., swipe/pull dunk trigger)

---

## 🧩 Component Breakdown
**On Desktop:**
- Full-screen 3D interactive canvas (shrinks 10–15% on first interaction)
- Floating header with profile image, navigation links
- Scrollable content begins below the canvas
- Persistent or retractable navigation options

**On Mobile:**
- Initial fullscreen 3D view with a glowing “magic button”
- Button toggles interactivity and reveals full site structure
- Navigation carousel (“the dunk”) with pull + snap interaction
- Optional persistent nav ring to recall dunk menu

---

## 🔄 Major Design Tradeoffs
- **3D experience** vs. **scroll access**
- **Ergonomic thumb-based controls** vs. traditional nav
- **Design-first experience** vs. easy content discoverability

---

## 🛠️ Next Steps
1. Scaffold an Angular project as the **full-mast container**
2. Integrate micro-portfolio as a component (`InteractiveHero`)
3. Implement “magic button” interaction toggle
4. Build masthead + navigation components
5. Prepare wireframes for “the dunk” mobile menu
6. Iterate on scroll/journey flow between components

---

## 🧠 Notes from Chat
- Use CSS Scroll Snap + IntersectionObserver to guide journey
- Consider sparkly animations for interaction cues
- Treat the new portfolio as a **home base** — a launchpad into deeper content
- The interactive canvas should “invite” exploration but allow graceful exit
- The mobile design will break conventions (no hamburger menus, all thumb-accessible)
