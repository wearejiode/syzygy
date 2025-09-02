1. Use GitHub Actions or Cron job
   Automate backups into your repo or a secure bucket.

```
npx wrangler d1 execute your-db-name --command ".dump" > backup-$(date +%F).sql
```

2. Create a DB → Markdown Export Script
   • Query each post and its normalized data (tags, categories, etc.)
   • Convert it into frontmatter + markdown content
   • Save to /posts/{slug}.md
   • Use for backups, portability, and Git-based versioning

3. Add a “Backfill ID” util:
   In case you ever need to retro-generate missing IDs from slugs or hashes.

4.✨ Add Zod validation to GraphQL mutations once CMS/admin editing is introduced
Goal: Ensure robust input validation and schema safety for any user-submitted or UI-edited post data.

## 🧩 Entry Questionnaire Concept

> 🎯 **Goal:** Turn passive readers into engaged participants by tailoring the content journey from their first visit.

---

### ✍️ Sample Questions

```text
1. What's your current skill level?
   ◯ Beginner
   ◯ Intermediate
   ◯ Advanced

2. What best describes your focus?
   ☐ Developer
   ☐ Designer
   ☐ Product/Manager
   ☐ Curious Human

3. How do you prefer to learn?
   ☐ Step-by-step tutorials
   ☐ High-level guides with visuals
   ☐ Source code examples
   ☐ Blog-style storytelling

4. What are you hoping to get out of this site?
   ☐ Build a portfolio
   ☐ Learn something new
   ☐ Stay inspired
   ☐ Just browsing
```
