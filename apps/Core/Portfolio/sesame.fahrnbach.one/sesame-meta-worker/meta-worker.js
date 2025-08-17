//meta-worker.js
async function fetchHandler(request, env, ctx) {
  const url = new URL(request.url);
  const cache = caches.default;

  // 🔹 Serve image from R2 if path starts with /images/
  if (url.pathname.startsWith("/images/")) {
    const key = url.pathname.slice(1); // remove leading slash
    const object = await env.SESAME_DATA.get(key);
    if (!object) {
      return new Response("Image not found", { status: 404 });
    }

    return new Response(object.body, {
      headers: {
        "Content-Type": object.httpMetadata?.contentType || "image/webp",
        "Cache-Control": "no-store"
      }
    });
  }

  // 🔹 Otherwise, handle the HTML metadata page
  const dataObj = await env.SESAME_DATA.get('data.json');
  if (!dataObj) {
    return new Response("No data found", { status: 404 });
  }

  const json = await dataObj.text();
  const companyData = JSON.parse(json);

  const slug = url.pathname.slice(1).toLowerCase() || "open";

  let response = await cache.match(request);
  if (response) return response;

  const data = companyData[slug] || companyData["open"];

  const isVideoSlug = data.videoSlug

  const videoLink = isVideoSlug ? `https://www.youtube.com/embed/${data.videoSlug}` : `https://www.youtube.com/embed/dQw4w9WgXcQ`;

  const imageLink = isVideoSlug
    ? `https://img.youtube.com/vi/${data.videoSlug}/hqdefault.jpg`
    : `https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg`;

  const defaultLinks = [
    { label: "🚀 Resume", url: `https://resume.fahrnbach.one/${slug}`, style: "first" },
    { label: "✨ Portfolio", url: "https://fahrnbach.one", style: "second" },
    { label: "📅 Book Time", url: "https://calendly.com/jacob-fahrnbach/30min", style: "third" },
    { label: "💻 GitHub", url: "https://github.com/fahrnbach", style: "fourth" },
    { label: "🔗 LinkedIn", url: "https://linkedin.com/in/fahrnbach", style: "fifth" }
  ];

  const isValidLinks = Array.isArray(data.links) && data.links.length > 0;
  // Logic for automatically updating button styling?
  const links = isValidLinks ? data.links : defaultLinks;

  const linksHtml = links.map(link => `
    <a href="${link.url}" class="btn ${link.style}">${link.label}</a>
  `).join('');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.title}</title>
  <meta name="description" content="${data.description}">
  <meta property="og:title" content="${data.title}">
  <meta property="og:description" content="${data.description}">
  <meta property="og:image" content="${imageLink}">
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url.href}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${data.title}">
  <meta name="twitter:description" content="${data.description}">
  <meta name="twitter:image" content="${imageLink}">
  <meta name="twitter:image:width" content="1200" />
  <meta name="twitter:image:height" content="630" />
  <meta name="theme-color" content="#1c1c1e" media="(prefers-color-scheme: dark)">
  <link
  rel="icon"
  href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>"
