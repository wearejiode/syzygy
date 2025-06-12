export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cache = caches.default;

    const slug = url.pathname.slice(1).toLowerCase() || "default";
    const key = `resumes/${slug}.pdf`;

    // 🔹 Try to fetch the specific resume or fallback to default
    const object = await env.RESUME_DATA.get(key)
                 ?? await env.RESUME_DATA.get("resumes/default.pdf");

    // If PDF is found (either the specific or fallback), serve it
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

    // 🔸 Optional: if not found at all, serve HTML fallback
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jacob Fahrnbach - Resume</title>
  <meta property="og:title" content="Jacob Fahrnbach — Resume">
  <meta property="og:description" content="Download a tailored resume for your company. Crafted with care.">
  <meta property="og:image" content="https://resume.fahrnbach.one/images/default-preview.webp">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url.href}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Jacob Fahrnbach — Resume">
  <meta name="twitter:description" content="See a customized resume built just for you.">
  <meta name="twitter:image" content="https://resume.fahrnbach.one/images/default-preview.webp">
</head>
<body>
  <h1 style="text-align:center;">Resume not found.</h1>
  <p style="text-align:center;">Try a different URL or contact Jacob.</p>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "no-store"
      }
    });
  }
}