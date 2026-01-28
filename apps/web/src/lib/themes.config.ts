/**
 * Theme configuration for the Lofi Study App
 * 
 * Defines 5 curated themes with CSS custom properties using oklch color format.
 * All themes are designed to meet WCAG AA contrast ratios for accessibility.
 */

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
}

/**
 * Lofi Cozy - Default dark theme
 * Warm browns, muted purples, soft orange accents
 * Best for: Evening/night study sessions
 */
const lofiCozy: Theme = {
  id: 'lofi-cozy',
  name: 'Lofi Cozy',
  description: 'Warm browns and muted purples',
  colors: {
    background: 'oklch(0.18 0.02 45)',
    foreground: 'oklch(0.95 0.01 45)',
    card: 'oklch(0.22 0.02 50)',
    cardForeground: 'oklch(0.95 0.01 45)',
    popover: 'oklch(0.22 0.02 50)',
    popoverForeground: 'oklch(0.95 0.01 45)',
    primary: 'oklch(0.65 0.15 35)',
    primaryForeground: 'oklch(0.95 0.01 45)',
    secondary: 'oklch(0.28 0.02 50)',
    secondaryForeground: 'oklch(0.95 0.01 45)',
    muted: 'oklch(0.28 0.02 50)',
    mutedForeground: 'oklch(0.65 0.02 50)',
    accent: 'oklch(0.35 0.05 60)',
    accentForeground: 'oklch(0.95 0.01 45)',
    destructive: 'oklch(0.58 0.22 27)',
    border: 'oklch(0.30 0.02 50)',
    input: 'oklch(0.30 0.02 50)',
    ring: 'oklch(0.65 0.15 35)',
    chart1: 'oklch(0.70 0.15 35)',
    chart2: 'oklch(0.65 0.12 280)',
    chart3: 'oklch(0.60 0.10 200)',
    chart4: 'oklch(0.55 0.08 120)',
    chart5: 'oklch(0.50 0.08 60)',
    sidebar: 'oklch(0.22 0.02 50)',
    sidebarForeground: 'oklch(0.95 0.01 45)',
    sidebarPrimary: 'oklch(0.65 0.15 35)',
    sidebarPrimaryForeground: 'oklch(0.95 0.01 45)',
    sidebarAccent: 'oklch(0.28 0.02 50)',
    sidebarAccentForeground: 'oklch(0.95 0.01 45)',
    sidebarBorder: 'oklch(0.30 0.02 50)',
    sidebarRing: 'oklch(0.65 0.15 35)',
  },
};

/**
 * Minimal Light - Clean light theme
 * Clean whites, subtle grays, high contrast
 * Best for: Daytime, well-lit rooms
 */
const minimalLight: Theme = {
  id: 'minimal-light',
  name: 'Minimal Light',
  description: 'Clean whites and subtle grays',
  colors: {
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.145 0 0)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.145 0 0)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.145 0 0)',
    primary: 'oklch(0.205 0 0)',
    primaryForeground: 'oklch(0.985 0 0)',
    secondary: 'oklch(0.97 0 0)',
    secondaryForeground: 'oklch(0.205 0 0)',
    muted: 'oklch(0.97 0 0)',
    mutedForeground: 'oklch(0.556 0 0)',
    accent: 'oklch(0.97 0 0)',
    accentForeground: 'oklch(0.205 0 0)',
    destructive: 'oklch(0.58 0.22 27)',
    border: 'oklch(0.922 0 0)',
    input: 'oklch(0.922 0 0)',
    ring: 'oklch(0.708 0 0)',
    chart1: 'oklch(0.809 0.105 251.813)',
    chart2: 'oklch(0.623 0.214 259.815)',
    chart3: 'oklch(0.546 0.245 262.881)',
    chart4: 'oklch(0.488 0.243 264.376)',
    chart5: 'oklch(0.424 0.199 265.638)',
    sidebar: 'oklch(0.985 0 0)',
    sidebarForeground: 'oklch(0.145 0 0)',
    sidebarPrimary: 'oklch(0.205 0 0)',
    sidebarPrimaryForeground: 'oklch(0.985 0 0)',
    sidebarAccent: 'oklch(0.97 0 0)',
    sidebarAccentForeground: 'oklch(0.205 0 0)',
    sidebarBorder: 'oklch(0.922 0 0)',
    sidebarRing: 'oklch(0.708 0 0)',
  },
};

/**
 * Midnight Study - Deep navy with teal accents
 * Low contrast for reduced eye strain
 * Best for: Late-night study sessions
 */
const midnightStudy: Theme = {
  id: 'midnight-study',
  name: 'Midnight Study',
  description: 'Deep navy with teal accents',
  colors: {
    background: 'oklch(0.15 0.03 240)',
    foreground: 'oklch(0.92 0.01 240)',
    card: 'oklch(0.18 0.03 240)',
    cardForeground: 'oklch(0.92 0.01 240)',
    popover: 'oklch(0.18 0.03 240)',
    popoverForeground: 'oklch(0.92 0.01 240)',
    primary: 'oklch(0.65 0.15 200)',
    primaryForeground: 'oklch(0.15 0.03 240)',
    secondary: 'oklch(0.25 0.03 240)',
    secondaryForeground: 'oklch(0.92 0.01 240)',
    muted: 'oklch(0.25 0.03 240)',
    mutedForeground: 'oklch(0.65 0.02 240)',
    accent: 'oklch(0.30 0.05 200)',
    accentForeground: 'oklch(0.92 0.01 240)',
    destructive: 'oklch(0.65 0.20 20)',
    border: 'oklch(0.28 0.03 240)',
    input: 'oklch(0.28 0.03 240)',
    ring: 'oklch(0.65 0.15 200)',
    chart1: 'oklch(0.70 0.15 200)',
    chart2: 'oklch(0.65 0.12 220)',
    chart3: 'oklch(0.60 0.10 180)',
    chart4: 'oklch(0.55 0.08 160)',
    chart5: 'oklch(0.50 0.08 200)',
    sidebar: 'oklch(0.18 0.03 240)',
    sidebarForeground: 'oklch(0.92 0.01 240)',
    sidebarPrimary: 'oklch(0.65 0.15 200)',
    sidebarPrimaryForeground: 'oklch(0.15 0.03 240)',
    sidebarAccent: 'oklch(0.25 0.03 240)',
    sidebarAccentForeground: 'oklch(0.92 0.01 240)',
    sidebarBorder: 'oklch(0.28 0.03 240)',
    sidebarRing: 'oklch(0.65 0.15 200)',
  },
};