/>
  <style>
    :root {
      --global-padding: 5%;
      --btn-radius: 8px;
      --bg-dark: #1c1c1e;
      --card-bg: #2c2c2eaa;
      --glass: rgba(255, 255, 255, 0.05);
      --text-light: #e5e5e7;
      --highlight: #ff5e57;
      --accent: #b2b2b2;
    }

    * {
      margin: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', sans-serif;
    }

    body, html {
      height: 100vh;
      width: 100vw;
      background-color: var(--bg-dark);
      background:
        radial-gradient(circle at center, #1c1c1e 0%, #0f0f10 100%),
        url('./public/Background.webp') no-repeat center center;
      background-size: cover;
      background-blend-mode: overlay;
    }

    html {
    background-color: #1c1c1e;
    }

    .background {
      position: absolute;
      display: flex;
      height: 100vh;
      width: 100vw;
      background: url('https://sesame.fahrnbach.one/images/background.webp') no-repeat center;
      background-repeat: repeat-y;
      background-size: 120%;
      z-index: 1;
    }

    .info-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .share-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64%;
      height: 10%;
      color: white;
      border: none;
      padding: 0.1rem .1rem;
      border-radius: var(--btn-radius);
      background-color: var(--share);
      background: linear-gradient(124deg, #ff0d00dd, #e82b1ddd, #e8a41ddd, #d7e81ddd, #1de864dd, #1de8e8dd, #311de8dd, #e700f3dd, #f300e7dd);
      animation: rainbow 42s ease infinite;
      background-size: 1900% 1900%;
      margin-bottom: 1rem;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
      transition: all 0.4s ease, box-shadow 0.4s ease;
    }


  .share-container:hover,
  .share-container:active {
        box-shadow: 0 0 50px rgba(255, 255, 255, 0.2);
        transform: scale(1.01);
    }

  @keyframes rainbow {
    0%{background-position:0% 80%}
    50%{background-position:100% 21%}
    100%{background-position:0% 80%}
  }

  .share {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-decoration: none;
    background-color: #1b1b1aaa;
    background: url('https://sesame.fahrnbach.one/images/background.webp') no-repeat center;
    background-repeat: repeat-y;
    background-size: 120%;
    color: white;
    font-weight: 600;
    padding: 0.75rem;
    border-radius: var(--btn-radius);
    transition: background 0.3s ease, transform 0.2s ease;
    cursor: pointer;
    border: none;
    width: calc(100% - 3px);
    height: calc(100% - 3px);
    opacity: 0.95;
    white-space: nowrap; /* Prevent wrapping */
    text-align: center;
    font-weight: 600;
    font-size: clamp(1.3rem, 3vw, 1.8rem);
  }

  .share-text {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    color: white;
    height: 100%;
    width: 100%;
    pointer-events: none;
    background: #00000000
  }

    .snackbar {
      position: absolute;
      width: 100vw;
      text-align: center;
      height: 50px;
      top: 0.1rem;
      visibility: hidden;
      color: white;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.4s ease, bottom 0.4s ease;
      font-size: .9 rem;
  }

  .snackbar.show {
    visibility: visible;
    opacity: 1;
    bottom: 50px;
  }

    .info {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      width: 64%;
      height: 85vh;
      overflow: hidden; /* stop the container from scrolling */
      margin: auto;

      background-color: rgba(28, 28, 30, 0.72);
      background-image:
        linear-gradient(90deg, #ffffff33, #ffffff, #ffffff33),
        url('https://sesame.fahrnbach.one/images/background.webp');
      background-size: cover;
      background-blend-mode: overlay;

      border: 1px solid var(--accent);
      border-radius: var(--btn-radius);
      color: var(--text-light);
      backdrop-filter: blur(6px);
      transition: all 0.4s ease;
      z-index: 2;
      box-shadow: 0 0 30px black;
      padding-bottom: 1rem;
    }

    .info-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      width: 100%;
      height: 100%;
      overflow-y: auto; /* scroll this, not the container */

      padding-right: var(--global-padding);
      padding-left: var(--global-padding);
      padding-top: 1rem;
      padding-bottom: 1rem;
      scrollbar-width: thin;
      scrollbar-color: #202020 #1c1c1e;
    }

    .info:hover,
    .info:active {
      box-shadow: 0 0 30px rgba(138, 43, 226, 0.4), 0 0 50px rgba(138, 43, 226, 0.2);
      transform: scale(1.01);
    }


    .info::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3rem; /* fade height */
      background: linear-gradient(to bottom, transparent, rgba(28,28,30,0.9));
      pointer-events: none;
    }


    .title {
      color: #ddd;
      text-align:center;
      font-size: clamp(1.5rem, 5.5vw, 2rem);
      margin-bottom: 1rem;
      font-weight: 800;
    }

    .summary {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: 13vh;
      max-height: 21vh;
      padding-top: .5rem;
      padding-left: .5rem;
      padding-right: .5rem;
      border-radius: var(--btn-radius);
      color: white;
      font-size: 1.1rem;
      text-align: center;
      white-space: normal;
      word-break: break-word;
      overflow-y: scroll;
      flex-shrink: 1;
      transition: max-height 0.3s ease, padding 0.3s ease;
      background: #ffffff11
    }

    .summary:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }

    .summary.expanded {
      max-height: none;
    }

    .summary-main {
      width: 100%;
      height: 90%;
    }

    .summary-footer{
      width: 100%;
      height: 10%;
      font-size: .75rem;
      padding-bottom: 1.5rem;
      padding-top: .5rem;
      padding-right: 1rem;
      text-align: end;
      align-self: center;
    }

    .subtle-link {
      text-decoration: none;
      color:#f0ffa6
    }

    .read-more-toggle {
      display: block;
      margin-top: 0.5rem;
      color: #007bff;
      cursor: pointer;
      font-weight: bold;
    }

    .video {
      width: 100%;
      aspect-ratio: 16 / 9;
      margin: 1rem 0;
    }

    .link-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: autofit , 1fr 1fr;
      justify-content: stretch;
      align-items: stretch;
      width: 100%;
    }

    .link-grid a:nth-child(4):nth-last-child(1) {
      grid-column: span 6;
    }

    .link-grid:has(.btn:only-child) .btn {
      grid-column: 1 / -1; /* span full row */
    }

    .link-grid:has(.btn:nth-child(2):nth-last-child(1)) .btn {
      grid-column: span 6; /* force two buttons to span full row if exactly 2 */
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      text-decoration: none;
      font-weight: 600;
      width: 100%;
      padding: 0.75rem;
      border-radius: var(--btn-radius);
      color: white;
      transition: background 0.3s ease, transform 0.2s ease;
      cursor: pointer;
      border: none;
    }

    .btn:focus-visible {
      outline: 2px solid #1e40afcc;
      outline-offset: 2px;
    }

    /* CTA — Button 2 */
    .second {
      background-color: #1e3a8acc;          /* Midnight Indigo */
      border: 1px solid #1e40afcc;
      grid-column: span 2;
    }
    .second:hover { background-color: #1e40afcc; transform: scale(1.05); }

    /* Neutral A — Buttons 1 & 5 & 6 */
    .first, .fifth, .sixth {
      background-color: #5b5075cc;          /* Muted slate/onyx (lighter) */
      border: 1px solid #727295ff;
    }
    .first:hover, .fifth:hover, .sixth:hover { background-color: #525272cc; transform: scale(1.05); }

    /* Neutral B — Buttons 3 & 4 & 8*/
    .third, .fourth, .eighth {
      background-color: #3a3a44cc;          /* Deeper slate (darker) */
      border: 1px solid #4a4a55cc;
    }
    .third:hover, .fourth:hover, .eighth:hover { background-color: #4a4a55cc; transform: scale(1.05); }

     /* Neutral C — Button 7 */
    .seventh{
      background-color: #75757bcc;          /* Light slate (darker) */
      border: 1px solid #6a6a72cc;
    }
    .seventh:hover { background-color: #636373cc; transform: scale(1.05); }

    .first  { grid-column: span 2; }
    .third  { grid-column: span 2; }
    .fourth { grid-column: span 3; }
    .fifth  { grid-column: span 3; }
    .sixth  { grid-column: span 2; }
    .seventh{ grid-column: span 2; }
    .eighth { grid-column: span 2; }


    .sparkle {
      position: absolute;
      width: 6px;
      height: 6px;
      pointer-events: none;
      background: radial-gradient(circle, #ffffffcc 0%, #8a2be2 40%, transparent 70%);
      border-radius: 50%;
      animation: fadeOut 0.6s ease-out forwards;
      z-index: 9999;
    }


    @keyframes fadeOut {
      from {
        transform: scale(1.4);
        opacity: 1;
      }
      to {
        transform: scale(0.2);
        opacity: 0;
      }
    }

    @media screen and (max-width: 1300px) {
      .info {
        width: 70vw;
      }
      .share-container {
        width: 70vw;
    }

    @media screen and (max-width: 850px) {
      .info {
        width: 75vw;
      }
      .share-container {
        width: 75vw;
    }
    }
    @media screen and (max-width: 750px) {

      body, html {
        height: 100dvh;
        width: 100vw;
        position: fixed;
      }

      .background {
        background-size: 250%;
      }

      .info-container {
        height: 100dvh;
      }

      .info {
        height: 80dvh;
        width: 90dvw;
        background-image: none;
      }

      .share-container {
        width: 90vw;
    }

      .share {
        font-size: clamp(1.1rem, 2.5vw, 1.3rem);
        width: calc(100% - 2px);
        height: calc(100% - 2px);
      }

      .link-grid {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .link-grid a:nth-child(4):nth-last-child(1) {
        grid-column: span 1;
      }

      /* Reorder: CTA first, then light → dark */
      .second { order: 1; }                          /* CTA on top */

      .first  { order: 2; background-color: #6b66a3cc; border-color: #8a86c1; }
      .first:hover  { background-color: #5f5a94cc; }

      .third  { order: 3; background-color: #5b5075cc; border-color: #727295ff; }
      .third:hover  { background-color: #525272cc; }

      .fourth { order: 4; background-color: #4a465dcc; border-color: #66627aff; }
      .fourth:hover { background-color: #42405acc; }

      .fifth  { order: 5; background-color: #3a364dcc; border-color: #56526aff; }
      .fifth:hover  { background-color: #32304acc; }

      .sixth  { order: 6; background-color: #2a2a3dcc; border-color: #46465aff; }
      .sixth:hover  { background-color: #22223acc; }

      .seventh { order: 7; background-color: #1c1c2dcc; border-color: #36364aff; }
      .seventh:hover { background-color: #161629cc; }

      .eighth { order: 8; background-color: #14141ecc; border-color: #343440ff; }
      .eighth:hover { background-color: #10101dcc; }

      .btn { width: 100%; }
  }
}
  </style>
</head>
<body>
  <div class="background-fallback">
  <div id="snackbar" class="snackbar">✅ Link copied!</div>
  <div class="background">
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
  </div>
</body>
<script>
  function initReadMoreToggles() {
    function handleToggleClick(evt) {
      const toggle = evt.currentTarget;
      const targetId = toggle.dataset.target;
      const summary = document.getElementById(targetId);
      if (!summary) return;

      const expanded = summary.classList.toggle('expanded');
      toggle.textContent = expanded ? 'Show less' : 'Read more';
    }

    document.querySelectorAll('.read-more-toggle').forEach((toggle) => {
      toggle.removeEventListener('click', handleToggleClick);
      toggle.addEventListener('click', handleToggleClick);
    });

    document.querySelectorAll('.summary').forEach((summary) => {
      if (summary.scrollHeight <= summary.clientHeight) {
        const toggle = summary.nextElementSibling;
        if (toggle && toggle.classList.contains('read-more-toggle')) {
          toggle.style.display = 'none';
        }
      }
    });
  }

  function handleMouseMove(e) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }

  function showSnackbar(message = '✅ Link copied!') {
    const bar = document.getElementById('snackbar');
    if (!bar) return;
    bar.textContent = message;
    bar.classList.add('show');
    setTimeout(() => bar.classList.remove('show'), 2500);
  }

  // Helper: Cross-platform copy-to-clipboard with legacy fallback
  async function copyLinkToClipboard(url) {
    // Try modern Clipboard API first (requires HTTPS + user gesture)
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch (e) {
        // fall through to legacy path
      }
    }

    // Legacy fallback for iOS/Safari quirks
    const input = document.createElement('input');
    input.value = url;
    input.setAttribute('readonly', '');
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);

    // Preserve selection
    const selection = document.getSelection();
    const range = selection && selection.rangeCount ? selection.getRangeAt(0) : null;

    input.select();
    input.setSelectionRange(0, input.value.length);
    const ok = document.execCommand && document.execCommand('copy');

    document.body.removeChild(input);
    if (range) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
    return !!ok;
  }

  function initShareButton() {
    const shareBtn = document.querySelector('.share');
    if (!shareBtn) return;

    let handling = false; // guard against double-fire on touchend + click

    async function doShare(evt) {
      if (handling) return;
      handling = true;
      const shareData = {
        title: document.title || 'Candidate Profile',
        text: "Here’s Jiō Azul’s profile — includes resume, cover letter, and intro video.",
        url: window.location.href,
      };

      // Prefer native share when available (iOS Safari shows sheet on touch)
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          handling = false;
          return; // success or user completed share — nothing else to do
        } catch (err) {
          // If user cancels, do nothing (don’t claim success)
          const msg = String(err && (err.name || err.message || err));
          if (/Abort|cancel/i.test(msg)) {
            handling = false;
            return;
          }
          // Otherwise, attempt clipboard copy
        }
      }

      const ok = await copyLinkToClipboard(shareData.url);
      if (ok) {
        showSnackbar('✅ Link copied!');
      } else {
        showSnackbar('⚠️ Couldn’t copy link. Tap and hold to copy, or share manually.');
      }
      handling = false;
    }

    // iOS sometimes ties clipboard permission more strongly to touch events — wire both
    shareBtn.addEventListener('touchend', doShare, { passive: true });
    shareBtn.addEventListener('click', doShare);
  }


  function initPage() {
    initReadMoreToggles();
    initShareButton();
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', initPage);
</script>
</html>`;

  response = new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "no-store"
    }
  });

  ctx.waitUntil(cache.put(request, response.clone()));
  return response;
}

export default { fetch: fetchHandler };
