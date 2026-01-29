'use client';

/**
 * Multi-theme switcher: applies theme via CSS custom properties and persists to localStorage.
 * @module use-theme-switcher
 */

import { useEffect, useState, useSyncExternalStore } from 'react';
import { getItem, setItem } from '@/lib/storage';
import { themes, getThemeById, DEFAULT_THEME_ID } from '@/lib/themes.config';

/** localStorage key for current theme ID (no prefix; uses app prefix in storage.ts). */
const THEME_STORAGE_KEY = 'theme';

const themeListeners = new Set<() => void>();

function getThemeSnapshot(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME_ID;
  const saved = getItem<string>(THEME_STORAGE_KEY);
  return saved && getThemeById(saved) ? saved : DEFAULT_THEME_ID;
}

function subscribeToTheme(listener: () => void) {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
}

/**
 * Multi-theme switcher. Loads theme from localStorage (useSyncExternalStore),
 * applies theme colors to :root CSS variables, and persists selection.
 * Storage key: lofi-study:theme. mounted is false until after hydration to avoid Radix dropdown mismatch.
 * @returns themes, currentTheme, currentThemeId, setTheme, mounted.
 */
export function useThemeSwitcher() {
  const currentThemeId = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => DEFAULT_THEME_ID,
  );
  const [mounted, setMounted] = useState(false);

  // Set mounted after hydration so server and first client render match (placeholder only)
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- avoid hydration mismatch with Radix dropdown */
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    if (!mounted) return;
    const theme = getThemeById(currentThemeId);
    if (!theme) return;

    const root = document.documentElement;
    const { colors } = theme;

    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--foreground', colors.foreground);
    root.style.setProperty('--card', colors.card);
    root.style.setProperty('--card-foreground', colors.cardForeground);
    root.style.setProperty('--popover', colors.popover);
    root.style.setProperty('--popover-foreground', colors.popoverForeground);
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-foreground', colors.primaryForeground);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--secondary-foreground', colors.secondaryForeground);
    root.style.setProperty('--muted', colors.muted);
    root.style.setProperty('--muted-foreground', colors.mutedForeground);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--accent-foreground', colors.accentForeground);
    root.style.setProperty('--destructive', colors.destructive);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--input', colors.input);
    root.style.setProperty('--ring', colors.ring);
    root.style.setProperty('--chart-1', colors.chart1);
    root.style.setProperty('--chart-2', colors.chart2);
    root.style.setProperty('--chart-3', colors.chart3);
    root.style.setProperty('--chart-4', colors.chart4);
    root.style.setProperty('--chart-5', colors.chart5);
    root.style.setProperty('--sidebar', colors.sidebar);
    root.style.setProperty('--sidebar-foreground', colors.sidebarForeground);
    root.style.setProperty('--sidebar-primary', colors.sidebarPrimary);
    root.style.setProperty('--sidebar-primary-foreground', colors.sidebarPrimaryForeground);
    root.style.setProperty('--sidebar-accent', colors.sidebarAccent);
    root.style.setProperty('--sidebar-accent-foreground', colors.sidebarAccentForeground);
    root.style.setProperty('--sidebar-border', colors.sidebarBorder);
    root.style.setProperty('--sidebar-ring', colors.sidebarRing);

    setItem(THEME_STORAGE_KEY, currentThemeId);
  }, [currentThemeId, mounted]);

  const setTheme = (themeId: string) => {
    if (getThemeById(themeId)) {
      setItem(THEME_STORAGE_KEY, themeId);
      themeListeners.forEach((l) => l());
    }
  };

  const currentTheme = getThemeById(currentThemeId) || themes[0];

  return {
    themes,
    currentTheme,
    currentThemeId,
    setTheme,
    mounted,
  };
}
