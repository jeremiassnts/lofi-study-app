'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePomodoro } from '@/components/pomodoro/use-pomodoro';
import { TimerDisplay } from '@/components/pomodoro/timer-display';
import { TimerControls } from '@/components/pomodoro/timer-controls';
import { TimerSettings } from '@/components/pomodoro/timer-settings';

export function PomodoroSection() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const pomodoro = usePomodoro();

  return (
    <>
      <Card className="h-full min-h-0 flex flex-col">
        <CardHeader className="shrink-0">
          <CardTitle>Pomodoro Timer</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 flex-1 min-h-0">
          <TimerDisplay
            timeRemaining={pomodoro.timeRemaining}
            formatTime={pomodoro.formatTime}
            progress={pomodoro.getProgress()}
            isRunning={pomodoro.isRunning}
            isBreak={pomodoro.isBreak}
            justCompleted={pomodoro.justCompleted}
          />
          
          <TimerControls
            isRunning={pomodoro.isRunning}
            isPaused={pomodoro.isPaused}
            isIdle={pomodoro.isIdle}
            isBreak={pomodoro.isBreak}
            onStart={pomodoro.start}
            onPause={pomodoro.pause}
            onReset={pomodoro.reset}
            onStartBreak={pomodoro.startBreak}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        </CardContent>
      </Card>

      <TimerSettings
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        config={pomodoro.config}
        onSave={pomodoro.updateConfig}
      />
    </>
  );
}
