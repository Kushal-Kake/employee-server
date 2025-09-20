# Employee Data API (Server)

This is the backend service for the Employee Data Generation & Visualization project.  
It provides REST APIs for authentication, employee data management, and analytical summaries.

---

## 🚀 Features

- Auto-seeds employee data on startup
- JWT Authentication (register/login)
- REST API endpoints for employee CRUD operations
- PostgreSQL integration (via Docker)
- Swagger / OpenAPI documentation
- Data filtering & pagination

---

## 🛠️ Tech Stack

- **Node.js**
- **NestJS**
- **PostgreSQL**
- **pnpm**
- **TypeORM**

---

## 📂 Project Setup

### 1. Clone Repository

```bash
git clone <server-repo-url>
cd <server-folder>

docker compose -f compose-dev.yaml up -d

pnpm install

pnpm start:dev
```
