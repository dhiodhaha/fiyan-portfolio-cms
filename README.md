# Fiyan Portfolio

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/egenhets-projects/fiyan)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)

This is a modern portfolio website built with **Next.js 16**, **React 19**, and **Tailwind CSS**. Ideally designed for showcasing creative projects with a clean, high-performance UI.

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

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the site.

## 🛠️ Contribution Guidelines (Read Carefully!)

We welcome contributions! However, to keep the codebase clean and stable, please adhere to the following rules:

### 1. DRY Principle (Don't Repeat Yourself)
- **Reusable Components:** If you find yourself copying JSX, create a component in `components/ui/`.
- **Centralized Data:**
    - Project metadata lives in `data/projects.ts`.
    - Project images live in `data/project-images.ts`.
    - **DO NOT** hardcode data in page files (`app/portfolio/page.tsx` etc.). Use the helper functions in `utils/project-helpers.ts`.

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
- `components/`: React components.
    - `ui/`: Generic UI elements (buttons, inputs, cards).
- `data/`: Static data sources (single source of truth).
- `utils/`: Helper functions (image association, category logic).
- `proxy.ts`: Edge middleware/proxy logic.

### 4. Verification Before Pushing
Before submitting a PR or pushing code, YOU MUST run:

```bash
pnpm build
```

If the build fails, **DO NOT PUSH**. Fix the errors first.

## 📄 License

This project is proprietary. Please contact the owner for usage rights.
