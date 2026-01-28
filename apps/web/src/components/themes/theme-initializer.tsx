'use client';

import { useThemeSwitcher } from '@/hooks/use-theme-switcher';

/**
 * Theme initializer component
 * 
 * This component ensures the theme is applied on mount.
 * It uses the useThemeSwitcher hook which handles theme loading and application.
 */
export function ThemeInitializer() {
  useThemeSwitcher();
  return null;
}
