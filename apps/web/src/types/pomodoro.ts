/**
 * Pomodoro Timer Type Definitions
 */

export type TimerState = 'idle' | 'running' | 'paused' | 'break';

export interface PomodoroConfig {
  focusDuration: number;     // in minutes
  breakDuration: number;      // in minutes
  soundEnabled: boolean;
  autoStartBreak: boolean;
}

export interface PomodoroState {
  state: TimerState;
  timeRemaining: number;      // in seconds
  config: PomodoroConfig;
}
