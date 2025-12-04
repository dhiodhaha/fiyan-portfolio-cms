# Refactoring Plan: Fiyan Portfolio

## Objective
Refactor the codebase to adhere to DRY (Don't Repeat Yourself) principles, improve data management, and remove unused code without altering the visual appearance or user experience.

## Key Issues Identified
1.  **Data Duplication**: `app/portfolio/page.tsx` contains a hardcoded `projects` array that is separate from the main data source in `data/projects.ts`.
2.  **Code Repetition**: Project card UI logic is duplicated across `app/portfolio/page.tsx` and `app/projects/page.tsx`.
3.  **Coupled Data & Logic**: `utils/image-association.ts` mixes a large dataset of image references with utility functions.
4.  **Complex Image Retrieval**: Components individually implement logic to fetch thumbnails, leading to inconsistency.

## Implementation Steps

### 1. Centralize Data Management
- **Move Image Data**: Extract the large `projectImages` array from `utils/image-association.ts` into a new file `data/project-images.ts`.
- **Unified Data Access**: Create a helper function (e.g., `getAllProjectsWithThumbnails`) that merges `projects` from `data/projects.ts` with their corresponding thumbnails from `data/project-images.ts`. This ensures views receive a complete data object.

### 2. Create Reusable Components
- **`ProjectCard` Component**: Create a new component `components/ui/project-card.tsx` that encapsulates the UI for displaying a project thumbnail, title, category, and description.
    - *Props*: `title`, `category`, `description`, `slug` (or `id`), `image`, `year` (optional).
    - *Styling*: Ensure it supports the visual styles of both the current Portfolio and Projects pages (or standardize them if they are meant to be identical).

### 3. Refactor `app/portfolio/page.tsx`
- Remove the hardcoded `projects` array.
- Import the unified project data.
- Replace the manual mapping of project cards with the new `ProjectCard` component.
- Ensure the category filtering logic uses the centralized category utilities (`utils/category-utils.ts`) if applicable.

### 4. Refactor `app/projects/page.tsx`
- Replace the inline project card JSX with the `ProjectCard` component.
- Simplify the data fetching logic by using the new unified data helper.

### 5. Cleanup
- Remove unused imports and variables (e.g., unused `Image` imports if moved to sub-components).
- Verify `utils/image-association.ts` only contains logic, not raw data.

## Proposed File Structure Changes

```text
data/
  ├── projects.ts         # Existing: Project metadata
  └── project-images.ts   # NEW: Moved from utils/image-association.ts

components/
  └── ui/
      └── project-card.tsx # NEW: Reusable card component

utils/
  └── project-helpers.ts   # NEW: Logic to merge projects + images
```

## Verification
- **Visual Check**: Ensure `/portfolio` and `/projects` look correct and identical to their pre-refactor states (or consistent with the design system).
- **Functionality**: Test category filtering and navigation to project details pages.
- **Build**: Run `pnpm build` to ensure no type errors or missing dependencies.
