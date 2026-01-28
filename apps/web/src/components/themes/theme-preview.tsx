'use client';

import { type Theme } from '@/lib/themes.config';

interface ThemePreviewProps {
  theme: Theme;
  isSelected?: boolean;
  onClick?: () => void;
}

/**
 * Theme preview component showing color palette
 * Displays a visual representation of the theme's color scheme
 */
export function ThemePreview({ theme, isSelected = false, onClick }: ThemePreviewProps) {
  const { colors } = theme;

  return (
    <div
      className={`
        relative p-3 rounded-lg border-2 cursor-pointer transition-all
        ${isSelected ? 'border-primary ring-2 ring-ring' : 'border-border hover:border-primary/50'}
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Select ${theme.name} theme`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm">{theme.name}</span>
          {isSelected && (
            <span className="text-xs text-primary font-medium">Selected</span>
          )}
        </div>
        <div className="flex gap-1">
          {/* Primary color */}
          <div
            className="w-6 h-6 rounded border border-border/50"
            style={{ backgroundColor: colors.primary }}
            title="Primary"
          />
          {/* Background color */}
          <div
            className="w-6 h-6 rounded border border-border/50"
            style={{ backgroundColor: colors.background }}
            title="Background"
          />
          {/* Accent color */}
          <div
            className="w-6 h-6 rounded border border-border/50"
            style={{ backgroundColor: colors.accent }}
            title="Accent"
          />
          {/* Secondary color */}
          <div
            className="w-6 h-6 rounded border border-border/50"
            style={{ backgroundColor: colors.secondary }}
            title="Secondary"
          />
          {/* Muted color */}
          <div
            className="w-6 h-6 rounded border border-border/50"
            style={{ backgroundColor: colors.muted }}
            title="Muted"
          />
        </div>
        {theme.description && (
          <p className="text-xs text-muted-foreground mt-1">{theme.description}</p>
        )}
      </div>
    </div>
  );
}
