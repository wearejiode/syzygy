# 🚪 Gateway Server

A minimal Node.js-based gateway server to route requests to microservices or dummy APIs — designed for use with Docker, Traefik, and Kubernetes.

## 🧱 Project Structure

```
.
├── Dockerfile
├── gateway.js
├── k8s
│   ├── deployment.yaml
│   └── service.yaml
├── package.json
├── routes
│   ├── one.js
│   ├── two.js
│   └── three.js
├── traefik
│   └── traefik.yml
└── .dockerignore
```

## 🚀 Running with Docker Compose

```
docker-compose up --build
```

Then visit:
- Gateway: http://localhost:3000/one

Traefik dashboard (optional):
- http://localhost:8080/dashboard/

## ⚙️ K8s Quick Start (Minikube)

```
kubectl apply -f k8s/
```

Expose using:
```
minikube service gateway-service
```

## 🔐 Notes

- Customize routes in the `routes/` directory.
- Traefik configuration is found in `traefik/traefik.yml`.
- This setup is designed to be swapped into Go or extended with middleware later.

---
Made with ☕️ + ❤️ by [Jacob Fahrnbach](https://fahrnbach.one)
