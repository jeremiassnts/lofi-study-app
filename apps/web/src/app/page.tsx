"use client";

import { PomodoroSection } from "@/components/dashboard/pomodoro-section";
import { TasksSection } from "@/components/dashboard/tasks-section";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Left Column - Pomodoro Timer */}
        <div className="lg:col-span-1">
          <PomodoroSection />
        </div>

        {/* Center Column - Task Manager */}
        <div className="lg:col-span-2">
          <TasksSection />
        </div>
      </div>

      {/* Bottom Section - Lofi Player (Phase 3) */}
      <div className="mt-6">
        <div className="rounded-lg border border-dashed p-8 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <h3 className="text-lg font-medium mb-2">🎵 Lofi Music Player</h3>
            <p className="text-sm">Coming in Phase 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
