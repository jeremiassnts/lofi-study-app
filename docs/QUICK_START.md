# Quick Start Guide

Get started with implementing the Lofi Study App by following this guide.

## Prerequisites

✅ Node.js 20+  
✅ pnpm 10+  
✅ Git  
✅ Code editor (VS Code recommended)

## Initial Setup

```bash
# Verify your environment
node --version    # Should be 20+
pnpm --version    # Should be 10+

# Install dependencies (if not done already)
pnpm install

# Start development server
pnpm dev:web

# Open http://localhost:3001
```

## Your First Task

Follow the roadmap in order. Start with **Milestone 1, Step 1.2**: Storage Abstraction Layer

### 1. Create Storage Abstraction (`lib/storage.ts`)

```bash
# Create the file
touch apps/web/src/lib/storage.ts
```

Implement a typed localStorage wrapper:

```typescript
/**
 * Type-safe localStorage wrapper
 */

const STORAGE_PREFIX = 'lofi-study:';

export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!item) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage: ${key}`, error);
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error);
  }
}
```

✅ **Checkpoint**: Storage abstraction is ready. Mark Step 1.2 complete in ROADMAP.md.

### 2. Create Pomodoro Types

```bash
# Create types directory
mkdir -p apps/web/src/types

# Create pomodoro types
touch apps/web/src/types/pomodoro.ts
```

Define TypeScript interfaces:

```typescript
export type TimerState = 'idle' | 'running' | 'paused' | 'break';

export interface PomodoroConfig {
  focusDuration: number;     // in minutes
  breakDuration: number;      // in minutes
  soundEnabled: boolean;
  autoStartBreak: boolean;
}

export interface PomodoroState {
  state: TimerState;
  timeRemaining: number;      // in seconds
  config: PomodoroConfig;
}
```

✅ **Checkpoint**: Types defined. Ready for hook implementation.

### 3. Build Pomodoro Hook

```bash
# Create pomodoro directory
mkdir -p apps/web/src/components/pomodoro

# Create hook file
touch apps/web/src/components/pomodoro/use-pomodoro.ts
```

Start with basic structure:

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '@/lib/storage';
import type { PomodoroState, PomodoroConfig, TimerState } from '@/types/pomodoro';

const DEFAULT_CONFIG: PomodoroConfig = {
  focusDuration: 25,
  breakDuration: 5,
  soundEnabled: true,
  autoStartBreak: false,
};

export function usePomodoro() {
  const [state, setState] = useState<TimerState>('idle');
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [config, setConfig] = useState<PomodoroConfig>(DEFAULT_CONFIG);

  // Load config from storage on mount
  useEffect(() => {
    const savedConfig = getItem<PomodoroConfig>('pomodoro-config');
    if (savedConfig) {
      setConfig(savedConfig);
      setTimeRemaining(savedConfig.focusDuration * 60);
    }
  }, []);

  // TODO: Implement timer logic with setInterval
  // TODO: Implement start/pause/reset functions
  // TODO: Implement notifications
  // TODO: Implement sound alerts

  return {
    state,
    timeRemaining,
    config,
    // Control functions to be added
  };
}
```

✅ **Checkpoint**: Hook skeleton ready. Now implement timer logic.

## Development Workflow

### Daily Routine

1. **Open ROADMAP.md** - See what step you're on
2. **Implement the step** - Follow the roadmap instructions
3. **Test manually** - Check desktop and mobile
4. **Update ROADMAP.md** - Mark step as complete (⬜ → ✅)
5. **Commit changes** - Clear commit message
6. **Update DECISIONS.md** - If you made architectural choices

### Commit Message Format

```bash
# Good commit messages
git commit -m "feat(pomodoro): implement timer countdown logic"
git commit -m "feat(storage): add typed localStorage wrapper"
git commit -m "fix(tasks): prevent duplicate IDs on quick creation"
git commit -m "docs(roadmap): mark step 1.2 complete"
```

### Testing Checklist

Before moving to next step:

- [ ] Feature works on desktop (Chrome)
- [ ] Feature works on mobile (responsive)
- [ ] No console errors
- [ ] TypeScript compiles (`pnpm check-types`)
- [ ] Code follows style guide (see CONTRIBUTING.md)

