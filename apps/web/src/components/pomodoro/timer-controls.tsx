'use client';

import { Button } from '@/components/ui/button';
import type { TimerState } from '@/types/pomodoro';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  isIdle: boolean;
  isBreak: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStartBreak: () => void;
  onOpenSettings: () => void;
  lastState: TimerState | null;
}

export function TimerControls({
  isRunning,
  isPaused,
  isIdle,
  isBreak,
  onStart,
  onPause,
  onReset,
  onStartBreak,
  onOpenSettings,
  lastState,
}: TimerControlsProps) {
  function start() {
    console.log(lastState);
    if (!lastState || lastState === 'break') {
      onStart();
    } else {
      onStartBreak();
    }
  }

  const startLabel = !lastState || lastState === 'break' ? 'Start Focus' : 'Start Break';

  return (
    <div className="flex flex-col gap-3">
      {/* Primary Controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Start/Pause Button */}
        {!isRunning && !isBreak ? (
          <Button
            size="lg"
            onClick={start}
            className="w-32 transition-all duration-200 active:scale-[0.98] rounded-sm z-10"
          >
            <Play className="mr-2 h-4 w-4" />
            {isPaused ? 'Resume' : startLabel}
          </Button>
        ) : (
          <Button
            size="lg"
            variant="secondary"
            type="button"
            onClick={onPause}
            className="w-32 transition-all duration-200 active:scale-[0.98] rounded-sm z-10"
          >
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
        )}

        {/* Reset Button */}
        {!isIdle && (
          <Button
            size="lg"
            variant="outline"
            onClick={onReset}
            className="transition-all duration-200 active:scale-[0.98] rounded-sm z-10"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Start Break Button */}
        {/* {isIdle && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onStartBreak}
            className="text-muted-foreground transition-all duration-200 active:scale-[0.98] rounded-sm z-10"
          >
            <Coffee className="mr-2 h-4 w-4" />
            Start Break
          </Button>
        )} */}

        {/* Settings Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={onOpenSettings}
          className="text-muted-foreground transition-all duration-200 active:scale-[0.98] rounded-sm z-10"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}
