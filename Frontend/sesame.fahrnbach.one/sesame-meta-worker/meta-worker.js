//meta-worker.js
export default {
  async fetch(request, env, ctx) {
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
      { label: "🚀 Resume", url: "https://resume.fahrnbach.one", style: "first" },
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
  <style>
    :root {
      --global-padding: 5%;
      --btn-radius: 10px;
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

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      position: relative;
      width: 42%;
      height: 85vh;
      overflow-y: scroll;
      margin: auto;
      padding-right: var(--global-padding);
      padding-left: var(--global-padding);
      padding-top: 1rem;
      padding-top: 1rem;

      background-color: rgba(28, 28, 30, 0.72);
      background-image:
        linear-gradient(90deg, #ffffff33, #ffffff, #ffffff33),
        url('https://sesame.fahrnbach.one/images/background.webp');
      background-size: cover;
      background-blend-mode: overlay;

      border: 1px solid var(--accent);
      border-radius: 20px;
      color: var(--text-light);
      backdrop-filter: blur(6px);
      transition: all 0.4s ease;
      z-index: 2;
      box-shadow: 0 0 30px black;
    }

    .info:hover,
    .info:active {
      box-shadow: 0 0 30px rgba(138, 43, 226, 0.4), 0 0 50px rgba(138, 43, 226, 0.2);
    }

    .title {
      color: #ddd;
      text-align:center;
      font-size: clamp(1.5rem, 5.5vw, 2rem);
      margin-bottom: 1rem;
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
      border-radius: 10px;
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

    .summary-main {
      width: 100%
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

    .first { background-color: var(--highlight); grid-column: span 2;}
    .first:hover { background-color: #ff2e1f; transform: scale(1.05); }
    .second { background-color: var(--accent); grid-column: span 2;}
    .second:hover { background-color: #3b8ed4; transform: scale(1.05); }
    .third { background-color: #8b5cf6; grid-column: span 2;}
    .third:hover { background-color: #7c3aed; transform: scale(1.05); }
    .fourth { background-color:#1b1a1e; grid-column:span 3;}
    .fourth:hover { background-color:#3f3d44; transform: scale(1.05); }
    .fifth { background-color:#4b4a4e; grid-column:span 3;}
    .fifth:hover { background-color:#77747b; transform: scale(1.05); }


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

    @media screen and (max-width: 1000px) {
      .info {
        width: 70vw;
      }

    @media screen and (max-width: 850px) {
      .info {
        width: 75vw;
      }
    @media screen and (max-width: 750px) {
      .background {
        background-size: 250%;
      }
      .info {
        width: 85vw;
        height: 90vh;
      }
      .link-grid {
        grid-template-columns: 1fr;
        grid-auto-flow: row;
        align-items: stretch;
        justify-items: center;
      }

      .link-grid a:nth-child(4):nth-last-child(1) {
        grid-column: span 1;
      }

      .first,
      .second,
      .third,
      .fourth,
      .fifth {
        grid-column: span 1;
      }

      .btn {
        width: 100%;
      }
    }
}
  </style>
</head>
<body>
  <div class="background-fallback">
  <div class="background">
    <div class="info">
      <div class="title">${data.title}</div>
      <div class="summary">
        <div class="summary-main">
        ${data.description}
        </div>
        <div class="summary-footer">
          <a href="https://fahrnbach.one" class="subtle-link">💖 Tools that spark creativity and connection.</a>
        </div>
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
</body>
<script>
  document.addEventListener("mousemove", (e) => {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }, {passive: true});
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
}
