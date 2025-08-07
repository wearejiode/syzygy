export default {
  async fetch(request, env) {
		let url;
    try {
      url = new URL(request.url);
      console.log("PATH:", url.pathname);
    } catch (err) {
      return new Response("Failed parsing URL", { status: 500 });
    }

if (url.pathname === "/frame") {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta property="og:title" content="Cherry Drop" />
  <meta property="og:image" content="https://cherry.jiode.one/images/cherry.webp" />
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="https://cherry.jiode.one/images/cherry.webp" />
  <meta property="fc:frame:image:aspect_ratio" content="1:1" />
  <meta property="fc:frame:button:1" content="Join the Drop" />
  <meta property="fc:frame:button:1:action" content="link" />
  <meta property="fc:frame:button:1:target" content="https://cherry.jiode.one" />
</head>
<body>
  <p>If you see this, you're outside a Farcaster Frame. Visit <a href="https://cherry.jiode.one">our site</a> to learn more.</p>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}

		// A. Use Wrangler secrets (recommended for real deployments)
		// wrangler secret put ADMIN_KEY
		// some-really-secret-admin-token
		const ADMIN_KEY = "testkey123";
		const adminHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
	<meta property="og:title" content="Cherry Drop" />
  <meta property="og:image" content="https://cherry.jiode.one/images/cherry.jpg" />
  <title>Signups Dashboard</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #111; color: #fff; }
    h1 { color: #ffc857; }
    ul { list-style: none; padding: 0; }
    li { display: flex; justify-content: space-between; margin: 0.5rem 0; border-bottom: 1px solid #333; padding: 0.5rem; }
    a { display: flex; justify-content: space-between; align-self: end; border: 2px solid #ffc857; padding: 0.25rem 0.5rem; color: #ffc857; text-decoration: none; border-radius: 4px; }
    a:hover { background: #ffc85733; transform: scale(1.05); transition: all 0.2s ease; }
  </style>
</head>
<body>
  <h1>📬 Signup Emails</h1>
  <ul id="email-list">Loading...</ul>
  <script>
	function createMailtoLink(email) {
  const subject = "Welcome to Jiode ✨";
  const body = \`Hi there!

Thanks for signing up for early access to our magical little project. We\'ll be in touch soon with something special.

— Jacob\`;

  const href = \`mailto:\${email}?subject=\${encodeURIComponent(subject)}&body=\${encodeURIComponent(body)}\`;

  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.textContent = "✉️ Send Reply";

  return a;
}
fetch('/list-emails?key=' + encodeURIComponent(new URLSearchParams(window.location.search).get('key')))
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('email-list');
    list.innerHTML = '';
    data.forEach(({ key, email }) => {
			const li = document.createElement('li');
			li.textContent = email;

			const mailtoLink = createMailtoLink(email);
			mailtoLink.style.textDecoration = 'none';
			mailtoLink.style.alignSelf = 'end';
			li.appendChild(mailtoLink);

			list.appendChild(li);
    });
  });
  </script>
</body>
</html>
`;

const loginHTML = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Signups Dashboard</title>
		<style>
			body { font-family: sans-serif; background: #111; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; }
		</style>
	</head>
	<body>
		<script>
			const key = prompt("Enter admin key:");
			if (key) location.href = \`/admin?key=\${encodeURIComponent(key)}\`;
		</script>
	</body>
	</html>
	`;

if (url.pathname === "/login") {
	return new Response(loginHTML, {
		headers: { "Content-Type": "text/html; charset=utf-8" }
	});
}

if (url.pathname === "/admin") {
	const key = url.searchParams.get("key");
  const validKey = env.ADMIN_KEY || ADMIN_KEY; // for local testing

  if (key !== validKey) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(adminHTML, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}

if (url.pathname === "/list-emails") {
  const key = url.searchParams.get("key");
  const validKey = env.ADMIN_KEY || ADMIN_KEY;

  if (key !== validKey) {
    return new Response("Unauthorized", { status: 401 });
  }

  const list = await env.EMAILS.list();
  const results = [];

  for (const k of list.keys) {
    const email = await env.EMAILS.get(k.name);
    results.push({ key: k.name, email });
  }

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}

    if (request.method === "POST" && request.headers.get("content-type")?.includes("application/json")) {
      let body;
      try {
        body = await request.json();
      } catch {
        return new Response("Invalid JSON", { status: 400 });
      }

      const email = body.email?.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response("Invalid email", { status: 400 });
      }

      const timestamp = Date.now();
      try {
				console.log("Saving to KV:", email);
				console.log(env.EMAILS)
				await env.EMAILS.put(`email:${timestamp}`, email);
				console.log("Saved.");

      } catch (err) {
        return new Response("Failed to save email", { status: 500 });
      }

      return new Response("Email saved. Thank you!", { status: 200 });
    }

    return new Response("Method not allowed", { status: 405 });
  }
};
