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
        relative rounded-xs border-none cursor-pointer transition-all w-full
        ${isSelected ? 'bg-primary' : 'hover:bg-secondary'}
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
      style={{
        padding: '5px',
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-start gap-1">
          <span className={`font-medium text-sm ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground'}`}>{theme.name}</span>
        </div>
        {theme.description && (
          <p className={`text-xs ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground'}`}>{theme.description}</p>
        )}
        <div className="flex flex-row justify-start gap-1 items-center">
          {/* Primary color */}
          <div
            className="w-6 h-6 rounded border border-border/50 rounded-sm"
            style={{ backgroundColor: colors.primary }}
            title="Primary"
          />
          {/* Background color */}
          <div
            className="w-6 h-6 rounded border border-border/50 rounded-sm"
            style={{ backgroundColor: colors.background }}
            title="Background"
          />
          {/* Accent color */}
          <div
            className="w-6 h-6 rounded border border-border/50 rounded-sm"
            style={{ backgroundColor: colors.accent }}
            title="Accent"
          />
          {/* Secondary color */}
          <div
            className="w-6 h-6 rounded border border-border/50 rounded-sm"
            style={{ backgroundColor: colors.secondary }}
            title="Secondary"
          />
          {/* Muted color */}
          <div
            className="w-6 h-6 rounded border border-border/50 rounded-sm"
            style={{ backgroundColor: colors.muted }}
            title="Muted"
          />
        </div>
      </div>
    </div>
  );
}
