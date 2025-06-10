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
  <meta property="og:image" content="${data.image}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url.href}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${data.title}">
  <meta name="twitter:description" content="${data.description}">
  <meta name="twitter:image" content="${data.image}">
  <style>
    :root {
      --global-padding: 5%;
      --btn-radius: 10px;
      --bg-dark: #1c1c1e;
      --card-bg: #2c2c2eaa;
      --glass: rgba(255, 255, 255, 0.05);
      --text-light: #e5e5e7;
      --highlight: #ff5e57;
      --accent: #58a6ff;
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
    }

    .background {
      position: absolute;
      display: flex;
      height: 100vh;
      width: 100vw;
      background: url('https://sesame.fahrnbach.one/images/background.webp') no-repeat center;
      background-size: 120%;
      z-index: 1;
    }

    .info {
      position: relative;
      width: 42%;
      height: 85vh;
      margin: auto;
      padding: var(--global-padding);

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      background-color: rgba(28, 28, 30, 0.72);
      background-image:
        linear-gradient(to bottom right, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.1)),
        url('./assets/eclipse-orange-glow.jpg');
      background-size: cover;
      background-blend-mode: overlay;

      border-radius: 20px;
      color: var(--text-light);
      border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(6px);
      transition: all 0.4s ease;
      z-index: 2;
    }

    .info:hover,
    .info:active {
      box-shadow: 0 0 30px rgba(138, 43, 226, 0.4), 0 0 50px rgba(138, 43, 226, 0.2);
    }

    .summary {
      width: 100%;
      padding: var(--global-padding);
      border-radius: 10px;
      border: 2px solid var(--accent);
      color: white;
      font-size: 1.1rem;
      text-align: center;
      white-space: normal;
      word-break: break-word;
      overflow-y: scroll;
      flex-shrink: 1;
      transition: max-height 0.3s ease, padding 0.3s ease;
    }

    .summary:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }

    .video {
      width: 100%;
      aspect-ratio: 16 / 9;
      margin: 1rem 0;
    }

    .flex-container-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      width: 100%;
    }

    .btn {
      text-decoration: none;
      font-weight: 600;
      text-align: center;
      width: 30%;
      padding: 0.75rem;
      border-radius: var(--btn-radius);
      color: white;
      transition: background 0.3s ease, transform 0.2s ease;
      cursor: pointer;
      border: none;
    }

    .primary { background-color: var(--highlight); }
    .primary:hover { background-color: #ff2e1f; transform: scale(1.05); }
    .secondary { background-color: var(--accent); }
    .secondary:hover { background-color: #3b8ed4; transform: scale(1.05); }
    .tert { background-color: #8b5cf6; }
    .tert:hover { background-color: #7c3aed; transform: scale(1.05); }
    .quat { background-color:#1b1a1e; }
    .quat:hover { background-color:#3f3d44; transform: scale(1.05); }
    .pent { background-color:#4b4a4e; }
    .pent:hover { background-color:#77747b; transform: scale(1.05); }

    @media screen and (max-width: 850px) {
      .background {
        background-size: 400%;
      }
      .info {
        width: 85vw;
        height: 90vh;
        padding: 1rem;
      }
      .flex-container-buttons {
        flex-direction: column;
        gap: 0.75rem;
      }
      .btn {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="background">
    <div class="info">
      <div class="summary">${data.description}</div>
      <div class="video">
        <iframe
          width="100%"
          height="100%"
          src="${data.video}"
          title="Intro Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
      <div class="flex-container-buttons">
        <a href="/assets/resume.pdf" target="_blank" class="btn primary">🚀 Resume</a>
        <a href="https://calendly.com/jacob-fahrnbach/30min" target="_blank" class="btn tert">📅 Book Time</a>
        <a href="https://fahrnbach.one" target="_blank" class="btn secondary">✨ Portfolio</a>
      </div>
      <div class="flex-container-buttons">
        </br>
        <a href="https://www.linkedin.com/in/fahrnbach/" target="_blank" class="btn pent">🔗 LinkedIn</a>
        <a href="https://github.com/fahrnbach" target="_blank" class="btn quat">😹 GitHub</a>
      </div>
    </div>
  </div>
</body>
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