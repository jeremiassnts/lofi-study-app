'use client';

import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Coffee, Settings } from 'lucide-react';

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
}: TimerControlsProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Primary Controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Start/Pause Button */}
        {!isRunning && !isBreak ? (
          <Button
            size="lg"
            onClick={onStart}
            className="w-32"
          >
            <Play className="mr-2 h-4 w-4" />
            {isPaused ? 'Resume' : 'Start'}
          </Button>
        ) : (
          <Button
            size="lg"
            variant="secondary"
            onClick={onPause}
            className="w-32"
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
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Start Break Button */}
        {isIdle && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onStartBreak}
            className="text-muted-foreground"
          >
            <Coffee className="mr-2 h-4 w-4" />
            Start Break
          </Button>
        )}

        {/* Settings Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={onOpenSettings}
          className="text-muted-foreground"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}
