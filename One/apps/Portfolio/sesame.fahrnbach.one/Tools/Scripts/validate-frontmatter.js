import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import chalk from 'chalk';

const contentDir = path.resolve('apps/docs/src/content');

async function findMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() ? findMarkdownFiles(res) : res;
  }));
  return files.flat().filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
}

function validateFrontmatter(filePath, data) {
  const required = ['title', 'description'];
  const optionalArrays = ['tags', 'keywords', 'head'];

  let hasIssue = false;

  for (const key of required) {
    if (!(key in data)) {
      console.log(`${chalk.red('✖')} ${filePath}: Missing required frontmatter field "${key}"`);
      hasIssue = true;
    }
  }

  for (const key of optionalArrays) {
    if (key in data && !Array.isArray(data[key])) {
      console.log(`${chalk.yellow('⚠')} ${filePath}: "${key}" should be an array`);
      hasIssue = true;
    }
  }

  if (!hasIssue) {
    console.log(`${chalk.green('✓')} ${filePath}: OK`);
  }
}

async function main() {
  const files = await findMarkdownFiles(contentDir);
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf-8');
    try {
      const { data } = matter(raw);
      validateFrontmatter(file, data);
    } catch (e) {
      console.error(`${chalk.red('✖')} ${file}: Failed to parse frontmatter`);
      console.error(e);
    }
  }
}

main();