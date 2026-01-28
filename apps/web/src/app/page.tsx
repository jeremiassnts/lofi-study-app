"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import { PomodoroSection } from "@/components/dashboard/pomodoro-section";
import { TasksSection } from "@/components/dashboard/tasks-section";
import { LofiPlayerSection } from "@/components/dashboard/lofi-player-section";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 h-full min-h-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 h-full min-h-0">
        {/* Left Column - Pomodoro Timer */}
        <div className="min-h-[280px] lg:min-h-0 lg:col-span-1">
          <ErrorBoundary>
            <PomodoroSection />
          </ErrorBoundary>
        </div>

        {/* Center Column - Task Manager */}
        <div className="min-h-[320px] lg:min-h-0 lg:col-span-2 flex flex-col">
          <ErrorBoundary>
            <TasksSection />
          </ErrorBoundary>
        </div>
      </div>

      {/* Bottom Section - Lofi Player */}
      <div className="mt-4 lg:mt-6">
        <ErrorBoundary>
          <LofiPlayerSection />
        </ErrorBoundary>
      </div>
    </div>
  );
}
