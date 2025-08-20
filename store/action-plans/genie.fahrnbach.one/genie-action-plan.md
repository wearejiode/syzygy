🧞 Genie Assistant Feature Expansion (RAG + OmniBar)

🎯 Purpose

To create a truly futuristic portfolio experience, we are expanding the Genie Assistant with:

Custom recruiter experiences

Floating omnibar chat UI

Keyboard-aligned dunk integration on mobile

Smart fallback, low-confidence logging

Context-aware suggestions from project source code + blog

🎁 Custom Links for Recruiters

The Genie can act as a dynamic concierge for visiting recruiters. Example features:

"I’m a recruiter at [CompanyName]" → Genie offers:

🚀 Tailored pitch (link to sesame.fahrnbach.one/companyname)

📄 Direct resume download

📬 One-click contact with calendar link

Store their session (or email via OAuth login) for future tailoring

Could serve unique UTM-tagged links for tracking interest

Technical Notes:

Use companyname to dynamically load a JSON config

Show tailored greeting + CTA links

Cache these suggestions by subdomain or email match

🧰 Per-User Memory (Optional, via OAuth)

If OAuth is used (Google/GitHub):

Store last visited section

Keep preference: light/dark mode, genie muted/open

Save Genie chat history (stored locally or server-side via Supabase/Redis)

On return visit, Genie could say: "Welcome back, want to pick up where we left off?"

💬 Floating Chat Overlay (Mobile/Desktop)

Genie floats above main content in a semi-transparent box

Mobile: Overlay is exactly the height of the virtual keyboard (if possible)

Match window.visualViewport.height dynamically

Genie overlay slides up when input is focused

Could preload in-memory keyboard dimensions for smoother animation

Bonus: Genie dunk panel = same height as keyboard = feels magical when summoned

🛎️ Portfolio Concierge

Meta-questions the Genie should be able to answer:

"How can I contact Jacob?"

"What’s his best project for frontend design?"

"What’s something with animation or 3D?"

"What components does this site use?"

Use embedded RAG content with labeled metadata:

{
  type: "project",
  tech: ["Angular", "ThreeJS"],
  category: "3D Visual", 
  highlight: true
}

🧩 Plugin-Style Tech Guide

Genie can respond to questions like:

“How is the Dunk menu built?”

“What tools were used in the search bar?”

“Where’s the ThreeJS code for the 3D scene?”

Pull directly from:

Annotated .md project files

Embedded design notes

Commented code snippets in source tree

🚨 Low Confidence Fallback

If confidence < threshold:

Genie returns: “I’m not sure, but here’s my best guess.”

Logs question + timestamp + source context + user id (if authed)

Option to click: “Was this answer helpful?” 👍👎

Use responses to retrain / regenerate embeddings

Long-term: Add admin dashboard to flag weak answers and improve source content

✅ Add to Action Plan

This entire feature set will be added under:

Phase III – Genie UX Integration + AI Concierge Layer

Components to scaffold:

GenieChatOmnibarComponent

DunkSummonButton

AuthHelperService

ConfidenceLoggerService

Let me know if you'd like the component wireframes mocked up!

