"use client";

import { PomodoroSection } from "@/components/dashboard/pomodoro-section";
import { TasksSection } from "@/components/dashboard/tasks-section";
import { LofiPlayerSection } from "@/components/dashboard/lofi-player-section";

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

      {/* Bottom Section - Lofi Player */}
      <div className="mt-6">
        <LofiPlayerSection />
      </div>
    </div>
  );
}
