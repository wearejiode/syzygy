# TODO
## Authentication implement token/session system for protected post editing.

# Future Considerations:

## FEAT: Add Queue

🔁 Example Flow with Queue
	1.	Post Published via Admin Panel
	•	Sends a message to the queue: { postId: '123', action: 'update' }
	2.	Build Worker (listening to queue):
	•	Receives message.
	•	Regenerates only the affected static file (e.g., /blog/post-title)
	•	Pushes that to the static site (via GitHub Action, API, or direct file upload)
	3.	Post Rendered, Queue Cleared
	•	Success is logged. Failures optionally retried later.

⸻

🧠 Advanced Features You Can Add
	•	⏱️ Rate limit rebuilds (e.g. only once every 30s)
	•	✅ Build status tracking (success/fail per post)
	•	💥 Dead-letter queue for failures
	•	🔄 Retry logic for transient errors (like net failures)
	•	📊 Metrics for monitoring rebuild workload

## FEAT: Mobile Companion App

## FEAT: ✅ Future integrations (e.g., newsletters, syndication, AI summaries)
	•	Add a /feed.json or /feed.xml endpoint to the API for easy syndication (RSS, etc).
	Integrate push notifications via Firebase or Expo when new posts go live.
	Include offline sync for mobile reading (using SQLite or AsyncStorage on-device).