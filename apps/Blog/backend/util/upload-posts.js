import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { validatePost } from '../schema/zod/post-schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POSTS_DIR = path.join(__dirname, 'posts');

// --- Helper to escape SQL values
const escape = str => str?.replace(/"/g, '""').replace(/\n/g, ' ') ?? '';

// --- Helper to run SQL via wrangler
function runSQL(sql) {
  const filePath = path.join(os.tmpdir(), `upload-${Date.now()}.sql`);
  fs.writeFileSync(filePath, sql);
  const cmd = `npx wrangler d1 execute DB --file=${filePath} --remote`;
  console.log(`📄 Executing SQL batch:\n${sql}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } finally {
    fs.unlinkSync(filePath); // clean up temp file
  }
}

function buildSQL(post, content) {
  const lines = [];

  const idRaw = post.id ?? post.slug;
  const id = escape(idRaw.toString());
  const title = escape(post.title);
  const slug = escape(post.slug);
  const excerpt = escape(post.excerpt);
  const created = escape(post.created);
  const edited = post.edited ? `"${escape(post.edited)}"` : 'NULL';
  const cover = post.cover ? `"${escape(post.cover)}"` : 'NULL';
  const reading_time = post.readingTime || 0;
  const body = escape(content);

  // Post upsert
  lines.push(`
    INSERT OR REPLACE INTO posts (
      id, title, slug, excerpt, content, created, edited, cover, reading_time
    ) VALUES (
      "${id}", "${title}", "${slug}", "${excerpt}", "${body}", "${created}", ${edited}, ${cover}, ${reading_time}
    );
  `);

  // Tags
  for (const tag of post.tags ?? []) {
    const tagVal = escape(tag);
    lines.push(`INSERT OR IGNORE INTO tags (name) VALUES ("${tagVal}");`);
    lines.push(`
      INSERT OR IGNORE INTO post_tags (post_id, tag_id)
      SELECT "${id}", id FROM tags WHERE name = "${tagVal}";
    `);
  }

  // Categories
  for (const cat of post.categories ?? []) {
    const catVal = escape(cat);
    lines.push(`INSERT OR IGNORE INTO categories (name) VALUES ("${catVal}");`);
    lines.push(`
      INSERT OR IGNORE INTO post_categories (post_id, category_id)
      SELECT "${id}", id FROM categories WHERE name = "${catVal}";
    `);
  }

  return lines.join('\n');
}

async function uploadAllPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);

    const validation = validatePost(data);
    if (!validation.success) {
      console.warn(`❌ Skipping ${file}: validation failed`);
      console.dir(validation.error.format(), { depth: null });
      continue;
    }

    const post = validation.data;
    const sql = buildSQL(post, content);
    runSQL(sql);
  }

  console.log('✅ All markdown posts uploaded to remote D1.');
}

uploadAllPosts().catch(console.error);
