# Lofi Study App - Feature Documentation

User-facing documentation for all features in the application.

---

## 🍅 Pomodoro Timer

A focused study timer based on the Pomodoro Technique.

### What It Does
- **Focus Sessions**: 25-minute work intervals (customizable)
- **Break Times**: 5-minute breaks between sessions (customizable)
- **Notifications**: Browser notifications when a session ends
- **Sound Alerts**: Optional audio cue at completion
- **Progress Tracking**: Visual circular timer with remaining time

### How to Use

1. **Start a Session**: Click the "Start" button
2. **Pause if Needed**: Click "Pause" to temporarily stop the timer
3. **Reset**: Click "Reset" to restart the current session
4. **Customize**: Click the settings icon to adjust durations

### Settings

Configure your perfect study rhythm:
- **Focus Duration**: How long to work (default: 25 minutes)
- **Break Duration**: How long to rest (default: 5 minutes)
- **Sound Enabled**: Toggle audio alerts on/off
- **Auto-start Breaks**: Automatically start break timer after focus session

### Tips

- 📱 **Enable Notifications**: Allow browser notifications for the best experience
- 🔊 **Use Sound**: Audio cues help you stay focused without watching the timer
- ⏸️ **Take Breaks**: Don't skip breaks—they improve overall productivity

---

## ✅ Task Manager

Organize your study tasks with a simple, flexible to-do system.

### What It Does
- **Task Management**: Create, edit, delete, and complete tasks
- **Task Groups**: Organize tasks by subject (Math, History, etc.)
- **Persistence**: All tasks saved automatically to your browser
- **Filtering**: View all tasks, active only, or completed
- **Group Management**: Create custom groups with colors

### How to Use

#### Creating Tasks
1. Click "Add Task" or press the `+` button
2. Enter task title (e.g., "Study Chapter 5")
3. Optionally assign to a group
4. Press Enter or click Save

#### Managing Tasks
- **Complete**: Click the checkbox to mark done
- **Edit**: Click the task title or edit icon
- **Delete**: Click the trash icon (confirms before deleting)

#### Working with Groups
1. Click "Manage Groups" in the header
2. Create new groups with custom names and colors
3. Assign tasks to groups when creating/editing
4. Collapse/expand groups to focus on what matters

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Quick add task
- `Escape`: Cancel edit mode
- `Delete`: Remove selected task (with confirmation)

### Data Storage

All tasks are stored locally in your browser. This means:
- ✅ Works offline
- ✅ No account required
- ✅ Private and secure
- ⚠️ Tasks are device-specific (not synced across devices)
- ⚠️ Clearing browser data deletes tasks

**Future**: Export/import functionality and cloud sync coming in future versions.

---

## 🎵 Lofi Music Player

Ambient background music to enhance focus.

### What It Does
- **24/7 Streaming**: Continuous lofi hip-hop from YouTube
- **Volume Control**: Adjust music level independently
- **Minimal Interface**: Doesn't distract from studying
- **Multiple Streams**: Choose from curated lofi channels

### How to Use

1. **Play/Pause**: Click the play button to start music
2. **Adjust Volume**: Use the volume slider (0-100%)
3. **Switch Streams**: Select different lofi channels from dropdown
4. **Collapse Player**: Hide player when not needed

### Available Streams

- **Lofi Girl** - Classic 24/7 beats to relax/study to
- **Chillhop Music** - Jazzy lofi hip-hop
- **The Jazz Hop Café** - Smooth jazz-influenced beats
- **College Music** - Upbeat study vibes

### Tips

- 🎧 **Use Headphones**: Better immersion and focus
- 🔇 **Low Volume**: Keep music in the background (30-50%)
- 🌙 **Great for Night Study**: Helps create ambient environment

### Troubleshooting

**Music Won't Play?**
- Check your internet connection
- Try a different stream (some may be offline)
- Disable browser extensions that block YouTube
- Refresh the page

**Choppy Playback?**
- Check your internet speed
- Close unnecessary browser tabs
- Try a lower quality stream setting

---

## 🎨 Themes

Multiple visual themes for comfortable studying in any lighting condition.

### Available Themes

#### 1. **Lofi Cozy** (Default Dark)
- Warm browns and muted purples
- Soft orange accents
- Best for: Evening/night study sessions
- Aesthetic: Cozy coffee shop vibes

#### 2. **Minimal Light**
- Clean whites and subtle grays
- High contrast for readability
- Best for: Daytime, well-lit rooms
- Aesthetic: Modern, professional

#### 3. **Midnight Study**
- Deep navy with teal accents
- Low contrast for reduced eye strain
- Best for: Late-night study sessions
- Aesthetic: Calm, focused atmosphere

#### 4. **Sakura**
- Soft pinks and cream tones
- Cherry blossom inspired
- Best for: Morning study, light work
- Aesthetic: Gentle, peaceful

#### 5. **Forest Focus**
- Earthy greens and wood tones
- Nature-inspired palette
- Best for: Long study sessions, focus work
- Aesthetic: Natural, grounding

### How to Switch Themes

1. Click the theme selector in the header (palette icon)
2. Preview themes with color swatches
3. Click to apply instantly
4. Your choice is saved automatically

### Customization

All themes are:
- ✅ **WCAG AA Compliant**: Good contrast for readability
- ✅ **Consistent**: All components adapt to theme
- ✅ **Smooth**: 200ms transitions between theme changes

