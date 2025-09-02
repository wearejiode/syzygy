🧱 Flags vs. Normalized Tables: When to Use Which

🟣 “Should I make a new table for this, or just use a column?” — Every database designer, ever.

One of the most common questions in database design is knowing when to normalize (create separate tables with relationships) and when to keep things simple (use columns/flags directly on your main table).

Let’s break it down!

⸻

✅ Use Simple Columns (Flags) When:
• The data is predictable, fixed, and part of your app logic
• You’ll always want it to be immediately filterable
• It’s a yes/no binary or enum with limited values
• There’s no need for user customization or expansion

Examples:
• published (true/false)
• draft (true/false)
• visibility (enum: public/internal/private)
• status (enum: draft/published/archived)
• featured, indexable, comments_enabled, auth_required

✅ These are great as part of your core post schema because they’re:
• Easy to query (WHERE draft = false)
• Easy to manage
• Rarely change shape

⸻

🔄 Use Normalized Tables When:
• The data is user-generated or arbitrary
• There’s a many-to-many relationship
• You want to store extra metadata about the relationship (e.g. timestamps)
• The data might change often or grow over time

Examples:
• Tags (post_tags)
• Categories (post_categories)
• Likes (user_likes_post with a timestamp)
• Pageviews (post_views with IP/session tracking)

These should live in separate tables to keep your schema clean and scalable. They’re ideal for:
• Flexibility
• Avoiding duplication
• Supporting rich querying (e.g. “top 10 trending tags”)

⸻

🧠 TL;DR Mental Model

If every post has a known, fixed value: use a column.
If the values are variable, growing, or user-defined: use a table.

⸻

🎁 Bonus Tip: Hybrid is OK!

Sometimes, you can do both.
Store a denormalized count in your posts table (like_count, view_count) for quick access, but keep the raw events in a separate table.

⸻

✨ Related Devlog

Curious how this fits into real-world usage? Check out Day 5: Markdown Ascends to the Cloud where we discuss flags, metadata, and D1 ingestion!

⸻

📌 Final Advice

Don’t overthink it early — just build what you need. Refactor later when it grows.

“Normalize for flexibility. Flag for speed.”

⸻

Tags: #database-design #normalization #devlog #architecture #sql
📅 June 13 2025
