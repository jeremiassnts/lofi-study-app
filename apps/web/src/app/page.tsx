"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import { PomodoroSection } from "@/components/dashboard/pomodoro-section";
import { TasksSection } from "@/components/dashboard/tasks-section";
import { LofiPlayerSection } from "@/components/dashboard/lofi-player-section";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 h-full min-h-0">
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
        {/* Left Column - Pomodoro Timer */}
        <div className="">
          <ErrorBoundary>
            <PomodoroSection />
          </ErrorBoundary>
        </div>
        {/* Center Column - Task Manager */}
        <div className="">
          <ErrorBoundary>
            <TasksSection />
          </ErrorBoundary>
        </div>
        {/* Right Section - Lofi Player */}
        <div className="">
          <ErrorBoundary>
            <LofiPlayerSection />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
