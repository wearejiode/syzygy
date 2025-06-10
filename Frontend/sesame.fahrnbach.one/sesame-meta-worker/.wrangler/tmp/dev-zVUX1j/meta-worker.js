var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-8yF3tD/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// meta-worker.js
var meta_worker_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cache = caches.default;
    if (url.pathname.startsWith("/images/")) {
      const key = url.pathname.slice(1);
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
    const dataObj = await env.SESAME_DATA.get("data.json");
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
        <a href="/assets/resume.pdf" target="_blank" class="btn primary">\u{1F680} Resume</a>
        <a href="https://calendly.com/jacob-fahrnbach/30min" target="_blank" class="btn tert">\u{1F4C5} Book Time</a>
        <a href="https://fahrnbach.one" target="_blank" class="btn secondary">\u2728 Portfolio</a>
      </div>
      <div class="flex-container-buttons">
        </br>
        <a href="https://www.linkedin.com/in/fahrnbach/" target="_blank" class="btn pent">\u{1F517} LinkedIn</a>
        <a href="https://github.com/fahrnbach" target="_blank" class="btn quat">\u{1F639} GitHub</a>
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
};

// ../../../../../.nvm/versions/node/v20.16.0/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../../.nvm/versions/node/v20.16.0/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-8yF3tD/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = meta_worker_default;

// ../../../../../.nvm/versions/node/v20.16.0/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-8yF3tD/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=meta-worker.js.map