## Available Commands

```bash
# Development
pnpm dev              # All apps with hot reload
pnpm dev:web          # Web app only

# Code Quality
pnpm check-types      # TypeScript validation
pnpm build            # Production build test

# Git
git status            # Check what changed
git add .             # Stage all changes
git commit -m "..."   # Commit with message
git log --oneline     # View commit history
```

## Project Structure Quick Reference

```
apps/web/src/
├── app/
│   ├── layout.tsx         # Root layout (has providers)
│   └── page.tsx           # Main dashboard page
│
├── components/
│   ├── dashboard/         # Create section containers here
│   ├── pomodoro/          # ← Start here (Milestone 1)
│   ├── tasks/             # ← Then here (Milestone 2)
│   ├── lofi-player/       # ← Then here (Milestone 3)
│   ├── themes/            # ← Then here (Milestone 4)
│   └── ui/                # shadcn components (already there)
│
├── lib/
│   ├── storage.ts         # ← Create this first
│   ├── themes.config.ts   # ← Create in Milestone 4
│   └── utils.ts           # (already exists)
│
├── types/
│   ├── pomodoro.ts        # ← Create this second
│   ├── task.ts            # ← Create in Milestone 2
│   └── theme.ts           # ← Create in Milestone 4
│
└── hooks/                 # Create as needed
```

## Using shadcn/ui Components

Already installed and ready to use:

```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
// ... and more
```

## Debugging Tips

### Check Storage

Open DevTools → Application → Local Storage → `http://localhost:3001`

Look for keys starting with `lofi-study:`

### Check TypeScript Errors

```bash
pnpm check-types
```

### Check Console

Always have browser DevTools open. Watch for:
- Errors (red)
- Warnings (yellow)
- Network issues

### Check Build

```bash
pnpm build
```

If build passes, your code is production-ready.

## When You Get Stuck

1. **Check Documentation**
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
   - [ROADMAP.md](./ROADMAP.md) - Step-by-step plan
   - [DECISIONS.md](./DECISIONS.md) - Why we made certain choices

2. **Search Existing Code**
   - Look at similar components (e.g., `header.tsx`, `providers.tsx`)
   - Check how shadcn components are used

3. **Review Dependencies**
   - [Next.js Docs](https://nextjs.org/docs)
   - [React Docs](https://react.dev)
   - [Tailwind CSS](https://tailwindcss.com/docs)
   - [shadcn/ui](https://ui.shadcn.com)

4. **Ask Specific Questions**
   - "How do I implement X in this codebase?"
   - "Why did we choose Y approach?"
   - "What's the best way to structure Z component?"

## Success Metrics

You're doing great if:

- ✅ Each step takes 1-3 hours
- ✅ Features work on first try (or close to it)
- ✅ No TypeScript errors
- ✅ Code looks similar to existing code
- ✅ You're updating ROADMAP.md as you go

Don't worry if:

- ❌ You need to refactor something
- ❌ You take longer on some steps
- ❌ You make mistakes (that's learning!)

## Next Steps

1. ✅ Read ARCHITECTURE.md (understand the big picture)
2. ✅ Read ROADMAP.md (understand the plan)
3. ⬜ Start with Milestone 1, Step 1.2 (storage abstraction)
4. ⬜ Follow the roadmap step by step
5. ⬜ Update docs as you go

## Tips for Success

- 🎯 **Follow the order** - Steps build on each other
- 🧪 **Test frequently** - After each component
- 📝 **Document decisions** - Update DECISIONS.md when you make choices
- 🔄 **Commit often** - Small, focused commits
- 📱 **Check mobile** - Responsive by default
- 🎨 **Use existing components** - Don't reinvent shadcn components
- 🚀 **Deploy early** - Set up Vercel after Milestone 1

## Questions?

- Re-read the plan and documentation
- Review existing code for patterns
- Ask specific questions with context

---

Ready to start? Go to [ROADMAP.md](./ROADMAP.md) and begin with **Milestone 1, Step 1.2**!

Good luck! 🚀✨
