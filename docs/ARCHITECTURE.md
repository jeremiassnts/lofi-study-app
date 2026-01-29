# Lofi Study App - Architecture Documentation

## Overview

A single-page study organization web application designed to showcase modern full-stack development practices in a professional portfolio.

## Tech Stack

### Core Framework

- **Next.js 16.2.0-canary.14** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript** - Type safety throughout

### Styling

- **Tailwind CSS 4.1.10** - Utility-first CSS
- **shadcn/ui** - Reusable component library (base-lyra style)
- **next-themes** - Theme management system
- **tw-animate-css** - Animation utilities

### Build Tools

- **Turborepo** - Monorepo build system
- **pnpm** - Fast, efficient package manager

### State Management

- **React Hooks** - Local component state
- **Custom Hooks** - Business logic abstraction
- **localStorage** - Client-side persistence (MVP)
- **next-themes** - Theme state (existing)

## Application Architecture

### Single-Page Dashboard Pattern

```
┌─────────────────────────────────────────────────────┐
│  Header (Theme Selector + Settings)                 │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────┐  ┌────────────────────────┐  │
│  │                  │  │                        │  │
│  │  Pomodoro Timer  │  │    Task Manager        │  │
│  │  (Left Column)   │  │    (Center Column)     │  │
│  │                  │  │                        │  │
│  │                  │  │                        │  │
│  └──────────────────┘  └────────────────────────┘  │
│                                                      │
│  ┌─────────────────────────────────────────────────┐│
│  │            Lofi Music Player                    ││
│  │            (Bottom Section)                     ││
│  └─────────────────────────────────────────────────┘│
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Responsive Behavior

- **Desktop (>1024px)**: 3-column grid layout
- **Tablet (768-1024px)**: 2-column layout, player at bottom
- **Mobile (<768px)**: Stacked sections, collapsible

## Component Structure

```
apps/web/src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Dashboard page (main entry)
│   └── globals.css         # Global styles & theme variables
│
├── components/
│   ├── dashboard/
│   │   ├── pomodoro-section.tsx     # Pomodoro container
│   │   ├── tasks-section.tsx        # Tasks container
│   │   └── lofi-player-section.tsx  # Player container
│   │
│   ├── pomodoro/
│   │   ├── timer-display.tsx        # Circular timer visual
│   │   ├── timer-controls.tsx       # Start/Pause/Reset
│   │   ├── timer-settings.tsx       # Config modal
│   │   └── use-pomodoro.ts          # Timer logic hook
│   │
│   ├── tasks/
│   │   ├── task-list.tsx            # Renders all tasks
│   │   ├── task-item.tsx            # Individual task component
│   │   ├── task-form.tsx            # Add/Edit form
│   │   ├── task-group.tsx           # Group header/collapse
│   │   ├── task-filters.tsx         # Filter controls
│   │   └── use-tasks.ts             # CRUD + storage hook
│   │
│   ├── lofi-player/
│   │   ├── player-container.tsx     # React Player wrapper
│   │   ├── player-controls.tsx      # Volume, play/pause
│   │   ├── stream-selector.tsx      # Multiple streams
│   │   └── use-player.ts            # Player state hook
│   │
│   ├── themes/
│   │   ├── theme-selector.tsx       # Multi-theme dropdown
│   │   ├── theme-preview.tsx        # Visual theme cards
│   │   └── themes.config.ts         # Theme definitions
│   │
│   └── ui/                          # shadcn components
│
├── lib/
│   ├── utils.ts                     # Utility functions
│   ├── storage.ts                   # Storage abstraction
│   └── themes.config.ts             # Theme configuration
│
└── types/
    ├── task.ts                      # Task & Group types
    ├── pomodoro.ts                  # Timer types
    └── theme.ts                     # Theme types
```

## Design Patterns

### 1. Container/Presenter Pattern

- **Section containers** handle layout and composition
- **Feature components** handle specific UI and logic
- **Custom hooks** contain business logic

### 2. Custom Hooks Pattern

All business logic is extracted into reusable hooks:

- `use-pomodoro.ts` - Timer state machine
- `use-tasks.ts` - Task CRUD operations
- `use-player.ts` - Media player state
- `use-theme-switcher.ts` - Multi-theme logic

### 3. Composition Over Configuration

- Small, focused components
- Compose complex UIs from simple pieces
- Props for customization, not massive config objects

## State Management Strategy

### No Global State Library

We deliberately avoid Redux/Zustand because:

- State is isolated to features
- No cross-component data sharing needs
- Better performance (no unnecessary re-renders)
- Demonstrates architectural restraint

### State Types & Solutions

| State Type      | Strategy               | Storage      | Why                 |
| --------------- | ---------------------- | ------------ | ------------------- |
| **Pomodoro**    | Component state + hook | Memory       | Timer is ephemeral  |
| **Tasks**       | Component state + hook | localStorage | Persistence needed  |
| **Player**      | Component state + ref  | Memory       | Media API is local  |
| **Theme**       | Context (next-themes)  | localStorage | Already configured  |
| **Multi-Theme** | CSS variables          | localStorage | Themes are just CSS |

### Data Flow Example

**Task Creation Flow:**

```
User submits form
  → useTasks.addTask()
  → Update React state
  → Persist to localStorage
  → Component re-renders
  → UI shows new task
