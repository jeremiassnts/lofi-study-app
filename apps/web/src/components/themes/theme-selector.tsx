'use client';

import { Palette } from 'lucide-react';
import { useThemeSwitcher } from '@/hooks/use-theme-switcher';
import { ThemePreview } from './theme-preview';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * Theme selector component
 * 
 * Provides a dropdown menu with theme previews and keyboard navigation.
 * Replaces the simple light/dark mode toggle with a multi-theme system.
 */
export function ThemeSelector() {
  const { themes, currentThemeId, setTheme, mounted } = useThemeSwitcher();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Palette className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Select theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="Select theme" className="rounded-sm" />}>
        <Palette className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Select theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px] rounded-sm">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="p-2 space-y-2">
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              className="p-0 focus:bg-transparent"
              onSelect={(e) => {
                e.preventDefault();
                setTheme(theme.id);
              }}
            >
              <ThemePreview
                theme={theme}
                isSelected={theme.id === currentThemeId}
                onClick={() => setTheme(theme.id)}
              />
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
