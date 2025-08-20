export default {
  async fetch(request: Request, env: { ASSETS: Fetcher }): Promise<Response> {
    const url = new URL(request.url);
    const acceptsHTML = request.headers.get('accept')?.includes('text/html');

    // If it's an HTML navigation (SPA route) or path without a file extension,
    // always serve index.html with no-store to avoid hydration/cache mismatches.
    if (acceptsHTML && !url.pathname.includes('.')) {
      const indexURL = new URL('/index.html', url);
      const res = await env.ASSETS.fetch(new Request(indexURL, request));
      // clone with anti-cache headers
      return new Response(res.body, {
        status: res.status,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, must-revalidate',
        },
      });
    }

    // Otherwise serve the static asset normally
    const res = await env.ASSETS.fetch(request);
    if (res.status !== 404) return res;

    // Fallback: SPA deep-link -> index.html
    const indexURL = new URL('/index.html', url);
    const indexRes = await env.ASSETS.fetch(new Request(indexURL, request));
    return new Response(indexRes.body, {
      status: indexRes.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  },
};
