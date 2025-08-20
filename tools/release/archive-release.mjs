// archive-release.mjs
import { execSync } from 'node:child_process';
import { mkdirSync, copyFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const repoRoot = process.cwd();
const distWorker = resolve(repoRoot, 'dist/apps/sesame.jiode.one/meta-worker.generated.js');

let sha = process.env.RELEASE_SHA;
if (!sha) {
  try { sha = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); }
  catch { sha = String(Date.now()); }
}

const outDir = resolve(repoRoot, `dist/releases/${sha}`);
mkdirSync(outDir, { recursive: true });
copyFileSync(distWorker, resolve(outDir, 'meta-worker.generated.js'));
writeFileSync(resolve(repoRoot, 'dist/releases/LATEST'), `${sha}\n`);

console.log(`📦 archived release at dist/releases/${sha}/meta-worker.generated.js`);
