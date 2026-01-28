'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getItem, setItem } from '@/lib/storage';
import type { PomodoroState, PomodoroConfig, TimerState } from '@/types/pomodoro';

const DEFAULT_CONFIG: PomodoroConfig = {
  focusDuration: 25,
  breakDuration: 5,
  soundEnabled: true,
  autoStartBreak: false,
};

export function usePomodoro() {
  const [state, setState] = useState<TimerState>('idle');
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [config, setConfig] = useState<PomodoroConfig>(DEFAULT_CONFIG);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const notificationPermission = useRef<NotificationPermission>('default');

  // Load config from storage on mount
  useEffect(() => {
    const savedConfig = getItem<PomodoroConfig>('pomodoro-config');
    if (savedConfig) {
      setConfig(savedConfig);
      setTimeRemaining(savedConfig.focusDuration * 60);
    }

    // Request notification permission
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then((permission) => {
        notificationPermission.current = permission;
      });
    }
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (state === 'running' || state === 'break') {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state]);

  /**
   * Handles timer completion
   */
  const handleTimerComplete = useCallback(() => {
    // Play sound if enabled
    if (config.soundEnabled) {
      playCompletionSound();
    }

    // Show notification
    if (notificationPermission.current === 'granted') {
      const title = state === 'running' ? 'Focus session complete!' : 'Break time is over!';
      const body = state === 'running' 
        ? 'Time for a break. Great work!' 
        : 'Ready to focus again?';
      
      new Notification(title, { body, icon: '/favicon.ico' });
    }

    // Auto-start break or reset
    if (state === 'running' && config.autoStartBreak) {
      setState('break');
      setTimeRemaining(config.breakDuration * 60);
    } else {
      setState('idle');
      setTimeRemaining(state === 'running' ? config.breakDuration * 60 : config.focusDuration * 60);
    }
  }, [state, config]);

  /**
   * Plays completion sound using Web Audio API
   */
  const playCompletionSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  /**
   * Starts or resumes the timer
   */
  const start = useCallback(() => {
    if (state === 'idle') {
      setState('running');
      setTimeRemaining(config.focusDuration * 60);
    } else if (state === 'paused') {
      setState('running');
    }
  }, [state, config]);

  /**
   * Pauses the timer
   */
  const pause = useCallback(() => {
    if (state === 'running' || state === 'break') {
      setState('paused');
    }
  }, [state]);

  /**
   * Resets the timer to idle state
   */
  const reset = useCallback(() => {
    setState('idle');
    setTimeRemaining(config.focusDuration * 60);
  }, [config]);

  /**
   * Starts a break session manually
   */
  const startBreak = useCallback(() => {
    setState('break');
    setTimeRemaining(config.breakDuration * 60);
  }, [config]);

  /**
   * Updates the configuration
   */
  const updateConfig = useCallback((newConfig: Partial<PomodoroConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    setItem('pomodoro-config', updated);
    
    // Reset timer if idle
    if (state === 'idle') {
      setTimeRemaining(updated.focusDuration * 60);
    }
  }, [config, state]);

  /**
   * Formats time in MM:SS format
   */
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  /**
   * Calculates progress percentage
   */
  const getProgress = useCallback((): number => {
    const total = state === 'break' 
      ? config.breakDuration * 60 
      : config.focusDuration * 60;
    return ((total - timeRemaining) / total) * 100;
  }, [state, timeRemaining, config]);

  return {
    state,
    timeRemaining,
    config,
    start,
    pause,
    reset,
    startBreak,
    updateConfig,
    formatTime,
    getProgress,
    isRunning: state === 'running' || state === 'break',
    isPaused: state === 'paused',
    isIdle: state === 'idle',
    isBreak: state === 'break',
  };
}
