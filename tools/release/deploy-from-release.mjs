// deploy-from-release.mjs
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';

const repoRoot = process.cwd();
const args = process.argv.slice(2);
const target = args[0] || 'staging'; // 'staging' | 'prod'
const autoYes = args.includes('--yes');

let sha = process.env.RELEASE_SHA;
if (!sha) {
  try { sha = readFileSync(resolve(repoRoot, 'dist/releases/LATEST'), 'utf8').trim(); }
  catch { throw new Error('No RELEASE_SHA provided and dist/releases/LATEST not found'); }
}

const artifact = resolve(repoRoot, `dist/releases/${sha}/meta-worker.generated.js`);
const configBase = 'apps/Core/Portfolio/sesame.jiode.one/sesame-meta-worker';

const config =
  target === 'prod'
    ? resolve(repoRoot, `${configBase}/wrangler.toml`)
    : resolve(repoRoot, `${configBase}/wrangler.staging.toml`);

if (target === 'prod' && !autoYes) {
  const prompt = `⚠️  Deploy SHA ${sha} to **PROD**? (y/N): `;
  process.stdout.write(prompt);
  const answer = readFileSync(0, 'utf8').trim().toLowerCase(); // read from stdin
  if (answer !== 'y') {
    console.log('Aborted.');
    process.exit(1);
  }
}

const cmd = `wrangler deploy "${artifact}" --config "${config}" --no-interactive --no-bundle`;
console.log(`🚀 ${target.toUpperCase()} :: ${cmd}`);
execSync(cmd, { stdio: 'inherit' });
