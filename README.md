# 🎵 Lofi Study App

> A beautiful, minimalist study companion with Pomodoro timer, task management, and ambient lofi music.

[![Build Status](https://github.com/yourusername/lofi-study-app/workflows/CI/badge.svg)](https://github.com/yourusername/lofi-study-app/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://lofi-study-app.vercel.app) • [Documentation](./docs/ARCHITECTURE.md) • [Features](./docs/FEATURES.md) • [Roadmap](./docs/ROADMAP.md)

---

## ✨ Features

### 🍅 **Pomodoro Timer**
- Customizable focus and break intervals
- Browser notifications and sound alerts
- Visual circular progress indicator
- Persistent settings

### ✅ **Task Management**
- Create, edit, delete tasks with ease
- Organize tasks into groups (subjects, projects)
- Filter by status and group
- Local storage persistence (works offline)

### 🎵 **Lofi Music Player**
- Embedded YouTube lofi streams
- Multiple curated channels
- Volume control
- Non-intrusive, collapsible interface

### 🎨 **Multi-Theme System**
- 5 carefully crafted themes
- Light and dark modes
- WCAG AA accessible
- Smooth transitions

### 📱 **Fully Responsive**
- Desktop, tablet, and mobile optimized
- Progressive Web App ready
- Touch-friendly interface

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lofi-study-app.git
cd lofi-study-app

# Install dependencies
pnpm install

# Start development server
pnpm dev:web
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build for Production

```bash
# Build all packages
pnpm build

# Start production server
cd apps/web
pnpm start
```

---

## 🏗️ Tech Stack

### Core
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Build Tools
- **[Turborepo](https://turbo.build/)** - Monorepo build system
- **[pnpm](https://pnpm.io/)** - Fast, efficient package manager

### Integrations
- **[React Player](https://github.com/cookpete/react-player)** - YouTube embed
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Lucide React](https://lucide.dev/)** - Icon library

---

## 📁 Project Structure

```
lofi-study-app/
├── apps/
│   └── web/                    # Next.js application
│       ├── src/
│       │   ├── app/            # App router pages
│       │   ├── components/     # React components
│       │   │   ├── dashboard/  # Main sections
│       │   │   ├── pomodoro/   # Timer components
│       │   │   ├── tasks/      # Task management
│       │   │   ├── lofi-player/# Music player
│       │   │   ├── themes/     # Theme system
│       │   │   └── ui/         # shadcn components
│       │   ├── lib/            # Utilities
│       │   └── types/          # TypeScript types
│       └── public/             # Static assets
├── packages/
│   ├── config/                 # Shared configs
│   └── env/                    # Environment validation
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md         # System design
│   ├── DECISIONS.md            # ADRs
│   ├── FEATURES.md             # User guide
│   └── ROADMAP.md              # Implementation plan
└── .github/
    └── workflows/              # CI/CD pipelines
```

---

## 📖 Documentation

- **[Architecture](./docs/ARCHITECTURE.md)** - System design and patterns
- **[Features](./docs/FEATURES.md)** - User-facing feature documentation
- **[Roadmap](./docs/ROADMAP.md)** - Step-by-step implementation guide
- **[Decisions](./docs/DECISIONS.md)** - Architectural decision records (ADRs)

---

## 🎯 Design Philosophy

### Minimalist & Focused
Clean interface that doesn't distract from studying. Every feature serves a clear purpose.

### Cozy Aesthetic
Warm colors, gentle animations, and lofi vibes create a comfortable study environment.

### Privacy-First
No user accounts, no tracking, no analytics. All data stays in your browser.

### Performance-Focused
Optimized bundle size, lazy loading, and Turbo caching for fast load times.

### Accessibility-Minded
WCAG AA compliant, keyboard navigation, and screen reader support throughout.

---

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start all apps with Turbo
pnpm dev:web          # Start web app only

# Building
pnpm build            # Build all packages
pnpm check-types      # TypeScript validation

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Run Prettier
```

### Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/lofi-study-app)

1. Connect your GitHub repository to Vercel
2. Set root directory to `apps/web`
3. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Works with Next.js plugin
- **Railway**: Docker or Nixpacks
- **Cloudflare Pages**: Experimental Next.js support

---

## 🎨 Screenshots

_Coming soon after implementation_

<!-- 
![Hero Screenshot](./docs/images/hero-screenshot.png)
![Pomodoro Demo](./docs/images/pomodoro-demo.gif)
![Task Management](./docs/images/tasks-demo.gif)
![Theme Switcher](./docs/images/theme-switch-demo.gif)
-->

---

## 🗺️ Roadmap

### ✅ MVP (v1.0)
- [x] Project setup and architecture
- [ ] Pomodoro timer with notifications
- [ ] Task management with groups
- [ ] Lofi music player
- [ ] Multi-theme system
- [ ] CI/CD pipeline
- [ ] Documentation

### 🚧 Future Enhancements
- [ ] Drag-and-drop task reordering
- [ ] Pomodoro statistics and charts
- [ ] Export/import tasks
- [ ] Keyboard shortcuts
- [ ] PWA support (offline mode)
- [ ] Custom theme builder

### 💭 Under Consideration
- [ ] User accounts and cloud sync
- [ ] Collaborative task lists
- [ ] Study streak tracking
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)

See [ROADMAP.md](./docs/ROADMAP.md) for detailed implementation plan.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)** - Project starter template
- **[Lofi Girl](https://www.youtube.com/@LofiGirl)** - Inspiration and music
- **[shadcn](https://twitter.com/shadcn)** - Amazing UI component library
- **[Vercel](https://vercel.com/)** - Deployment platform

---

## 💬 Contact

Have questions or feedback? 

- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Twitter**: [@yourusername](https://twitter.com/yourusername)

---

<div align="center">

**[⬆ Back to Top](#-lofi-study-app)**

Made with ❤️ and ☕ by [Your Name](https://github.com/yourusername)

</div>
