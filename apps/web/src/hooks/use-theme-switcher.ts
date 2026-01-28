'use client';

import { useEffect, useState } from 'react';
import { getItem, setItem } from '@/lib/storage';
import { themes, getThemeById, DEFAULT_THEME_ID, type Theme } from '@/lib/themes.config';

const THEME_STORAGE_KEY = 'theme';

/**
 * Custom hook for managing multi-theme switching
 * 
 * Handles:
 * - Loading theme from localStorage
 * - Applying theme via CSS custom properties
 * - Persisting theme selection
 * - Smooth theme transitions
 */
export function useThemeSwitcher() {
  const [currentThemeId, setCurrentThemeId] = useState<string>(DEFAULT_THEME_ID);
  const [mounted, setMounted] = useState(false);

  // Load theme from storage on mount
  useEffect(() => {
    const savedThemeId = getItem<string>(THEME_STORAGE_KEY);
    if (savedThemeId && getThemeById(savedThemeId)) {
      setCurrentThemeId(savedThemeId);
    }
    setMounted(true);
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    if (!mounted) return;

    const theme = getThemeById(currentThemeId);
    if (!theme) return;

    const root = document.documentElement;
    const { colors } = theme;

    // Apply all color variables with smooth transition
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

    // Persist to localStorage
    setItem(THEME_STORAGE_KEY, currentThemeId);
  }, [currentThemeId, mounted]);

  const setTheme = (themeId: string) => {
    if (getThemeById(themeId)) {
      setCurrentThemeId(themeId);
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