**Future**: Custom theme builder where you can create your own color schemes.

---

## ⌨️ Keyboard Shortcuts

Speed up your workflow with keyboard shortcuts.

### Global Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt + T` | Toggle theme selector |
| `Alt + P` | Focus Pomodoro timer |
| `Alt + L` | Focus task list |
| `Alt + M` | Toggle music player |

### Pomodoro Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` | Start/Pause timer |
| `R` | Reset timer |
| `S` | Open settings |

### Task Shortcuts

| Shortcut | Action |
|----------|--------|
| `N` or `+` | New task |
| `Enter` | Save task |
| `Escape` | Cancel edit |
| `Ctrl + Enter` | Quick add task |

**Note**: Shortcuts are only active when the respective section is focused.

---

## ✨ Polish & Animations (Phase 5)

Refined UX from Milestone 5:

### Pomodoro
- **Pulse ring** when the timer is running
- **Flash animation** when a focus or break session completes
- **Button transitions** (scale on press, smooth state changes)

### Tasks
- **Checkbox checkmark** animation on complete
- **Strikethrough transition** when marking tasks done
- **Fade-in** when adding new tasks
- **Focus indicators** and improved hover states on task items

### Loading & Errors
- **Skeleton loaders** for task list and lofi player while loading
- **Error boundaries** around each dashboard section (Pomodoro, Tasks, Player)
- **Toasts** for storage failures and stream-offline issues
- **Form validation** with `aria-invalid` and `role="alert"` for accessibility

### Responsive Layout
- **Desktop** (>1024px): 3-column grid (Pomodoro | Tasks | …)
- **Tablet** (768–1024px): 2-column layout; filters and player header wrap
- **Mobile** (<768px): Stacked sections, min-heights, collapsible player

---

## 💾 Data & Privacy

### What We Store

All data is stored locally in your browser using `localStorage`:

1. **Tasks & Groups**: Your to-do list and organization
2. **Pomodoro Settings**: Timer durations and preferences
3. **Theme Choice**: Your selected color scheme
4. **Player State**: Volume level and last stream

### What We DON'T Store

- ❌ No user accounts or personal information
- ❌ No analytics or tracking
- ❌ No cookies
- ❌ No server-side storage

### Data Size

Your data typically uses:
- Tasks: ~5-50KB (depending on number of tasks)
- Settings: ~1KB
- Total: Well under browser limits (5-10MB)

### Backup Your Data

**Export Tasks** (Coming Soon):
1. Go to task settings
2. Click "Export Tasks"
3. Save JSON file to your computer

**Import Tasks** (Coming Soon):
1. Go to task settings
2. Click "Import Tasks"
3. Select your JSON backup file

### Clear Data

To reset the app:
1. Open browser DevTools (F12)
2. Go to Application → Storage → Local Storage
3. Delete items starting with `lofi-study:`

Or use browser settings to clear site data.

---

## 🚀 Tips for Productivity

### Pomodoro Best Practices

1. **Plan Your Day**: Start with a task list
2. **One Task Per Session**: Focus on a single task during each 25-minute block
3. **Track Completions**: Note how many pomodoros each task takes
4. **Take Long Breaks**: Every 4 pomodoros, take a 15-30 minute break
5. **Eliminate Distractions**: Put phone away, close social media

### Task Organization Tips

1. **Use Groups**: Separate by subject, priority, or project
2. **Break Down Big Tasks**: "Study for exam" → "Review Chapter 1", "Practice problems", etc.
3. **Daily Review**: Start each day by reviewing and updating your list
4. **Archive Completed**: Regularly clear old completed tasks
5. **Prioritize**: Put most important tasks at the top

### Creating the Perfect Study Environment

1. **Choose Your Theme**: Match to lighting conditions
2. **Set the Music**: Low volume lofi beats
3. **Start a Pomodoro**: Commit to 25 minutes of focus
4. **Check Off Tasks**: Satisfying progress tracking
5. **Take Breaks**: Stand up, stretch, hydrate

---

## 🐛 Troubleshooting

### General Issues

**App Not Loading?**
- Check internet connection
- Clear browser cache
- Try incognito/private mode
- Update your browser

**Tasks Disappeared?**
- Check if you're in the same browser/device
- Look in browser's localStorage (DevTools)
- Tasks are device-specific and not synced

**Settings Not Saving?**
- Check if browser allows localStorage
- Disable "private browsing" mode
- Check browser storage quota

### Browser Compatibility

**Fully Supported**:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 10+)

**Not Supported**:
- Internet Explorer (any version)
- Very old browsers without CSS variable support

### Report Issues

Find a bug? Want a feature? Open an issue on GitHub:
[github.com/yourusername/lofi-study-app/issues](https://github.com/yourusername/lofi-study-app/issues)

---

## 🔮 Roadmap

### Coming Soon

- [ ] Export/Import tasks
- [ ] Drag-and-drop task reordering
- [ ] Pomodoro statistics and charts
- [ ] Custom theme builder
- [ ] PWA support (install as app)
- [ ] Mobile app (React Native)

### Under Consideration

- [ ] User accounts and cloud sync
- [ ] Collaborative task lists
- [ ] Study streak tracking
- [ ] Integration with calendars
- [ ] Desktop app (Electron)

**Want to see a feature?** Open an issue or contribute!

---

**Last Updated**: 2026-01-28
