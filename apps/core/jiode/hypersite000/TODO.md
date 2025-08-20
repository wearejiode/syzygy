# Todo

[ ] UPDATE FAVICON.
[ ] Create Mobile CSS.
[ ] Experiment with TOS Terms being more "Dense Legal Text" To improve the design vibes

[ ] Add a Checkbox (Probably will have to do r2 instead of kv) for "Sent email"
Improve admin dashboard for email signups

[ ] Add micro-interaction on submittal success (Energy Confetti?)

[ ] Add layered FUNnel Approach.

```ChatGPT4.0
Yes — this is a brilliant and playful funnel. Here’s a clean breakdown of the flow you’re envisioning, with layered purpose and interaction:

⸻

🌐 Site Flow Overview

🔹 Layer 1: The Beacon

Page 1 (Homepage / Landing Page)
	•	Purpose: Casual intro to the project, accessible to all.
	•	Action: Email form (early access / updates)
	•	After Submit:
	•	Show success message
	•	Reveal cryptic message:
“There’s more to see… but before you leave, you must find the way.”
	•	Optionally fade in or sparkle-reveal a link to Page 2
(e.g. a faint glyph in the footer or corner)

⸻

🔸 Layer 2: The Passage

Page 2 (Hidden / Alternative Theme)
	•	Looks similar to Page 1 but has a different vibe (e.g. red/cyberpunk/layered background)
	•	Purpose: Qualify curious users through play
	•	Action: Second email form
Text:
“Special experiences are reserved for those who show they care.”
“Follow the sparkles. Your mouse knows the way.”
	•	Link to Page 3 is hidden:
	•	Triggered via hover trails
	•	Clickable glyph
	•	Puzzle text on hover

⸻

🔹 Layer 3: The Keepsake

Page 3 (VIP Tier)
	•	Theme shift again (e.g. neon city, mysterious portal, warmth)
	•	Purpose: Celebrate those who made it, invite public interaction
	•	Action:
	•	Confetti 🎉 on email submission
	•	Invite message:
“Use the code WeAre100 on Farcaster or [X] to say hello.”
	•	Form for “special notifications” or digital gifts (collectibles, invites)

⸻

🧠 Technical Tips
	•	Use KV to track each email and layer, if you want analytics or rate limiting.
	•	You can also embed a query param (e.g. ?from=beacon) in hidden links for trail tracking.
	•	A hidden <a> link styled like a glyph with .hidden-link:hover sparkle animation makes the hunt delightful.
	•	Confetti:
Use Canvas Confetti or a similar lib triggered on form submit success.

⸻

🧪 Optional: Fourth Layer (ECHO Protocol Tease)

If you want one final reveal:

“The Echo hears those who listen.”
Maybe a riddle, or a time-locked page.

⸻

Let me know which part you want built next (HTML/CSS/logic) or want me to sketch wireframes for Layer 2 & 3 layouts 🧙‍♂️✨
```
