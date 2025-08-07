## 🍰 The Bakery of Web Development: Finally Understanding `src/` vs `public/`

> “Wait... why did that file just disappear? And why didn’t my favicon show up?!” 😵‍🌯

If you've ever wrestled with frameworks like Angular, React, or any modern build tool and found yourself confused about why some files show up in production and others vanish like flour in the wind... you're not alone.

Even after *years* of building web apps, I only recently had the "aha!" moment that made everything click: **the difference between `src/` and `public/` is just like the difference between a bakery's kitchen and its display case.**

---

### 🧁 src/: The Kitchen
This is where you do your prep work.

- TypeScript files
- SCSS or CSS
- Component templates
- Markdown you plan to convert
- Images to optimize

Files in `src/` are like your *raw ingredients*. They go through mixing bowls, ovens, and magic. They get compiled, minified, tree-shaken, and transformed.

If you put a file here, it means: “This needs to be processed before it's ready for the customer.”

---

### 🍲 public/: The Display Case
This is what goes directly to the customer — untouched.

- Favicons
- Robots.txt
- Static images
- Manifest files
- SEO metadata

Files in `public/` skip the kitchen. They're like pre-made pastries you just pull out and arrange in the window. No frosting. No piping. Just unwrap and go.

That means they're:
- **Not bundled** into your JS/CSS
- **Not transformed** by Webpack/ESBuild/Vite/etc
- **Available as-is** on the final deployed site

---

### ✨ Why This Distinction *Matters* for Developers:
- **Performance:** Files in `public/` can be CDN-cached and don’t inflate your JavaScript bundles.
- **Control:** You decide what gets transformed and what doesn’t.
- **Portability:** It helps when jumping to other frameworks (Next.js, Astro, SvelteKit, etc.).
- **Debugging:** You finally know why something's missing — or why it's visible in production when it shouldn't be.

---

### 🍬 My "Aha!" Moment

I’ve been deep in the tooling for years. But until I started migrating an Angular project into a monorepo with Nx, I never truly needed to **care** about the difference. The CLI always took care of it.

But once I had to decide: _"Where does this markdown file go? What about this static screenshot?"_

...that's when the bakery metaphor helped it click:

> **src/** = prepped ingredients going into the oven  
> **public/** = finished goods behind the glass

---

### 🔧 When in Doubt, Ask:
> “Does this file need to be built, transformed, or bundled?”

If yes → it goes in `src/`.
If no → it goes in `public/`.

---

### 🌐 Bonus Tip for Angular/Nx Devs
In older Angular projects, everything was smushed into `src/`, and `angular.json` handled the rest.
But in Nx (especially with SSR), that separation becomes much more explicit and meaningful.

If you're like me and using `@nx/angular`, you might want to:
- Move raw images and markdown to `src/`
- Move favicons, OG images, and meta content to `public/`

---

### 🌟 Final Thoughts
This isn’t just about file locations. It’s about mindset:
Knowing **what gets baked** vs **what gets served** saves you time, energy, and hours of debugging.

And once it clicks, you'll never go back.

Now if you’ll excuse me, I’m off to eat some static `.webp` croissants.

---

*Written by Jacob Fahrnbach with help from ChatGPT.*

#frontend #nx #angular #webdev #beginnerTips

Inspired by:

 actually think this analogy would be really useful for a beginner to help understand exactly what is going on. I've been looking at public folders for a LOOOOOOONNNNNNNGGGGGGG time and only just now truly understood the difference - conceptually. (Mostly becaue tools like angular kind of handled a lot of that logic FOR me) but I feel like it's a really important distinction that kind of just intuitevly makes sense... but is one of those weird things that took a long time to really click

 That’s such a good insight, Jacob — and honestly, you’re not alone in that. The public vs src split is one of those silent foundational concepts that frameworks tend to abstract away… until one day you try something custom, and it’s like:

“Wait… why did that file just disappear? And why didn’t my favicon show up?! 😵‍💫”

The fact that you’ve been deep in the tooling for years and only now got that final mental “click” is a testament to just how subtly hidden these distinctions can be. Angular, especially older versions, kind of bundled everything together through its CLI — so it never made you care.

But now that you’re working in Nx, a more explicit monorepo system with Angular + SSR + custom builds + static files, this clarity becomes powerful.

⸻

✨ Why This Distinction Matters for Developers:
	•	Performance: public/ files can be CDN-cached and don’t inflate your JS bundles.
	•	Control: You decide what gets transformed and what doesn’t.
	•	Portability: Understanding this helps when working with other frameworks like React, SvelteKit, Astro, etc.
	•	Debugging: You know why something’s missing from your build — or why it’s still showing up in plain text.

⸻

🧁 Want to turn this into a real blog post?

I think your version of the analogy (with the lived-experience “click”) would be SO much more relatable than a dry technical doc. Here’s a possible title:

“The Bakery of Web Development: Finally Understanding src/ vs public/”

Happy to help you sketch it out if you want!

This one’s a real treat. 😋🍪