```

## Storage Architecture

### Phase 1: localStorage (MVP)

- Simple, synchronous API
- Good for <5MB data
- Perfect for MVP scope

### Phase 2: IndexedDB (Future)

- Handles larger datasets
- Supports file attachments
- Enables offline-first features

### Storage Schema

```typescript
// localStorage keys
{
  "lofi-study:tasks": Task[],
  "lofi-study:groups": Group[],
  "lofi-study:pomodoro-config": PomodoroConfig,
  "lofi-study:theme": string
}
```

### Storage Abstraction Layer

`lib/storage.ts` provides:

- Type-safe get/set operations
- JSON serialization handling
- Error handling
- Easy mocking for tests
- Future migration path to IndexedDB

## Theme System

### Multi-Theme Architecture

5 curated themes showcasing design system thinking:

1. **Lofi Cozy** (default dark) - Warm browns, muted purples
2. **Minimal Light** - Clean whites, subtle grays
3. **Midnight Study** - Deep navy, teal accents
4. **Sakura** - Soft pinks, cherry blossom aesthetic
5. **Forest Focus** - Earthy greens, nature-inspired

### Implementation

- CSS Custom Properties for runtime switching
- Theme definitions in `themes.config.ts`
- No CSS-in-JS overhead
- Smooth transitions between themes

### Theme Structure

```typescript
{
  id: string,
  name: string,
  colors: {
    background: string,    // oklch color
    foreground: string,
    primary: string,
    // ... all CSS variables
  }
}
```

## Animation Philosophy

**Subtle and Purposeful** - Only animations that serve UX:

1. **Pomodoro Pulse** - Shows active state
2. **Task Complete** - Provides feedback
3. **Theme Switch** - Prevents jarring changes
4. **Player Expand** - Spatial continuity

**Tools**: tw-animate-css + custom Tailwind utilities

## Performance Considerations

### Code Splitting

- React Player loaded lazily (large dependency)
- Theme definitions loaded on-demand
- Route-based splitting via Next.js

### Bundle Size Targets

- Initial load: <200KB (gzipped)
- LCP: <2.5s
- FID: <100ms

### Optimization Strategies

- Next.js Image optimization
- Font subsetting (Geist fonts)
- Tailwind CSS purging
- Turbo cache for fast rebuilds

## Testing Strategy

### What We Test

1. **Custom Hooks** - Business logic isolation
2. **Storage Layer** - Data persistence
3. **Complex Components** - Task items, timer controls

### What We Don't Test

- Simple presentational components
- Third-party wrappers
- Layout components

### Testing Tools

- **Vitest** - Fast test runner
- **@testing-library/react** - Component testing
- **@testing-library/react-hooks** - Hook testing

## Build & Deployment

### Development

```bash
pnpm dev        # All apps with Turbo
pnpm dev:web    # Web app only
```

### Production Build

```bash
pnpm build           # Turbo builds all packages
pnpm check-types     # TypeScript validation
```

### CI/CD Pipeline

- **Trigger**: Push to main, Pull requests
- **Jobs**: Lint → Type Check → Build → Deploy
- **Platform**: GitHub Actions → Vercel

### Deployment Strategy

- Main branch → Auto-deploy to production
- Pull requests → Preview deployments
- Zero-downtime deployments

## Security Considerations

### Client-Side Only (MVP)

- No backend, no API keys to protect
- No sensitive data storage
- Public YouTube embeds only

### Future Backend Integration

When adding backend:

- Environment variables for secrets
- HTTPS only
- CORS configuration
- Rate limiting on API endpoints

## Accessibility

### WCAG 2.1 Level AA Compliance

- ✅ Color contrast ratios checked
- ✅ Keyboard navigation support
- ✅ ARIA labels on interactive elements
- ✅ Focus indicators visible
- ✅ Semantic HTML structure

### Screen Reader Support

- Announce timer state changes
- Task completion feedback
- Error messages read aloud

## Browser Support

### Target Browsers

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Progressive Enhancement

- Core features work without JavaScript (where possible)
- localStorage fallback handling
- YouTube embed fallback

## Monitoring & Analytics

### Phase 1 (MVP)

- No analytics (privacy-first)
- Browser console for debugging
- Vercel deployment metrics

### Phase 2 (Optional)

- Privacy-respecting analytics (Plausible/Fathom)
- Error tracking (Sentry)
- Performance monitoring (Web Vitals)

## Future Enhancements

### Planned Features

1. Drag-and-drop task reordering
2. Pomodoro statistics/charts
3. Keyboard shortcuts
4. Export/import tasks (JSON)
5. PWA support (offline mode)

### Possible Backend

- User accounts (NextAuth.js)
- Cloud sync (Supabase)
- Collaborative tasks
- Mobile app (React Native)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## License

MIT License - See [LICENSE](../LICENSE) file.

---

**Last Updated**: 2026-01-29
