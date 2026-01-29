'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getItem, setItem } from '@/lib/storage';
import type { PomodoroConfig, TimerState } from '@/types/pomodoro';

const DEFAULT_CONFIG: PomodoroConfig = {
  focusDuration: 25,
  breakDuration: 5,
  soundEnabled: true,
  autoStartBreak: false,
};

function getInitialConfig(): PomodoroConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  const saved = getItem<PomodoroConfig>('pomodoro-config');
  return saved ?? DEFAULT_CONFIG;
}

export function usePomodoro() {
  const [state, setState] = useState<TimerState>('idle');
  const initialConfig = getInitialConfig();
  const [timeRemaining, setTimeRemaining] = useState(initialConfig.focusDuration * 60);
  const [config, setConfig] = useState<PomodoroConfig>(initialConfig);
  const [justCompleted, setJustCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const notificationPermission = useRef<NotificationPermission>('default');

  // Request notification permission on mount (no setState)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then((permission) => {
        notificationPermission.current = permission;
      });
    }
  }, []);

  /**
   * Plays completion sound using Web Audio API
   */
  const playCompletionSound = useCallback(() => {
    try {
      if (typeof window === 'undefined') return;
      const Ctor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const audioContext = new Ctor();
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
  }, []);

  /**
   * Handles timer completion
   */
  const handleTimerComplete = useCallback(() => {
    if (config.soundEnabled) {
      playCompletionSound();
    }

    if (notificationPermission.current === 'granted') {
      const title = state === 'running' ? 'Focus session complete!' : 'Break time is over!';
      const body = state === 'running'
        ? 'Time for a break. Great work!'
        : 'Ready to focus again?';
      new Notification(title, { body, icon: '/favicon.ico' });
    }

    setJustCompleted(true);

    if (state === 'running' && config.autoStartBreak) {
      setState('break');
      setTimeRemaining(config.breakDuration * 60);
    } else {
      setState('idle');
      setTimeRemaining(state === 'running' ? config.breakDuration * 60 : config.focusDuration * 60);
    }
  }, [state, config, playCompletionSound]);

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
  }, [state, handleTimerComplete]);

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

  // Clear completion flash after animation
  useEffect(() => {
    if (!justCompleted) return;
    const id = setTimeout(() => setJustCompleted(false), 600);
    return () => clearTimeout(id);
  }, [justCompleted]);

  return {
    state,
    timeRemaining,
    config,
    justCompleted,
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
