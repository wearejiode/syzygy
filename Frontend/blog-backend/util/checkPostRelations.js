import { execSync } from 'child_process';

function runQuery(sql) {
  const cmd = `npx wrangler d1 execute DB --remote --command "${sql}"`;
  const fullOutput = execSync(cmd, { encoding: 'utf-8' });

  // Extract the last valid JSON array from wrangler output
  const match = fullOutput.match(/\[\s*\{\s*"results":[\s\S]*?\}\s*\]/);
  if (!match) {
    console.warn('⚠️ Could not parse JSON from wrangler output:');
    console.log(fullOutput);
    return null;
  }

  try {
    const parsed = JSON.parse(match[0]);
    return parsed[0].results;
  } catch (e) {
    console.error('❌ Failed to parse JSON:', e);
    return null;
  }
}

console.log('🔎 Checking post-tag/category relations...\n');

const orphanedTags = runQuery(`
  SELECT posts.id, posts.title
  FROM posts
  LEFT JOIN post_tags ON posts.id = post_tags.post_id
  WHERE post_tags.tag_id IS NULL;
`);

const orphanedCats = runQuery(`
  SELECT posts.id, posts.title
  FROM posts
  LEFT JOIN post_categories ON posts.id = post_categories.post_id
  WHERE post_categories.category_id IS NULL;
`);

if (!orphanedTags?.length && !orphanedCats?.length) {
  console.log('✅ No Orphaned Tags or Cats omg 😝');
} else {
  if (orphanedTags?.length) {
    console.log('🚩 Posts with no tags:');
    console.table(orphanedTags);
  } else {
    console.log('✅ No Orphaned Tags 🎉');
  }

  if (orphanedCats?.length) {
    console.log('🚩 Posts with no categories:');
    console.table(orphanedCats);
  } else {
    console.log('✅ No Orphaned Cats 😺');
  }
}