/**
 * Sakura - Soft pinks and cream tones
 * Cherry blossom inspired
 * Best for: Morning study, light work
 */
const sakura: Theme = {
  id: 'sakura',
  name: 'Sakura',
  description: 'Soft pinks and cream tones',
  colors: {
    background: 'oklch(0.98 0.01 350)',
    foreground: 'oklch(0.25 0.05 350)',
    card: 'oklch(0.99 0.01 350)',
    cardForeground: 'oklch(0.25 0.05 350)',
    popover: 'oklch(0.99 0.01 350)',
    popoverForeground: 'oklch(0.25 0.05 350)',
    primary: 'oklch(0.55 0.12 350)',
    primaryForeground: 'oklch(0.98 0.01 350)',
    secondary: 'oklch(0.95 0.02 350)',
    secondaryForeground: 'oklch(0.30 0.05 350)',
    muted: 'oklch(0.95 0.02 350)',
    mutedForeground: 'oklch(0.50 0.03 350)',
    accent: 'oklch(0.92 0.03 340)',
    accentForeground: 'oklch(0.30 0.05 350)',
    destructive: 'oklch(0.60 0.20 20)',
    border: 'oklch(0.90 0.02 350)',
    input: 'oklch(0.90 0.02 350)',
    ring: 'oklch(0.55 0.12 350)',
    chart1: 'oklch(0.65 0.12 350)',
    chart2: 'oklch(0.60 0.10 340)',
    chart3: 'oklch(0.55 0.08 330)',
    chart4: 'oklch(0.50 0.08 320)',
    chart5: 'oklch(0.45 0.08 310)',
    sidebar: 'oklch(0.99 0.01 350)',
    sidebarForeground: 'oklch(0.25 0.05 350)',
    sidebarPrimary: 'oklch(0.55 0.12 350)',
    sidebarPrimaryForeground: 'oklch(0.98 0.01 350)',
    sidebarAccent: 'oklch(0.95 0.02 350)',
    sidebarAccentForeground: 'oklch(0.30 0.05 350)',
    sidebarBorder: 'oklch(0.90 0.02 350)',
    sidebarRing: 'oklch(0.55 0.12 350)',
  },
};

/**
 * Forest Focus - Earthy greens and wood tones
 * Nature-inspired palette
 * Best for: Long study sessions, focus work
 */
const forestFocus: Theme = {
  id: 'forest-focus',
  name: 'Forest Focus',
  description: 'Earthy greens and wood tones',
  colors: {
    background: 'oklch(0.20 0.03 140)',
    foreground: 'oklch(0.93 0.01 140)',
    card: 'oklch(0.24 0.03 140)',
    cardForeground: 'oklch(0.93 0.01 140)',
    popover: 'oklch(0.24 0.03 140)',
    popoverForeground: 'oklch(0.93 0.01 140)',
    primary: 'oklch(0.60 0.12 140)',
    primaryForeground: 'oklch(0.20 0.03 140)',
    secondary: 'oklch(0.30 0.03 140)',
    secondaryForeground: 'oklch(0.93 0.01 140)',
    muted: 'oklch(0.30 0.03 140)',
    mutedForeground: 'oklch(0.65 0.02 140)',
    accent: 'oklch(0.35 0.05 120)',
    accentForeground: 'oklch(0.93 0.01 140)',
    destructive: 'oklch(0.60 0.20 20)',
    border: 'oklch(0.32 0.03 140)',
    input: 'oklch(0.32 0.03 140)',
    ring: 'oklch(0.60 0.12 140)',
    chart1: 'oklch(0.65 0.12 140)',
    chart2: 'oklch(0.60 0.10 120)',
    chart3: 'oklch(0.55 0.08 100)',
    chart4: 'oklch(0.50 0.08 80)',
    chart5: 'oklch(0.45 0.08 60)',
    sidebar: 'oklch(0.24 0.03 140)',
    sidebarForeground: 'oklch(0.93 0.01 140)',
    sidebarPrimary: 'oklch(0.60 0.12 140)',
    sidebarPrimaryForeground: 'oklch(0.20 0.03 140)',
    sidebarAccent: 'oklch(0.30 0.03 140)',
    sidebarAccentForeground: 'oklch(0.93 0.01 140)',
    sidebarBorder: 'oklch(0.32 0.03 140)',
    sidebarRing: 'oklch(0.60 0.12 140)',
  },
};

/**
 * Theme registry - all available themes
 */
export const themes: Theme[] = [
  lofiCozy,
  minimalLight,
  midnightStudy,
  sakura,
  forestFocus,
];

/**
 * Default theme ID
 */
export const DEFAULT_THEME_ID = 'lofi-cozy';

/**
 * Get theme by ID
 */
export function getThemeById(id: string): Theme | undefined {
  return themes.find(theme => theme.id === id);
}

/**
 * Get default theme
 */
export function getDefaultTheme(): Theme {
  return lofiCozy;
}
