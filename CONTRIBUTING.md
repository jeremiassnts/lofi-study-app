# Contributing to Lofi Study App

Thank you for considering contributing to the Lofi Study App! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions. We're here to build something useful and learn together.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- **Description**: Clear description of the bug
- **Steps to Reproduce**: How to trigger the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, device
- **Screenshots**: If applicable

### Suggesting Features

Feature requests are welcome! Please open an issue with:
- **Feature Description**: What feature you'd like
- **Use Case**: Why it would be useful
- **Proposed Implementation**: Ideas on how to build it (optional)

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main` (use a descriptive name)
3. **Follow the roadmap** in `docs/ROADMAP.md` if implementing planned features
4. **Write clear commit messages** (see below)
5. **Test your changes** manually
6. **Update documentation** if needed
7. **Submit a PR** with a clear description

## Development Setup

### Prerequisites

- Node.js 20+
- pnpm 10+

### Getting Started

```bash
# Clone your fork
git clone https://github.com/yourusername/lofi-study-app.git
cd lofi-study-app

# Install dependencies
pnpm install

# Start dev server
pnpm dev:web

# Build to test
pnpm build

# Check types
pnpm check-types
```

## Code Style

### TypeScript

- Use TypeScript for all code
- Avoid `any` types
- Define interfaces for props and data structures
- Use type inference where appropriate

### React Components

- Use functional components with hooks
- Extract complex logic into custom hooks
- Keep components small and focused
- Use proper TypeScript types for props

Example:
```typescript
interface TimerDisplayProps {
  timeRemaining: number;
  isRunning: boolean;
}

export function TimerDisplay({ timeRemaining, isRunning }: TimerDisplayProps) {
  // Component implementation
}
```

### Naming Conventions

- **Components**: PascalCase (`TimerDisplay.tsx`)
- **Hooks**: camelCase with `use` prefix (`use-pomodoro.ts`)
- **Utilities**: camelCase (`storage.ts`)
- **Types**: PascalCase (`Task`, `PomodoroState`)
- **CSS Classes**: Tailwind utilities (no custom CSS unless necessary)

### File Organization

```
components/
├── feature/
│   ├── component-name.tsx       # Component
│   ├── use-feature.ts          # Hook
│   └── types.ts                # Local types
```

### Comments

- Use JSDoc for functions and hooks
- Comment complex logic
- Explain "why" not "what"
- Keep comments up to date

Example:
```typescript
/**
 * Custom hook for managing Pomodoro timer state.
 * 
 * @param initialDuration - Starting duration in seconds
 * @returns Timer state and control functions
 */
export function usePomodoro(initialDuration: number) {
  // Implementation
}
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Build process, dependencies, etc.

### Examples

```
feat(pomodoro): add sound notification on timer completion

Implements audio alert using HTML5 Audio API when Pomodoro
session completes. Sound can be toggled in settings.

Closes #12
```

```
fix(tasks): prevent duplicate task IDs

Tasks were occasionally getting duplicate IDs when created
in quick succession. Now using uuid library for guaranteed
unique identifiers.
```

```
docs(readme): add deployment instructions
```

## Testing

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] Feature works on desktop
- [ ] Feature works on mobile
- [ ] Feature works in light and dark themes
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] All existing features still work

### Browser Testing

Test in at least:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (if on Mac)

## Documentation

When adding features:

1. **Update ROADMAP.md**: Mark step as complete
2. **Update FEATURES.md**: Document user-facing features
3. **Update DECISIONS.md**: Add ADR if architectural decision was made
4. **Update README.md**: Update feature list if major feature

## Project Structure

### Directory Organization

```
apps/web/src/
├── app/                    # Next.js pages
├── components/
│   ├── dashboard/          # Section containers
│   ├── pomodoro/           # Timer feature
│   ├── tasks/              # Task management
│   ├── lofi-player/        # Music player
│   ├── themes/             # Theme system
│   └── ui/                 # shadcn components
├── lib/                    # Utilities
├── types/                  # Shared types
└── hooks/                  # Shared hooks
```

### Component Structure

Each feature should follow this pattern:

```
feature/
├── feature-section.tsx     # Container (layout only)
├── feature-display.tsx     # Presentation component
├── feature-controls.tsx    # Interactive controls
├── feature-settings.tsx    # Settings modal
└── use-feature.ts          # Business logic hook
```

## Architecture Guidelines

### State Management

- Use local component state (`useState`)
- Extract logic to custom hooks
- Avoid prop drilling (compose components)
- No global state library needed

### Storage

- Use the `lib/storage.ts` abstraction
- Don't use localStorage directly
- Always handle errors
- Keep data schemas documented

### Styling

- Use Tailwind utilities
- Use shadcn/ui components when possible
- Avoid custom CSS unless necessary
- Responsive by default (mobile-first)

### Performance

- Lazy load heavy components (React Player)
- Memoize expensive computations
- Avoid unnecessary re-renders
- Keep bundle size small

## Pull Request Process

1. **Create PR** with clear title and description
2. **Link Issues**: Reference related issues
3. **Add Screenshots**: If visual changes
4. **Update Docs**: If documentation needs updating
5. **Wait for Review**: Maintainer will review
6. **Address Feedback**: Make requested changes
7. **Merge**: Maintainer will merge when approved

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
How was this tested?

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Manual testing completed
- [ ] No console errors
```

## Questions?

If you have questions:
- Check existing [documentation](./docs/)
- Search [closed issues](https://github.com/yourusername/lofi-study-app/issues?q=is%3Aissue+is%3Aclosed)
- Open a new issue with your question

## Recognition

Contributors will be:
- Listed in README.md (upon request)
- Mentioned in release notes
- Appreciated! 🙏

---

Thank you for contributing to Lofi Study App! 🎵✨
