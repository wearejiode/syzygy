import { z } from 'zod'

const postSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  audience: z.string().optional(),
  slug: z.string(),
  slugPrefix: z.union([z.string(), z.boolean()]).optional(),

  created: z.string().datetime(),
  edited: z.string().datetime().optional(),

  excerpt: z.string(),
  summaryPoints: z.array(z.string()).optional(),

  cover: z.string().url().optional(),
  images: z.array(z.string()).optional(),
  ogImageAlt: z.string().optional(),

  languages: z.string().default('en'),
  author: z.string(),

  readingTime: z.number(),

  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),

  isSeries: z.boolean().optional(),
  series: z.string().optional(),
  series_part: z.union([z.number(), z.string()]).optional(),

  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  dirty: z.boolean().default(false),
  published: z.boolean().default(false),

  visibility: z.enum(['public', 'private', 'internal']).default('public'),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).default('draft'),
  scheduled: z.string().datetime().optional(),

  layout: z.string().optional(),
  index: z.boolean().default(true),
  comments: z.boolean().default(true),

  redirectFrom: z.array(z.string()).optional(),
  contributors: z.array(z.string()).optional(),

  usedAI: z.boolean().default(false),
  originalPrompt: z.array(z.string()).optional(),

  source: z.enum(['md', 'discussion', 'external', 'syndicated']).default('md'),
  canonical: z.string().url().optional(),

  authRequired: z.boolean().default(false),
})

export function validatePost(data: unknown) {
  return postSchema.safeParse(data);
}
