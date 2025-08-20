const renderPage = /*__RENDER_FUNCTION__*/ null;
async function fetchHandler(request, env, ctx) {
  const url = new URL(request.url);
  const cache = caches.default;

  // ---

  // Health + diagnostics
  if (url.pathname === '/__health') return new Response('Healthy :0', { status: 200 });
  if (url.pathname === '/__r2') {
    try {
      const head = await env.SESAME_DATA.head('data.json');
      return new Response(head ? 'data.json: OK' : 'data.json: MISSING', { status: 200 });
    } catch (e) {
      return new Response('R2 error: ' + e.message, { status: 500 });
    }
  }

  // Redirect root → /open
  if (url.pathname === '/' || url.pathname === '') {
    return Response.redirect(new URL('/open', url), 302);
  }

  // List keys in the bucket (debug)
if (url.pathname === '/__r2list') {
  const list = await env.SESAME_DATA.list({ prefix: '' });
  const keys = (list?.objects || []).map(o => o.key);
  return new Response(JSON.stringify({ keys }, null, 2), {
    status: 200, headers: { 'content-type': 'application/json' }
  });
}

// Seed data.json directly into the exact bucket dev is using
if (url.pathname === '/__seed' && request.method === 'POST') {
  try {
    const body = await request.text();
    await env.SESAME_DATA.put('data.json', body, {
      httpMetadata: { contentType: 'application/json' }
    });
    return new Response('Seeded data.json', { status: 201 });
  } catch (e) {
    return new Response('Seed error: ' + e.message, { status: 500 });
  }
}

// Quick read check
if (url.pathname === '/__r2get') {
  const obj = await env.SESAME_DATA.get('data.json');
  return new Response(obj ? 'GET: OK' : 'GET: MISSING', { status: 200 });
}

  // ---

  // 🔒 Early cache check (skips images & diagnostics, catches HTML routes)
  const cached = await cache.match(request);
  if (cached) return cached;

  // Images passthrough from R2
  if (url.pathname.startsWith('/images/')) {
    const key = url.pathname.slice(1);
    const object = await env.SESAME_DATA.get(key);
    if (!object) return new Response('Image not found', { status: 404 });
    return new Response(object.body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || 'image/webp',
        'Cache-Control': 'no-store'
      }
    });
  }

  // Load data.json safely
  const dataObj = await env.SESAME_DATA.get('data.json');
  if (!dataObj) return new Response('No data found', { status: 404 });

  let companyData;
  try {
    companyData = JSON.parse(await dataObj.text());
  } catch {
    return new Response('Invalid data.json', { status: 500 });
  }

  // Slug handling: /foo → "foo"
  const rawSlug = url.pathname.replace(/^\//, '').replace(/\/$/, '');
  const slug = decodeURIComponent(rawSlug || 'open').toLowerCase();

  // Try multiple shapes: map-of-slugs, explicit keys, or a flat object (single page)
  const dataCandidates = [
    companyData?.[slug],
    companyData?.open,
    companyData?.default,
    (companyData && typeof companyData === 'object' && (
      'title' in companyData || 'description' in companyData || 'links' in companyData
    )) ? companyData : null,
  ];
  const data = dataCandidates.find(Boolean);

  if (!data) {
    return new Response(`Not found: no content for slug "${slug}"`, { status: 404 });
  }

  const videoSlug = data.videoSlug || null;
  const videoLink = videoSlug ? `https://www.youtube.com/embed/${videoSlug}` : (data.video || '');
  const imageLink = videoSlug ? `https://img.youtube.com/vi/${videoSlug}/hqdefault.jpg` : (data.image || '');

  const defaultLinks = [
    { label: '🚀 Resume', url: `https://resume.fahrnbach.one/${slug}`, style: 'first' },
    { label: '✨ Portfolio', url: 'https://fahrnbach.one', style: 'second' },
    { label: '📅 Book Time', url: 'https://calendly.com/jacob-fahrnbach/30min', style: 'third' },
    { label: '💻 GitHub', url: 'https://github.com/fahrnbach', style: 'fourth' },
    { label: '🔗 LinkedIn', url: 'https://linkedin.com/in/fahrnbach', style: 'fifth' },
  ];

  const linksList = Array.isArray(data.links) && data.links.length > 0 ? data.links : defaultLinks;
  const linksHtml = linksList
    .map((link) => {
      const href = link.href || link.url || '#';
      const cls = link.style ? ` ${link.style}` : '';
      const label = link.label || href;
      return `<a href="${href}" class="btn${cls}">${label}</a>`;
    })
    .join('');

  const html = renderPage({ data, url, linksHtml, videoLink, imageLink });
  const response = new Response(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'no-store' }
  });

  ctx.waitUntil(cache.put(request, response.clone()));
  return response;
}

export default { fetch: fetchHandler };
