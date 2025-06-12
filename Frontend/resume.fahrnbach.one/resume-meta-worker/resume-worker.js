export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cache = caches.default;

    // 📷 Serve images (HEAD or GET)
    if ((request.method === "HEAD" || request.method === "GET") && url.pathname.startsWith("/images/")) {
      const key = url.pathname.slice(1);
      const object = await env.RESUME_DATA.get(key);
      if (!object) {
        return new Response("Image not found", { status: 404 });
      }

      const headers = {
        "Content-Type": object.httpMetadata?.contentType || "image/png",
        "Cache-Control": "public, max-age=86400"
      };

      return new Response(request.method === "HEAD" ? null : object.body, {
        status: 200,
        headers
      });
    }

    // 🕵️ Check for bot user-agent
    const userAgent = request.headers.get("user-agent") || "";
    const isBot = /facebookexternalhit|twitterbot|linkedinbot|discordbot|slackbot|whatsapp|telegram|embedly/i.test(userAgent);

    const slug = url.pathname.slice(1).toLowerCase() || "resume";
    const key = `resumes/${slug}.pdf`;

    // 👾 Serve HTML preview metadata for bots
    if (isBot) {
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jacob Fahrnbach — Resume</title>
  <meta property="og:title" content="✨ Jacob Fahrnbach — Resume ✨">
  <meta property="og:description" content="Download a tailored resume for your company. Crafted with care.">
  <meta property="og:image" content="https://resume.fahrnbach.one/images/hotlink-ok/default-preview.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url.href}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Jacob Fahrnbach — Resume">
  <meta name="twitter:description" content="See a customized resume built just for you.">
  <meta name="twitter:image" content="https://resume.fahrnbach.one/images/hotlink-ok/default-preview.png">
</head>
<body></body>
</html>`;

      const response = new Response(html, {
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
          "Cache-Control": "no-store"
        }
      });

      ctx.waitUntil(cache.put(request, response.clone()));
      return response;
    }

    // 📄 Serve PDF resume
    const object = await env.RESUME_DATA.get(key)
                 ?? await env.RESUME_DATA.get("resumes/resume.pdf");

    if (object) {
      const filename = `jacob_fahrnbach_${slug}.pdf`;
      return new Response(object.body, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${filename}"`,
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    // 🛑 Fallback if nothing found
    return new Response("Resume not found", { status: 404 });
  }
}