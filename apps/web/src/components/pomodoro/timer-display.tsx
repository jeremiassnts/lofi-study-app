'use client';

import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  timeRemaining: number;
  formatTime: (seconds: number) => string;
  progress: number;
  isRunning: boolean;
  isBreak: boolean;
  justCompleted?: boolean;
}

export function TimerDisplay({
  timeRemaining,
  formatTime,
  progress,
  isRunning,
  isBreak,
  justCompleted = false,
}: TimerDisplayProps) {
  const strokeWidth = 8;
  const radius = 120;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Status Label */}
      <div className="text-sm font-medium text-muted-foreground">
        {isBreak ? '☕ Break Time' : '🍅 Focus Session'}
      </div>

      {/* Circular Timer */}
      <div className="relative transition-all duration-300">
        {/* Completion flash overlay */}
        {justCompleted && (
          <div
            className="absolute inset-0 rounded-full bg-primary/25 animate-in fade-in-0 duration-200"
            aria-hidden
          />
        )}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={cn(
              'transition-all duration-300',
              isBreak ? 'text-green-500' : 'text-primary',
              isRunning && 'animate-pulse'
            )}
            strokeLinecap="round"
          />
        </svg>

        {/* Time Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-bold tabular-nums">
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Pulse ring when running — subtle */}
        {isRunning && (
          <div
            className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20 z-0"
            aria-hidden
          />
        )}
      </div>

      {/* Session Count (placeholder for future) */}
      <div className="text-xs text-muted-foreground">
        Stay focused and productive
      </div>
    </div>
  );
}
