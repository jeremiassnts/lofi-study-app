# Architecture Decision Records (ADR)

This document tracks key architectural decisions made during the development of the Lofi Study App.

## Format

Each decision follows this structure:

- **Date**: When the decision was made
- **Status**: Proposed | Accepted | Superseded
- **Context**: What problem we're solving
- **Decision**: What we decided to do
- **Consequences**: What this means (positive and negative)

---

## ADR-001: No Global State Management Library

**Date**: 2026-01-28  
**Status**: Accepted

### Context

The application has three main features (Pomodoro, Tasks, Player) that are largely independent. We need to decide how to manage state across the application.

### Decision

Use React's built-in state management (useState, useContext) with custom hooks, instead of Redux, Zustand, or other state management libraries.

### Consequences

**Positive**:

- Simpler architecture with fewer dependencies
- Better performance (no global store re-renders)
- Easier to understand for portfolio reviewers
- Demonstrates restraint and appropriate tool selection
- Each feature is independently testable

**Negative**:

- If features need to communicate in the future, refactoring may be needed
- No time-travel debugging
- No built-in devtools for state inspection

**Why This Makes Sense**: For a single-page app with isolated features, the complexity of a global state library outweighs its benefits. This decision showcases architectural maturity.

---

## ADR-002: localStorage for MVP, IndexedDB for Future

**Date**: 2026-01-28  
**Status**: Accepted

### Context

Tasks need to be persisted across browser sessions. We need to choose between localStorage, IndexedDB, or a backend API.

### Decision

Start with localStorage for the MVP, with a storage abstraction layer that allows future migration to IndexedDB.

### Consequences

**Positive**:

- Immediate implementation (synchronous API)
- No backend complexity
- Works offline by default
- 5MB+ is sufficient for MVP scope
- Storage abstraction makes migration easy

**Negative**:

- Limited to 5-10MB storage
- No support for binary data (files/images)
- Synchronous API can block main thread (if data gets large)
- No built-in indexing/querying

**Migration Path**: When we hit limitations, the storage abstraction (`lib/storage.ts`) allows swapping to IndexedDB without changing component code.

---

## ADR-003: Multi-Theme System with CSS Custom Properties

**Date**: 2026-01-28  
**Status**: Accepted ✅ Implemented

### Context

The app needs to support multiple themes beyond just light/dark mode to showcase design system skills.

### Decision

Implement 5 curated themes using CSS Custom Properties (CSS variables) that are swapped at runtime, stored in localStorage.

### Consequences

**Positive**:

- No CSS-in-JS overhead (smaller bundle, better performance)
- Smooth theme transitions with CSS
- Easy to add new themes (just config objects)
- Works with existing Tailwind setup
- Demonstrates modern CSS knowledge

**Negative**:

- No TypeScript safety for CSS variable names
- Requires manual contrast checking for accessibility
- IE11 doesn't support CSS variables (acceptable trade-off)

**Theme Count**: 5 themes strikes a balance—enough to show systematic design thinking, not so many that it looks unfocused.

### Implementation Details

**Themes Implemented**:

1. **Lofi Cozy** (default) - Warm browns, muted purples, soft orange accents
2. **Minimal Light** - Clean whites, subtle grays, high contrast
3. **Midnight Study** - Deep navy with teal accents, low contrast
4. **Sakura** - Soft pinks and cream tones, cherry blossom inspired
5. **Forest Focus** - Earthy greens and wood tones, nature-inspired

**Implementation Approach**:

- Created `themes.config.ts` with TypeScript interfaces for type safety
- Used oklch color format for better color manipulation and consistency
- Custom hook `useThemeSwitcher` manages theme state and application
- CSS variables applied dynamically via JavaScript to `:root` element
- 200ms CSS transitions for smooth theme changes
- Theme selection persisted in localStorage with key `lofi-study:theme`
- Visual theme selector with color palette previews in header

**Files Created**:

- `apps/web/src/lib/themes.config.ts` - Theme definitions
- `apps/web/src/hooks/use-theme-switcher.ts` - Theme management hook
- `apps/web/src/components/themes/theme-selector.tsx` - Main selector component
- `apps/web/src/components/themes/theme-preview.tsx` - Theme preview cards
- `apps/web/src/components/themes/theme-initializer.tsx` - Theme initialization

**Files Modified**:

- `apps/web/src/components/header.tsx` - Replaced ModeToggle with ThemeSelector
- `apps/web/src/components/providers.tsx` - Added ThemeInitializer
- `apps/web/src/index.css` - Added smooth transitions for theme changes

---

## ADR-004: React Player for YouTube Embeds

**Date**: 2026-01-28  
**Status**: Accepted

### Context

The lofi player needs to embed YouTube live streams. We need to choose between the raw YouTube iframe API, react-player, or other libraries.

### Decision

Use `react-player` library for YouTube embeds.

