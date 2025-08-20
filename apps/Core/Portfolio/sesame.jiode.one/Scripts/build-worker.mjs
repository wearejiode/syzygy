// apps/Core/Portfolio/sesame.jiode.one/scripts/build-worker.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const root = resolve(process.cwd(), 'apps/Core/Portfolio/sesame.jiode.one');
const paths = {
  workerSrc: resolve(root, 'sesame-meta-worker/meta-worker.js'),
  tmplFn:    resolve(root, 'templates/page.template.js'),
  cssFile:   resolve(root, 'templates/styles.css'),  // ensure this matches your filename
  jsFile:    resolve(root, 'templates/client.js'),
  // output goes to dist
  workerOut: resolve(process.cwd(), 'dist/apps/sesame.jiode.one/meta-worker.generated.js'),
};

function escapeForTemplateLiteral(s) {
  // Keep as a JS template-literal-friendly string.
  return s.replaceAll('`', '\\`').replaceAll('${', '\\${');
}

// Optional: friendlier error if a file is missing.
async function safeRead(path, label) {
  try {
    return await readFile(path, 'utf8');
  } catch (err) {
    throw new Error(`Failed to read ${label} at ${path}: ${err.message}`);
  }
}

(async () => {
  const [tmplFnRaw, cssRaw, jsRaw, workerRaw] = await Promise.all([
    safeRead(paths.tmplFn, 'page.template.js'),
    safeRead(paths.cssFile, 'styles.css'),
    safeRead(paths.jsFile, 'client.js'),
    safeRead(paths.workerSrc, 'meta-worker.js'),
  ]);

  // Trim & strip comments (very light), and guarantee variables exist
  const css = (cssRaw ?? '').replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '').trim();
  const js  = (jsRaw ?? '').trim();

  // Inline CSS/JS placeholders into the render function source file
  const inlinedFn = tmplFnRaw
    .replace('/*__INLINE_CSS__*/', escapeForTemplateLiteral(css))
    .replace('/*__INLINE_CLIENT_JS__*/', escapeForTemplateLiteral(js));

  // Extract: export function renderPage(...) { ... } (robust to trailing newlines or comments)
  const startMarker = 'export function renderPage';
  const startIdx = inlinedFn.indexOf(startMarker);
  if (startIdx === -1) {
    throw new Error('Could not find `export function renderPage` in page.template.js');
  }
  // Slice from the start of the function forward
  let funcSlice = inlinedFn.slice(startIdx);
  // Replace leading `export ` with '' to make it a normal function decl
  funcSlice = funcSlice.replace(/^export\s+/, '');
  // Heuristic: the function we want is the last closing brace in the file (template strings may include braces safely)
  const endIdx = funcSlice.lastIndexOf('}');
  if (endIdx === -1) {
    throw new Error('Could not determine end of renderPage function in page.template.js');
  }
  const renderFnSource = funcSlice.slice(0, endIdx + 1);

  // Inject into pristine worker by replacing the placeholder
  const placeholder = 'const renderPage = /*__RENDER_FUNCTION__*/ null;';
  if (!workerRaw.includes(placeholder)) {
    throw new Error(`Placeholder not found in meta-worker.js:\n${placeholder}`);
  }
  const output = workerRaw.replace(placeholder, renderFnSource);

  // Ensure dist directory exists, then write
  await mkdir(dirname(paths.workerOut), { recursive: true });
  await writeFile(paths.workerOut, output, 'utf8');

  console.log('✅ Wrote non-destructive build to', paths.workerOut);
})().catch(err => {
  console.error('❌ Build-worker failed:', err);
  process.exit(1);
});
