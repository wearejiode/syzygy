// listPosts.js
import { execSync } from 'child_process';

const QUERY = `
  SELECT id, title, slug, excerpt, created, content
  FROM posts
  ORDER BY created DESC
  LIMIT 10;
`;

const cmd = `npx wrangler d1 execute DB --remote --command "${QUERY}"`;

try {
  const result = execSync(cmd, { encoding: 'utf-8' });
  console.log('📝 Recent Posts:\n');
  console.log(result);
} catch (err) {
  console.error('❌ Failed to fetch posts:', err.message);
}