### Consequences

**Positive**:

- Handles YouTube API complexity
- Supports multiple video platforms (future flexibility)
- Well-maintained with good TypeScript support
- Handles edge cases (stream offline, blocked embeds)
- Simple API for play/pause/volume

**Negative**:

- Adds ~50KB to bundle (lazy-loaded to minimize impact)
- Another dependency to maintain
- Abstracts away some YouTube-specific features

**Alternative Considered**: Raw YouTube iframe API—rejected due to complexity and poor error handling.

---

## ADR-005: No Backend for MVP

**Date**: 2026-01-28  
**Status**: Accepted

### Context

The app could have a backend for user accounts, cloud sync, and analytics. We need to decide if this is necessary for the portfolio version.

### Decision

Build the MVP without a backend. Store all data client-side.

### Consequences

**Positive**:

- Faster development (focus on frontend skills)
- Zero infrastructure cost
- No deployment complexity
- Works offline automatically
- Demonstrates full-stack thinking without overbuilding

**Negative**:

- No cross-device sync
- Data lives in single browser
- No user accounts
- Can't showcase backend skills in this project

**Future Path**: If we add a backend later, consider:

- NextAuth.js for authentication
- Supabase for database + real-time sync
- Vercel KV for simple key-value storage

**Why This Is OK**: For a portfolio project, a polished frontend is more impactful than a mediocre full-stack app.

---

## ADR-006: Turborepo Monorepo Structure

**Date**: 2026-01-28  
**Status**: Accepted (inherited from starter)

### Context

The project was initialized with a Turborepo monorepo structure with separate apps and packages.

### Decision

Keep the monorepo structure even though we only have one app currently.

### Consequences

**Positive**:

- Shows understanding of monorepo patterns
- Easy to add packages (shared components, utils, etc.)
- Turbo caching speeds up builds
- Professional setup that scales
- Good for portfolio (demonstrates enterprise patterns)

**Negative**:

- Slight complexity overhead for single app
- More configuration files
- Longer initial setup time

**Why Keep It**: Even though we could flatten to a single Next.js app, the monorepo structure demonstrates professional development patterns without significant downsides.

---

## ADR-007: shadcn/ui for Component Library

**Date**: 2026-01-28  
**Status**: Accepted (inherited from starter)

### Context

Need a component library for UI primitives (buttons, modals, forms, etc.).

### Decision

Use shadcn/ui with the "base-lyra" style preset.

### Consequences

**Positive**:

- Components live in our codebase (not node_modules)
- Full customization control
- Built on Radix UI primitives (accessibility built-in)
- Excellent TypeScript support
- Works perfectly with Tailwind CSS

**Negative**:

- Components need to be added individually
- We're responsible for updating components
- Slightly larger codebase than using a CDN

**Why This Choice**: shadcn/ui strikes the perfect balance for portfolio projects—professional quality without the "everything looks the same" problem of Material UI or Chakra.

---

## ADR-008: No Testing Framework for MVP

**Date**: 2026-01-28  
**Status**: Proposed

### Context

Testing is valuable but takes time. Need to decide testing strategy for MVP.

### Decision

Focus on visual testing and manual QA for MVP. Add Vitest + Testing Library in Milestone 7 if time permits.

### Consequences

**Positive**:

- Faster feature development
- Focus on shipping working product
- Manual testing catches obvious bugs

**Negative**:

- No automated regression testing
- Harder to refactor confidently
- Missing portfolio signal for testing skills

**Compromise**: If time permits in Milestone 7, add tests for:

- Custom hooks (use-pomodoro, use-tasks)
- Storage abstraction layer
- Complex components (task-item)

This shows selective testing judgment rather than 100% coverage.

---

## ADR-009: Vercel for Deployment

**Date**: 2026-01-28  
**Status**: Accepted

### Context

Need to choose a deployment platform for the Next.js application.

### Decision

Deploy to Vercel with automatic deployments from GitHub.

### Consequences

**Positive**:

- Zero-config Next.js deployment
- Automatic preview deployments on PRs
- Free tier is generous
- Built-in analytics and performance monitoring
- Industry standard for Next.js

**Negative**:

- Vendor lock-in (minor concern for portfolio)
- Serverless function limitations (not relevant for our MVP)

**Alternatives Considered**:

- **Netlify**: Similar to Vercel but less Next.js optimized
- **Railway/Render**: More control but more configuration
- **AWS/GCP**: Overkill for this project

---

## ADR-010: English for All Code and Documentation

**Date**: 2026-01-28  
**Status**: Accepted

### Context

Project could be in Portuguese or English. Need to choose language for code, comments, and documentation.

### Decision

Everything (code, comments, docs, commit messages) in English.

### Consequences

**Positive**:

- Accessible to international recruiters
- Standard practice for open-source
- Better for portfolio visibility
- Easier to get help from broader community

