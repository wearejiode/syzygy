// watch-and-deploy.js
// 🛠️ Dev-friendly boilerplate for watching and deploying assets/meta files to Cloudflare

import chokidar from 'chokidar';
import { exec } from 'child_process';
import path from 'path';

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const tasks = [
  {
    label: 'Meta Worker',
    watchPath: './sesame-meta-worker/meta-worker.js',
    command: 'npm run deploy:meta',
  },
  {
    label: 'Pitch JSON',
    watchPath: './data/pitches.json',
    command: 'npm run sync:r2',
  },
  // Add more as needed
];

function runCommand(label, command) {
  console.log(`🚀 [${label}] Running: ${command}`);
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ [${label}] Error:`, err.message);
      return;
    }
    if (stderr) console.warn("⚠️  [${label}] Stderr:", stderr);
    console.log(`✅ [${label}] Done:
${stdout}`);
  });
}

console.log('👀 Starting watcher...');
tasks.forEach(({ label, watchPath, command }) => {
  const onChange = debounce(() => runCommand(label, command), 500);
  chokidar.watch(path.resolve(watchPath), { ignoreInitial: true })
    .on('change', onChange)
    .on('add', onChange);
});


// Add to package.json
// "scripts": {
  // "watch": "node watch-and-deploy.js"
// }
