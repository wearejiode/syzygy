// apps/Core/Portfolio/sesame.jiode.one/templates/page.template.js
// DO NOT import this in the Worker at runtime.
// The build step will inline this function into meta-worker.js by replacing /*__RENDER_FUNCTION__*/
export function renderPage({ data, url, linksHtml, videoLink, imageLink }) {
  const INLINE_CSS = `/*__INLINE_CSS__*/`;
  const INLINE_CLIENT_JS = `/*__INLINE_CLIENT_JS__*/`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.title}</title>
  <meta name="description" content="${data.description}">
  <meta property="og:title" content="${data.title}">
  <meta property="og:description" content="${data.description}">
  <link rel="preload" as="image" href="${imageLink}">
  <meta property="og:image" content="${imageLink}">
  <meta property="og:image:secure_url" content="${imageLink}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:alt" content="${data.title}">
  <link rel="image_src" href="${imageLink}">
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url.href}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${data.title}">
  <meta name="twitter:description" content="${data.description}">
  <meta name="twitter:image" content="${imageLink}">
  <meta name="twitter:image:alt" content="${data.title}">
  <meta name="twitter:image:width" content="1200" />
  <meta name="twitter:image:height" content="630" />
  <!--
    Note: On iOS native share (Safari -> Messages), thumbnails may not display
    even when Open Graph tags are set correctly. This is a known limitation of iOS.
    Most other platforms (Twitter, LinkedIn, Chrome, etc.) render correctly.
  -->
  <meta name="theme-color" content="#1c1c1e" media="(prefers-color-scheme: dark)">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>"/>
  <style>${INLINE_CSS}</style>
</head>
<body>
  <div class="background-fallback"></div>
  <div id="snackbar" class="snackbar">✅ Link copied!</div>
  <div class="background"></div>
  <div class="info-container">
    <div class="info">
      <div class="info-content">
        <div class="title">${data.title}</div>
        <div class="summary-container">
          <div class="summary" id="summary1">
            <div class="summary-main">
              ${data.description}
            </div>
            <div class="summary-footer">
              <a href="https://fahrnbach.one" class="subtle-link">💖 Tools that spark creativity and connection.</a>
            </div>
          </div>
          <span class="read-more-toggle" data-target="summary1">Read more...</span>
        </div>
        <div class="video">
          <iframe
            width="100%"
            height="100%"
            src="${videoLink}"
            title="Intro Video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div class="link-grid">
          ${linksHtml}
        </div>
      </div>
    </div>
    <div class="share-container">
      <button class="share">
        <span class="share-text">✨ Share This Candidate ✨</span>
      </button>
    </div>
  </div>
  <script>${INLINE_CLIENT_JS}</script>
</body>
</html>`;
}