**Negative**:

- Might be slower to write for non-native speakers

**Why**: English is the lingua franca of software development. For a portfolio project, international accessibility is critical.

---

## ADR-011: Simplified Form Validation for Task Form

**Date**: 2026-01-28  
**Status**: Accepted

### Context

The roadmap suggested using `@tanstack/react-form` with `zod-form-adapter` for form validation. However, the adapter package was not installed and the form requirements are simple.

### Decision

Use React state with manual validation instead of `@tanstack/react-form` with zod adapter for the task form.

### Consequences

**Positive**:

- No additional dependencies needed
- Simpler implementation for straightforward form
- Faster to implement
- Still demonstrates form handling best practices

**Negative**:

- Less sophisticated than using a form library
- Manual validation logic needs to be maintained

**Why**: For a simple form with two fields (title and optional group), the overhead of setting up a form library with adapter wasn't justified. The manual approach is cleaner and more maintainable for this use case.

---

## ADR-014: GitHub Actions CI Pipeline (Lint, Type Check, Build)

**Date**: 2026-01-29  
**Status**: Accepted

### Context

The project needed automated quality checks and build verification before deployment (Milestone 6).

### Decision

Add a single GitHub Actions workflow that runs on push/PR to main: one job for lint + type check, a second job for build (with Turbo cache). No deploy step in workflow; Vercel handles deployment via GitHub integration.

### Consequences

**Positive**:

- Catches lint and type errors before merge
- Build job ensures the app compiles
- Turbo cache speeds up CI
- Clear separation: CI validates, Vercel deploys

**Negative**:

- No automated tests in pipeline (see ADR-008)
- Visual assets and Vercel setup remain manual

**Implementation**: `.github/workflows/` (e.g. `ci.yml` or `deploy.yml`), pnpm cache, `check-types` in apps/web and packages/env, README badges.

---

## Template for Future ADRs

Copy this template when adding new decisions:

```markdown
## ADR-XXX: [Short Title]

**Date**: YYYY-MM-DD
**Status**: Proposed | Accepted | Superseded

### Context

[What problem are we solving? What are the constraints?]

### Decision

[What did we decide to do?]

### Consequences

**Positive**:

- [Benefit 1]
- [Benefit 2]

**Negative**:

- [Trade-off 1]
- [Trade-off 2]

**Why**: [Brief explanation of reasoning]
```

---

## Superseded Decisions

None yet. When a decision is superseded, move it here with a note explaining what replaced it and why.

---

## ADR-012: Custom Theme Hook Instead of Extending next-themes

**Date**: 2026-01-28  
**Status**: Accepted

### Context

The app already uses `next-themes` for basic light/dark mode. For the multi-theme system, we needed to decide whether to extend next-themes or create a custom solution.

### Decision

Create a custom `useThemeSwitcher` hook that works alongside next-themes but manages themes independently via CSS custom properties.

### Consequences

**Positive**:

- Full control over theme application logic
- No dependency on next-themes limitations
- Can apply themes via CSS variables without class toggling
- Simpler API for our specific use case
- Better performance (no class switching, just CSS variable updates)

**Negative**:

- Two theme systems coexist (next-themes for system preference, custom for multi-theme)
- Slightly more code to maintain
- Need to handle hydration mismatches manually

**Why**: next-themes is designed for light/dark/system themes, not for multiple custom color schemes. Our custom hook gives us the flexibility to apply any theme via CSS variables while still leveraging next-themes for system preference detection if needed in the future.

---

## ADR-013: Phase 5 Polish — Toasts, Storage, Error Boundaries

**Date**: 2026-01-28  
**Status**: Accepted

### Context

Milestone 5 (Polish & Animations) required error handling (task storage, player offline), loading states, and error boundaries. We needed consistent UX for failures and loading.

### Decision

- **Storage**: `setItem` in `lib/storage.ts` now returns `boolean` (success/failure). Callers (e.g. `use-tasks`) check the return and surface failures via Sonner toasts.
- **Toasts**: Use existing Sonner (Toaster in providers). Toast on task/group storage failure and when the lofi player reports stream offline.
- **Error boundaries**: Add a single `ErrorBoundary` class component. Wrap each dashboard section (Pomodoro, Tasks, Lofi Player) so a failure in one section doesn’t break the whole page. Fallback offers “Refresh page.”
- **Loading**: `useTasks` exposes `isLoading`; tasks section shows Skeleton placeholders during initial load. Player Suspense fallback uses Skeleton-based UI instead of plain “Loading player…” text.

### Consequences

**Positive**:

- Clear feedback when storage or streams fail
- Isolated section failures
- Perceived performance via skeletons and consistent loading states

**Negative**:

- `setItem` return type change; all call sites must tolerate it (we only act on it in `use-tasks`)

---

**Last Updated**: 2026-01-29
