# Next.js Upgrade Strategy: 14 to 16

## Current Status
- **Next.js**: 14.2.16
- **React**: ^19 (Already upgraded, likely causing peer dependency warnings with Next 14)
- **ESLint Config**: 16.0.7 (Already on v16)

## Phase 1: Upgrade to Next.js 15
Target: `next@15.0.0` (or latest 15.x)
This version bridges the gap to React 19 support.

1.  **Update Dependencies**:
    - `next` -> `^15.0.0`
    - `react` -> `^19.0.0` (Confirming stability)
    - `react-dom` -> `^19.0.0`
2.  **Codemods / Breaking Changes Check**:
    - **Caching**: Next.js 15 changes `fetch` requests to be uncached by default (`no-store`). We need to check `data/` fetching logic.
    - **Async Request APIs**: `params` and `searchParams` in page/layout props become promises.
        - *Action*: Check `app/projects/[slug]/page.tsx` which uses `params`.
3.  **Verification**: Run build and lint.

## Phase 2: Upgrade to Next.js 16 (Latest)
Target: `next@latest` (assuming 16 is released/canary in this context)

1.  **Update Dependencies**:
    - `next` -> `latest`
2.  **Breaking Changes Check**:
    - (Hypothetical/Contextual): Review specific v16 breaking changes provided in context or standard evolutions (Turbo improvements, React Compiler support).
3.  **Verification**: Full regression test of project pages.

## Execution Plan

### Step 1: Prepare Codebase
- [ ] Check `app/projects/[slug]/page.tsx` for synchronous `params` access. This MUST be fixed for Next.js 15.

### Step 2: Upgrade to v15
- [ ] `pnpm add next@15 react@19 react-dom@19 eslint-config-next@15`
- [ ] Fix any compilation errors (specifically `params` await).
- [ ] Verify `pnpm build`.

### Step 3: Upgrade to v16
- [ ] `pnpm add next@latest eslint-config-next@latest`
- [ ] Verify `pnpm build`.
