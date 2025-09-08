# 🎬 Anime Streaming App

An **anime streaming demo application** built with modern web technologies, designed as a portfolio showcase.  
The app demonstrates a **full-stack streaming platform** with clean architecture, containerized deployment, and modern developer experience.

---

## 🚀 Tech Stack

- **Frontend**: [Remix](https://remix.run/) – SSR + routing + forms
- **Backend API**: [ElysiaJS](https://elysiajs.com/) – lightweight Bun web framework
- **Runtime**: [Bun](https://bun.sh/) – blazing fast JavaScript runtime
- **Database**: PostgreSQL 15 (containerized)
- **Containerization**: [Podman](https://podman.io/) + `compose.yml` for orchestration
- **CI/CD**: GitHub Actions with `act` for local testing

---

## 📂 Project Structure

```
.
├── backend/             # ElysiaJS server code
├── frontend/            # Remix application
├── compose.yml          # Multi-service orchestration (backend + frontend + db)
├── .containerignore     # Files ignored in container builds
├── .github/workflows/   # CI pipelines
└── README.md
```

---

## 🛠️ Getting Started

### 1. Clone the repo

```sh
git clone https://github.com/your-username/anime-streaming.git
cd anime-streaming
```

### 2. Install dependencies

We use **Bun** instead of Node:

```sh
bun install
```

### 3. Run with Podman Compose

Start backend + database:

```sh
podman compose up
```

### 4. Access the app

- Frontend: `http://localhost:3000`
- API: `http://localhost:4000`

---

## 🧪 Development

Run backend server in dev mode:

```sh
cd backend
bun dev
```

Run frontend in dev mode:

```sh
cd frontend
bun dev
```

Lint & format:

```sh
bun check
```

---

## 🧰 CI/CD

We use **GitHub Actions** for builds & tests.  
You can test workflows locally with [act](https://github.com/nektos/act):

```sh
act
```

---

## 🌟 Features

TODO

---

## 📜 License

This project is licensed under MIT License.
MIT License © 2025 Andriana Hadi
