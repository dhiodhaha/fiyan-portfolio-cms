# Fiyan Portfolio

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/egenhets-projects/fiyan)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)

This is a modern portfolio website built with **Next.js 16**, **React 19**, **Tailwind CSS**, and **Payload CMS**. Portfolio projects are managed in Payload, stored in **Neon Postgres**, and media is stored in **Cloudflare R2**.

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 20.x or later
- **Package Manager**: [pnpm](https://pnpm.io/) (recommended)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd fiyan-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Prepare environment variables:**
    ```bash
    cp .env.example .env.local
    ```

    Fill the values described in [Environment Variables](#environment-variables).

4.  **Run database migrations:**
    ```bash
    pnpm run payload:migrate
    ```

5.  **Import existing hardcoded portfolio content and images:**
    ```bash
    pnpm run payload:seed
    ```

    This reads `data/projects.ts`, `data/project-images.ts`, and `public/projects/**`, then creates Payload project/media records and uploads media to R2. The script is idempotent by project `slug` and media `filename`.

6.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the site.

Payload admin is available at [http://localhost:3000/admin](http://localhost:3000/admin).

## Environment Variables

Create `.env.local` for local development and add the same values to Vercel Project Settings for Preview/Production.

```bash
DATABASE_URL=
PAYLOAD_SECRET=

R2_BUCKET=
R2_ENDPOINT=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_PUBLIC_URL=
```

### Required Values

- `DATABASE_URL`: Neon Postgres connection string. Use the pooled Neon connection string for Vercel unless you have a reason to use direct connections.
- `PAYLOAD_SECRET`: Long random secret used by Payload for auth/session encryption. Generate with `openssl rand -base64 32`.
- `R2_BUCKET`: Cloudflare R2 bucket name, for example `fiyan-portfolio-media`.
- `R2_ENDPOINT`: Cloudflare R2 S3 API endpoint, usually `https://<account-id>.r2.cloudflarestorage.com`.
- `R2_ACCESS_KEY_ID`: R2 API token access key with read/write access to the bucket.
- `R2_SECRET_ACCESS_KEY`: R2 API token secret key.
- `R2_PUBLIC_URL`: Public R2/custom-domain base URL with no trailing slash, for example `https://media.example.com`.

### Cloudflare R2 Notes

- Configure the R2 bucket for public reads through a custom domain or public bucket URL.
- `R2_PUBLIC_URL` is what the frontend uses for images.
- `R2_ENDPOINT` is the private S3-compatible API endpoint used by Payload uploads.
- If using Payload direct browser uploads later, add R2 CORS rules for your Vercel domain. Current server-side seeding/uploads use the server credentials.

### First Production Setup

1. Add all environment variables in Vercel.
2. Deploy the app.
3. Run `pnpm run payload:migrate` with the production `DATABASE_URL`.
4. Run `pnpm run payload:seed` once with production Neon/R2 env vars.
5. Open `/admin` and create the first Payload user.

## 🛠️ Contribution Guidelines (Read Carefully!)

We welcome contributions! However, to keep the codebase clean and stable, please adhere to the following rules:

### 1. DRY Principle (Don't Repeat Yourself)
- **Reusable Components:** If you find yourself copying JSX, create a component in `components/ui/`.
- **Centralized Content:**
    - Production project content lives in Payload CMS.
    - `data/projects.ts` and `data/project-images.ts` are legacy seed/fallback sources only.
    - **DO NOT** hardcode portfolio content in page files. Add/edit projects and media in Payload.

### 2. Next.js 16 Compatibility
We are running on the latest **Next.js 16**.
- **Async Params:** In `page.tsx` or `layout.tsx`, dynamic route parameters (`params`) and `searchParams` are **Promises**. You MUST `await` them before use.
    ```tsx
    // CORRECT ✅
    export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
      const { slug } = await params;
      // ...
    }

    // INCORRECT ❌ (Will break in Next.js 15+)
    export default function Page({ params }: { params: { slug: string } }) {
      const slug = params.slug;
    }
    ```
- **Proxy over Middleware:** We use `proxy.ts` instead of `middleware.ts` where applicable for simple rewrites, though Next.js middleware conventions are still evolving.

### 3. Project Structure
- `app/`: App Router pages and layouts.
    - `app/(payload)/`: Payload admin and API route handlers.
- `components/`: React components.
    - `ui/`: Generic UI elements (buttons, inputs, cards).
- `collections/`: Payload collection definitions.
- `data/`: Legacy seed/fallback data sources.
- `lib/projects-cms.ts`: Payload-backed project query adapter with static fallback.
- `migrations/`: Payload Postgres migrations.
- `scripts/seed-payload.ts`: One-time/idempotent migration from legacy hardcoded data to Payload/R2.
- `utils/`: Helper functions (image association, category logic).
- `proxy.ts`: Edge middleware/proxy logic.

### 4. Verification Before Pushing
Before submitting a PR or pushing code, YOU MUST run:

```bash
pnpm exec tsc --noEmit
pnpm run lint
pnpm run payload:types
pnpm run build
```

If the build fails, **DO NOT PUSH**. Fix the errors first.

## 📄 License

This project is proprietary. Please contact the owner for usage rights.
