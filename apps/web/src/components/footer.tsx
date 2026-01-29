"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="px-4 py-4 text-sm text-muted-foreground">
        <div className="mx-auto flex w-full px-10 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              © 2026, Lofi Study App by <a href="https://jeremiassnts.vercel.app/en" target="_blank" rel="noopener noreferrer">Jeremias Santos</a>. All rights reserved.
            </p>
          </div>
          {/* Links & contact */}
          <div className="flex flex-row gap-3 sm:items-end">
            <Link
              href="https://github.com/jeremiassnts/lofi-study-app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              GitHub
            </Link>
            <a
              href="https://www.linkedin.com/in/jeremias-santos-b98674119"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
