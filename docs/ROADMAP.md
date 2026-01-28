# Implementation Roadmap

This document outlines the step-by-step implementation plan for the Lofi Study App. Each milestone is designed to be incremental, safe to implement, and independently valuable.

## Timeline Overview

| Milestone | Duration | Status | Deliverable |
|-----------|----------|--------|-------------|
| [1. Foundation & Pomodoro](#milestone-1-foundation--pomodoro) | 2 days | ⬜ Pending | Working timer with settings |
| [2. Task Management](#milestone-2-task-management) | 2 days | ⬜ Pending | Full CRUD with groups |
| [3. Lofi Player](#milestone-3-lofi-player) | 1 day | ⬜ Pending | Embedded YouTube player |
| [4. Multi-Theme System](#milestone-4-multi-theme-system) | 1 day | ⬜ Pending | 5 themes with selector |
| [5. Polish & Animations](#milestone-5-polish--animations) | 1 day | ⬜ Pending | Refined UX |
| [6. CI/CD Pipeline](#milestone-6-cicd-pipeline) | 1 day | ⬜ Pending | Automated deployment |
| [7. Documentation & Portfolio](#milestone-7-documentation--portfolio) | 2 days | ⬜ Pending | Portfolio-ready |

**Total Estimated Time**: 10 days (4-6 hours/day)

---

## Milestone 1: Foundation & Pomodoro

**Goal**: Establish project structure and deliver first working feature

### Step 1.1: Project Setup ✅

**Status**: ⬜ Not Started | ⬜ In Progress | ✅ Complete

**Tasks**:
- [x] Create `docs/` directory structure
- [ ] Review ARCHITECTURE.md
- [ ] Review ROADMAP.md (this file)
- [ ] Review DECISIONS.md template

**Deliverable**: Documentation foundation in place

**Time**: 30 minutes

---

### Step 1.2: Storage Abstraction Layer

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `apps/web/src/lib/storage.ts`

**Tasks**:
- [ ] Create typed localStorage wrapper
- [ ] Implement `getItem<T>(key): T | null`
- [ ] Implement `setItem<T>(key, value: T): void`
- [ ] Implement `removeItem(key): void`
- [ ] Add error handling and fallbacks

**Why**: Future-proofs for IndexedDB migration, enables testing

**Deliverable**: Storage abstraction ready for use

**Time**: 1 hour

**Portfolio Value**: ⭐⭐ Shows abstraction thinking

---

### Step 1.3: Pomodoro Timer Logic

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `apps/web/src/components/pomodoro/use-pomodoro.ts`

**Tasks**:
- [ ] Create TypeScript types (`types/pomodoro.ts`)
- [ ] Implement state machine (idle, running, paused, break)
- [ ] Implement countdown logic with `setInterval`
- [ ] Add configurable durations (focus/break)
- [ ] Implement browser notifications
- [ ] Add sound alert (HTML5 Audio API)
- [ ] Persist settings to storage

**Why**: Core feature, isolated, good testing ground

**Deliverable**: Working timer hook

**Time**: 3 hours

**Portfolio Value**: ⭐⭐⭐ Async handling, browser APIs

---

### Step 1.4: Pomodoro UI Components

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**:
- `apps/web/src/components/pomodoro/timer-display.tsx`
- `apps/web/src/components/pomodoro/timer-controls.tsx`
- `apps/web/src/components/pomodoro/timer-settings.tsx`

**Tasks**:
- [ ] Create `timer-display.tsx` - Circular progress + time
- [ ] Create `timer-controls.tsx` - Start/Pause/Reset buttons
- [ ] Create `timer-settings.tsx` - Settings modal (shadcn Dialog)
- [ ] Style with shadcn Card, Button, Input components
- [ ] Connect to `use-pomodoro` hook

**Why**: Visual proof of concept

**Deliverable**: Pomodoro UI components

**Time**: 3 hours

**Portfolio Value**: ⭐⭐ Component composition

---

### Step 1.5: Pomodoro Section Integration

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**:
- `apps/web/src/components/dashboard/pomodoro-section.tsx`
- `apps/web/src/app/page.tsx` (update)

**Tasks**:
- [ ] Create `pomodoro-section.tsx` container
- [ ] Integrate timer components
- [ ] Add to dashboard layout (left column)
- [ ] Test on desktop/tablet/mobile
- [ ] Update DECISIONS.md with choices made

**Why**: Makes feature usable end-to-end

**Deliverable**: Working Pomodoro timer on dashboard

**Time**: 1 hour

**Portfolio Value**: ⭐ Integration

---

## Milestone 2: Task Management

**Goal**: Build CRUD interface with persistence and grouping

### Step 2.1: Task Data Model & Storage

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**:
- `apps/web/src/types/task.ts`
- `apps/web/src/lib/storage.ts` (extend)

**Tasks**:
- [ ] Define `Task` interface
- [ ] Define `Group` interface
- [ ] Create storage schema
- [ ] Add task-specific storage methods
- [ ] Add initial seed data (optional)

**Schema**:
```typescript
interface Task {
  id: string;
  title: string;
  completed: boolean;
  groupId: string | null;
  createdAt: string;
  order: number;
}

interface Group {
  id: string;
  name: string;
  color: string;
}
```

**Why**: Type safety prevents bugs, clear contracts

**Deliverable**: Task types and storage ready

**Time**: 1 hour

**Portfolio Value**: ⭐⭐ TypeScript proficiency

---

### Step 2.2: Task CRUD Hook

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `apps/web/src/components/tasks/use-tasks.ts`

**Tasks**:
- [ ] Implement `addTask(title, groupId?)`
- [ ] Implement `updateTask(id, updates)`
- [ ] Implement `deleteTask(id)`
- [ ] Implement `toggleTask(id)`
- [ ] Implement `addGroup(name, color)`
- [ ] Implement `deleteGroup(id)`
- [ ] Load from storage on mount
- [ ] Sync to storage on changes
- [ ] Add optimistic updates

**Why**: Centralizes task logic, testable

**Deliverable**: Task management hook

**Time**: 3 hours

**Portfolio Value**: ⭐⭐⭐ Clean architecture

---

### Step 2.3: Task List UI Components

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**:
- `apps/web/src/components/tasks/task-item.tsx`
- `apps/web/src/components/tasks/task-list.tsx`
- `apps/web/src/components/tasks/task-group.tsx`

**Tasks**:
- [ ] Create `task-item.tsx` with checkbox, edit, delete
- [ ] Create `task-list.tsx` to render all tasks
- [ ] Create `task-group.tsx` for collapsible groups
- [ ] Add hover states and interactions
- [ ] Use shadcn Checkbox, Button, Card

**Interactions**:
- Click checkbox → toggle completion
- Click edit → open edit form
- Click delete → confirm dialog

**Why**: Core user experience

**Deliverable**: Task display components

**Time**: 3 hours

**Portfolio Value**: ⭐⭐⭐ UX attention

---

### Step 2.4: Task Creation & Editing

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `apps/web/src/components/tasks/task-form.tsx`

**Tasks**:
- [ ] Create form component (add/edit modes)
- [ ] Use `@tanstack/react-form` for state
- [ ] Add validation with Zod
- [ ] Fields: Title (required), Group (dropdown)
- [ ] Handle submit/cancel
- [ ] Show in modal or inline

**Why**: Demonstrates form handling

**Deliverable**: Task form component

**Time**: 2 hours

**Portfolio Value**: ⭐⭐ Form best practices

---

### Step 2.5: Task Grouping & Filtering

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**:
- `apps/web/src/components/tasks/task-filters.tsx`
- Update `task-list.tsx`

**Tasks**:
- [ ] Add group management UI
- [ ] Create/rename/delete groups
- [ ] Filter: All, Active, Completed, By Group
- [ ] Use shadcn DropdownMenu
- [ ] Persist filter state (optional)

**Why**: Shows data organization skills

**Deliverable**: Task filtering and grouping

**Time**: 2 hours

**Portfolio Value**: ⭐⭐ Advanced UX

---

### Step 2.6: Task Section Integration

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**:
- `apps/web/src/components/dashboard/tasks-section.tsx`
- `apps/web/src/app/page.tsx` (update)

**Tasks**:
- [ ] Create `tasks-section.tsx` container
- [ ] Integrate task components
- [ ] Add to dashboard layout (center column)
- [ ] Make scrollable with max height
- [ ] Test on desktop/tablet/mobile
- [ ] Update DECISIONS.md

**Why**: Complete core feature

**Deliverable**: Working task manager on dashboard

**Time**: 1 hour

**Portfolio Value**: ⭐ Integration

---

## Milestone 3: Lofi Player

**Goal**: Integrate YouTube streaming player

### Step 3.1: Install React Player

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Command**:
```bash
cd apps/web
pnpm add react-player
```

**Why**: Handles YouTube embed complexity

**Time**: 5 minutes

---

### Step 3.2: Player Hook & Logic

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `apps/web/src/components/lofi-player/use-player.ts`

**Tasks**:
- [ ] Implement play/pause state
- [ ] Implement volume control (0-100)
- [ ] Store current stream URL
- [ ] Add error handling (stream offline)
- [ ] Persist volume to localStorage

**Why**: Abstracts player API

**Deliverable**: Player state hook

**Time**: 1.5 hours

**Portfolio Value**: ⭐⭐ API integration

---

### Step 3.3: Player UI Components

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**:
- `apps/web/src/components/lofi-player/player-container.tsx`
- `apps/web/src/components/lofi-player/player-controls.tsx`
- `apps/web/src/components/lofi-player/stream-selector.tsx` (optional)

**Tasks**:
- [ ] Create `player-container.tsx` - React Player wrapper
- [ ] Create `player-controls.tsx` - Play/pause, volume
- [ ] Create `stream-selector.tsx` - Multiple streams (optional)
- [ ] Set default stream (Lofi Girl or similar)
- [ ] Style with minimal chrome

**Why**: Completes third pillar

**Deliverable**: Player UI components

**Time**: 2.5 hours

**Portfolio Value**: ⭐⭐⭐ Third-party integration

---

### Step 3.4: Player Section Integration

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**:
- `apps/web/src/components/dashboard/lofi-player-section.tsx`
- `apps/web/src/app/page.tsx` (update)

**Tasks**:
- [ ] Create `lofi-player-section.tsx` container
- [ ] Integrate player components
- [ ] Add to dashboard layout (bottom section)
- [ ] Make collapsible
- [ ] Test embed permissions/CORS
- [ ] Update DECISIONS.md

**Why**: Ambient feature for study environment

**Deliverable**: Working lofi player on dashboard

**Time**: 1 hour

**Portfolio Value**: ⭐ Integration

---

## Milestone 4: Multi-Theme System

**Goal**: Build theme system beyond light/dark

### Step 4.1: Theme Configuration

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `apps/web/src/lib/themes.config.ts`

**Tasks**:
- [ ] Define 5 theme objects with CSS variables
- [ ] Themes: Lofi Cozy, Minimal Light, Midnight Study, Sakura, Forest Focus
- [ ] Use oklch color format
- [ ] Ensure WCAG AA contrast ratios
- [ ] Export theme registry

**Why**: Separates theme data from logic

**Deliverable**: Theme configuration file

**Time**: 2 hours

**Portfolio Value**: ⭐⭐ Configuration-driven design

---

### Step 4.2: Theme Switching Logic

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `apps/web/src/hooks/use-theme-switcher.ts`

**Tasks**:
- [ ] Create custom hook for theme switching
- [ ] Load theme from localStorage
- [ ] Apply theme by setting CSS variables on `:root`
- [ ] Persist selection
- [ ] Handle theme transitions (200ms)

**Why**: Custom theme system beyond next-themes

**Deliverable**: Theme switching hook

**Time**: 1.5 hours

**Portfolio Value**: ⭐⭐⭐ CSS custom properties

---

### Step 4.3: Theme Selector UI

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**:
- `apps/web/src/components/themes/theme-selector.tsx`
- `apps/web/src/components/themes/theme-preview.tsx`
- `apps/web/src/components/header.tsx` (update)

**Tasks**:
- [ ] Create `theme-selector.tsx` - Dropdown with previews
- [ ] Create `theme-preview.tsx` - Color palette cards
- [ ] Replace `ModeToggle` in header
- [ ] Use shadcn DropdownMenu + Card
- [ ] Add keyboard navigation

**Why**: Visual theme selection

**Deliverable**: Theme selector in header

**Time**: 2 hours

**Portfolio Value**: ⭐⭐⭐ Design system thinking

---

### Step 4.4: Theme Polish

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Tasks**:
- [ ] Refine theme color palettes
- [ ] Check contrast ratios with accessibility tool
- [ ] Add smooth color transitions
- [ ] Test all components in each theme
- [ ] Fix any contrast issues
- [ ] Update DECISIONS.md with theme choices

**Why**: Design sensitivity matters

**Deliverable**: Polished theme system

**Time**: 1.5 hours

**Portfolio Value**: ⭐⭐⭐ Accessibility awareness

---

## Milestone 5: Polish & Animations

**Goal**: Add micro-interactions and final UX touches

### Step 5.1: Pomodoro Animations

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**: Update pomodoro components

**Tasks**:
- [ ] Add pulse ring when timer is active
- [ ] Add flash animation on completion
- [ ] Add button state transitions
- [ ] Use tw-animate-css utilities
- [ ] Keep animations subtle

**Why**: Makes timer feel alive

**Deliverable**: Animated timer

**Time**: 1.5 hours

**Portfolio Value**: ⭐⭐ Subtle animation skill

---

### Step 5.2: Task Interactions

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**: Update task components

**Tasks**:
- [ ] Add checkbox checkmark animation
- [ ] Add strikethrough transition on complete
- [ ] Add fade in/out on add/delete
- [ ] Add hover states to task items
- [ ] Add focus indicators

**Why**: Feedback for every action

**Deliverable**: Polished task interactions

**Time**: 1.5 hours

**Portfolio Value**: ⭐⭐ Interaction design

---

### Step 5.3: Responsive Layout

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**: Update dashboard and section components

**Tasks**:
- [ ] Test desktop layout (>1024px)
- [ ] Test tablet layout (768-1024px)
- [ ] Test mobile layout (<768px)
- [ ] Fix any layout issues
- [ ] Ensure collapsible sections work
- [ ] Test on real devices if possible

**Why**: Mobile-first is essential

**Deliverable**: Fully responsive dashboard

**Time**: 2 hours

**Portfolio Value**: ⭐⭐⭐ Responsive design

---

### Step 5.4: Loading States

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**: Update relevant components

**Tasks**:
- [ ] Add skeleton loaders (shadcn Skeleton)
- [ ] Add task list loading state
- [ ] Add player loading state
- [ ] Add error boundaries
- [ ] Test loading states

**Why**: Perceived performance

**Deliverable**: Loading state handling

**Time**: 1.5 hours

**Portfolio Value**: ⭐⭐ UX completeness

---

### Step 5.5: Error Handling

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Files**: Update hooks and components

**Tasks**:
- [ ] Add task storage error handling (Sonner toast)
- [ ] Add player stream offline fallback
- [ ] Add timer notification permission handling
- [ ] Add form validation errors
- [ ] Test error scenarios

**Why**: Production-ready thinking

**Deliverable**: Comprehensive error handling

**Time**: 1.5 hours

**Portfolio Value**: ⭐⭐⭐ Edge case handling

---

## Milestone 6: CI/CD Pipeline

**Goal**: Automated testing and deployment

### Step 6.1: GitHub Actions Workflow

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `.github/workflows/ci.yml`

**Tasks**:
- [ ] Create workflow file
- [ ] Set triggers (push to main, PRs)
- [ ] Configure pnpm caching
- [ ] Add checkout step
- [ ] Add setup node step

**Why**: Shows DevOps awareness

**Deliverable**: Basic workflow structure

**Time**: 30 minutes

**Portfolio Value**: ⭐⭐⭐ CI/CD knowledge

---

### Step 6.2: Lint & Type Check Jobs

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `.github/workflows/ci.yml` (update)

**Tasks**:
- [ ] Add lint job
- [ ] Add type check job
- [ ] Use Turbo cache
- [ ] Ensure jobs fail on errors

**Why**: Catch errors before deployment

**Deliverable**: Automated code quality checks

**Time**: 30 minutes

**Portfolio Value**: ⭐⭐ Code quality automation

---

### Step 6.3: Build Job

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `.github/workflows/ci.yml` (update)

**Tasks**:
- [ ] Add build job
- [ ] Cache Turbo builds
- [ ] Ensure clean builds
- [ ] Add build artifacts

**Why**: Ensures deployability

**Deliverable**: Build verification

**Time**: 30 minutes

**Portfolio Value**: ⭐⭐ Build automation

---

### Step 6.4: Vercel Deployment

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Tasks**:
- [ ] Create Vercel account
- [ ] Connect GitHub repo to Vercel
- [ ] Configure root directory: `apps/web`
- [ ] Set up environment variables (if any)
- [ ] Enable auto-deploy on main
- [ ] Enable preview deploys on PRs
- [ ] Test deployment

**Why**: Standard Next.js deployment

**Deliverable**: Live application

**Time**: 1 hour

**Portfolio Value**: ⭐⭐⭐ Deployment pipeline

---

### Step 6.5: Status Badges

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `README.md` (update)

**Tasks**:
- [ ] Add build status badge
- [ ] Add deployment status badge
- [ ] Add TypeScript badge
- [ ] Test badge links

**Why**: Visual professionalism signal

**Deliverable**: README with badges

**Time**: 15 minutes

**Portfolio Value**: ⭐⭐ GitHub polish

---

## Milestone 7: Documentation & Portfolio

**Goal**: Make project portfolio-ready

### Step 7.1: README Enhancement

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `README.md`

**Tasks**:
- [ ] Add hero screenshot
- [ ] Write compelling feature list
- [ ] Add tech stack with badges
- [ ] Add live demo link
- [ ] Write setup instructions
- [ ] Link to architecture docs
- [ ] Add license (MIT)

**Why**: README is portfolio homepage

**Deliverable**: Professional README

**Time**: 2 hours

**Portfolio Value**: ⭐⭐⭐⭐ First impression

---

### Step 7.2: Architecture Documentation

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `docs/ARCHITECTURE.md`

**Tasks**:
- [ ] Review and update ARCHITECTURE.md
- [ ] Add diagrams if needed
- [ ] Ensure all sections are accurate
- [ ] Link from README

**Why**: Shows system thinking

**Deliverable**: Complete architecture docs

**Time**: 1 hour

**Portfolio Value**: ⭐⭐⭐ Documentation skill

---

### Step 7.3: Decision Log

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**File**: `docs/DECISIONS.md`

**Tasks**:
- [ ] Document key architectural decisions
- [ ] Use ADR format (Problem → Decision → Consequences)
- [ ] Cover: state management, storage, theming, etc.
- [ ] Keep it concise

**Why**: Shows decision-making process

**Deliverable**: ADR log

**Time**: 1.5 hours

**Portfolio Value**: ⭐⭐⭐⭐ Critical thinking

---

### Step 7.4: Code Comments & Documentation

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Tasks**:
- [ ] Add JSDoc comments to hooks
- [ ] Add comments to complex logic
- [ ] Document storage schema
- [ ] Document theme configuration
- [ ] Remove any TODO comments

**Why**: Readable code signals seniority

**Deliverable**: Well-documented code

**Time**: 2 hours

**Portfolio Value**: ⭐⭐ Code quality

---

### Step 7.5: Visual Assets

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Directory**: `docs/images/`

**Tasks**:
- [ ] Take hero screenshot for README
- [ ] Create GIF: Pomodoro in action
- [ ] Create GIF: Task management flow
- [ ] Create GIF: Theme switching
- [ ] Optional: Record 60-second demo video
- [ ] Add images to README

**Why**: Visual assets get more clicks

**Deliverable**: Screenshots and demos

**Time**: 1.5 hours

**Portfolio Value**: ⭐⭐⭐⭐ Presentation

---

### Step 7.6: Final Code Cleanup

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Tasks**:
- [ ] Remove console.logs
- [ ] Remove unused imports
- [ ] Run Prettier on all files
- [ ] Remove commented code
- [ ] Final build test
- [ ] Final lighthouse test

**Why**: Attention to detail

**Deliverable**: Production-ready code

**Time**: 1 hour

**Portfolio Value**: ⭐⭐ Professionalism

---

## Success Checklist

Before considering the project complete, verify:

### Technical
- [ ] Clean build with no errors
- [ ] No console errors in browser
- [ ] TypeScript strict mode passes
- [ ] All features work end-to-end

### Functional
- [ ] Pomodoro: Start/pause/reset works, sound plays
- [ ] Tasks: CRUD operations work, groups work, persists
- [ ] Player: Music plays, volume controls work
- [ ] Themes: All 5 themes apply correctly

### Visual
- [ ] Responsive on desktop/tablet/mobile
- [ ] Animations are subtle and smooth
- [ ] All themes have good contrast
- [ ] Loading states show correctly

### Performance
- [ ] Lighthouse score >90 (performance)
- [ ] Lighthouse score >90 (accessibility)
- [ ] Initial bundle <200KB gzipped

### Documentation
- [ ] README is compelling with visuals
- [ ] Architecture docs are complete
- [ ] Decision log documents key choices
- [ ] Code has helpful comments

### Deployment
- [ ] Live on Vercel
- [ ] CI/CD pipeline working
- [ ] Preview deployments on PRs
- [ ] Status badges in README

---

## Notes

- **Don't rush**: Quality over speed
- **Commit often**: Clear commit messages
- **Deploy early**: Deploy after Milestone 1
- **Test on mobile**: At every milestone
- **Ask for feedback**: Mid-project peer review
- **Update this file**: Mark steps complete as you go

---

## Getting Help

If stuck on any step:
1. Review the [ARCHITECTURE.md](./ARCHITECTURE.md) documentation
2. Check [DECISIONS.md](./DECISIONS.md) for context
3. Review existing similar components in the codebase
4. Ask specific questions rather than general "how to" questions

---

**Last Updated**: 2026-01-28
