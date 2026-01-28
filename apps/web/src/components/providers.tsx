"use client";

import { ThemeProvider } from "./theme-provider";
import { ThemeInitializer } from "./themes/theme-initializer";
import { Toaster } from "./ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ThemeInitializer />
      {children}
      <Toaster richColors />
    </ThemeProvider>
  );
}
