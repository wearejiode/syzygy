# Infrastructure README

This folder contains all infrastructure-related services and configuration for the Fahrnbach.one monorepo, including:

- 🧭 Gateway Server (Node.js with Express)
- 🚏 Traefik reverse proxy
- ⚙️ Kubernetes YAML manifests (for production deployment)
- 🧪 Docker Compose setup (for local testing and development)

---

## 🔧 Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- `.env` file with ports and email set (example provided)

---

## 📁 Folder Structure

```
Infrastructure/
├── gateway-server/           # Node.js Gateway service
├── k8s/                      # K8s deployment/service
├── node_modules/             # Local dependencies
├── traefik/                  # Traefik config
├── .env                      # Environment config
└── compose.yml               # Docker Compose file
```

---

## 🚀 Running Locally

```bash
docker compose --env-file .env up --build
```

- Visit `http://localhost:<GATEWAY_PORT>` to access the Gateway directly
- Visit `http://localhost:<TRAEFIK_DASHBOARD>` for Traefik dashboard

### 🩺 Health Checks

Basic endpoint health is accessible via:
- `GET /one`, `/two`, `/three` routes

(Coming soon: unified `/health` endpoint)

---

## 🛡️ HTTPS (Auto Certs via Traefik)

Traefik is configured to request certificates automatically using Let’s Encrypt via TLS challenge. Ensure port 443 is accessible for production.

---

## ☁️ Kubernetes Deployment

Manifests provided under `k8s/` folder:
- `deployment.yaml`
- `service.yaml`

These are a good starting point for deploying infrastructure into EKS, GKE, or DigitalOcean Kubernetes.

---

## ✨ Coming Soon

- [ ] `/genie` route for Genie Assistant
- [ ] Admin Panel reverse proxy
- [ ] Logging middleware
- [ ] GitHub Actions for CI/CD
- [ ] Self-healing service logic
