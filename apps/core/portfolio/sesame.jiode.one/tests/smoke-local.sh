#!/usr/bin/env bash
set -euo pipefail

HOST="${HOST:-localhost:8787}"

echo "→ Smoke test against http://${HOST}"

# Health
code=$(curl -s -o /dev/null -w "%{http_code}" "http://${HOST}/health")
echo "HTTP ${code} /health"
test "$code" = "200"

# R2 controls
curl -fsSL "http://${HOST}/__r2get" | grep -qi "GET: OK"
curl -fsSL "http://${HOST}/__r2list" | grep -qi "data.json" || echo "note: data.json not found in local list (ok if not seeded)"

# One image (if you seeded locally)
code=$(curl -s -o /dev/null -w "%{http_code}" "http://${HOST}/images/background.webp")
echo "HTTP ${code} /images/background.webp"

# Example command (edit host as needed)
# HOST=localhost:8787 apps/core/portfolio/sesame.jiode.one/tests/smoke-local.sh
