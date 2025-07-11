# Blog Turborepo

Eine moderne, skalierbare Blog-Plattform als Monorepo mit Turborepo, Next.js (Frontend) und NestJS (Backend).

---

## Projektstruktur

```
blog-turborepo/
├── apps/
│   ├── api/    # NestJS Backend (Clean Architecture)
│   └── front/  # Next.js Frontend (Feature-Sliced Design)
├── package.json
└── turbo.json
```

---

## Architektur

- **Backend:** Clean Architecture (Domain, Application, Infrastructure, Interface)
- **Frontend:** Feature-Sliced Design (App, Features, Shared, Components)
- **Monorepo:** Turborepo orchestriert Builds, Linting und Dev-Server für alle Apps zentral aus dem Root.

---

## Schnellstart

### Voraussetzungen
- Node.js 18+
- npm 11+
- PostgreSQL (für Backend)

### Installation & Entwicklung

```bash
# Repository klonen
 git clone <repository-url>
 cd blog-turborepo

# Abhängigkeiten installieren (für alle Apps)
 npm install

# Umgebungsvariablen anlegen (siehe .env.example in apps/api und apps/front)
# Beispiel:
# cp apps/api/.env.example apps/api/.env
# cp apps/front/.env.example apps/front/.env

# Datenbank einrichten (optional)
 cd apps/api
 npx prisma migrate dev
 npx prisma db seed
 cd ../..

# Entwicklung für alle Apps parallel starten
 npm run dev
```

---

## Umgebungsvariablen

### Backend (`apps/api/.env`)

- Datenbank, Auth, OAuth, Secrets
- Beispiel:
  ```env
  DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
  JWT_SECRET=<dein-jwt-secret>
  JWT_EXPIRE_IN=24h
  GOOGLE_CLIENT_ID=<deine-google-client-id>
  GOOGLE_CLIENT_SECRET=<dein-google-client-secret>
  GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback
  FRONTEND_URL=http://localhost:3000
  ```

### Frontend (`apps/front/.env`)

- API-URL, Session Secret, Supabase Storage für Image Upload
- Beispiel:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:8000
  SESSION_SECRET_KEY=<dein-32-byte-session-key>
  SUPABASE_URL=<deine-supabase-url>
  SUPABASE_API_KEY=<dein-supabase-api-key>
  ```

#### 32-Byte Schlüssel generieren (z.B. für SESSION_SECRET_KEY)

Mit OpenSSL:
```bash
openssl rand -hex 32
```
Das erzeugt einen sicheren 32-Byte Schlüssel im Hex-Format.

#### Supabase für Image Upload
- Lege ein Supabase-Projekt an: https://app.supabase.com/
- Erstelle einen Storage Bucket für Bilder.
- Trage die `SUPABASE_URL` und `SUPABASE_API_KEY` in die `.env` des Frontends ein.

---

## Build & Deployment

- **Build für alle Apps:**
  ```bash
  npm run build
  ```
- **Linting:**
  ```bash
  npm run lint
  ```
- **Deployment:**
  - Monorepo-fähig (z.B. Vercel, Railway, Netlify)
  - Setze die Umgebungsvariablen im jeweiligen Deployment-Provider.

---

## Clean Architecture & Feature-Sliced Design

- **Backend:**
  - Trennung von Business-Logik, Infrastruktur und API
  - Erweiterbar durch Module (User, Post, Auth, etc.)
- **Frontend:**
  - Features sind eigenständige Slices
  - Gemeinsame Komponenten und Utilities im Shared-Layer

---

## Weiterführende Ressourcen
- [Clean Architecture (Uncle Bob)](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [NestJS Docs](https://docs.nestjs.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Turborepo Docs](https://turbo.build/repo/docs)

---