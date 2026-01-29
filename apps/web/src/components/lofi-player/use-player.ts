'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getItem, setItem } from '@/lib/storage';

export interface Stream {
  id: string;
  name: string;
  url: string;
}

export const DEFAULT_STREAMS: Stream[] = [
  {
    id: 'lofi-girl',
    name: 'Lofi Girl',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
  },
  {
    id: 'lofi-hip-hop-radio',
    name: 'Lofi Hip Hop Radio',
    url: 'https://www.youtube.com/watch?v=28KRPhVzCus',
  },
  {
    id: 'jazz-lofi-radio',
    name: 'Jazz Lofi Radio',
    url: 'https://www.youtube.com/watch?v=HuFYqnbVbzY',
  },
  {
    id: 'college-music',
    name: 'College Music',
    url: 'https://www.youtube.com/watch?v=7NOSDKb0HlU',
  },
];

interface PlayerState {
  playing: boolean;
  volume: number;
  currentStream: Stream;
  error: string | null;
}

const DEFAULT_VOLUME = 50;
const STORAGE_KEY_VOLUME = 'player-volume';
const STORAGE_KEY_STREAM = 'player-stream';

const INITIAL_STATE: PlayerState = {
  playing: false,
  volume: DEFAULT_VOLUME,
  currentStream: DEFAULT_STREAMS[0],
  error: null,
};

export function usePlayer() {
  const [state, setState] = useState<PlayerState>(INITIAL_STATE);

  const playerRef = useRef<HTMLVideoElement | null>(null);

  // Hydrate from localStorage after mount (same initial render on server and client to avoid hydration mismatch)
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- hydrate from localStorage after mount */
    const savedVolume = getItem<number>(STORAGE_KEY_VOLUME) ?? DEFAULT_VOLUME;
    const savedStreamId = getItem<string>(STORAGE_KEY_STREAM);
    const savedStream =
      DEFAULT_STREAMS.find(s => s.id === savedStreamId) ?? DEFAULT_STREAMS[0];
    setState(prev => ({
      ...prev,
      volume: savedVolume,
      currentStream: savedStream,
    }));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Persist volume changes
  useEffect(() => {
    setItem(STORAGE_KEY_VOLUME, state.volume);
  }, [state.volume]);

  // Persist stream changes
  useEffect(() => {
    setItem(STORAGE_KEY_STREAM, state.currentStream.id);
  }, [state.currentStream.id]);

  const play = useCallback(() => {
    setState(prev => ({ ...prev, playing: true, error: null }));
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, playing: false }));
  }, []);

  const togglePlayPause = useCallback(() => {
    setState(prev => ({ ...prev, playing: !prev.playing, error: null }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(100, volume));
    setState(prev => ({ ...prev, volume: clampedVolume }));
  }, []);

  const setStream = useCallback((stream: Stream) => {
    setState(prev => ({
      ...prev,
      currentStream: stream,
      error: null,
    }));
  }, []);

  const handleError = useCallback((error: unknown) => {
    console.error('Player error:', error);
    setState(prev => ({
      ...prev,
      playing: false,
      error: 'Stream unavailable. Please try another stream.',
    }));
  }, []);

  const handleReady = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    playing: state.playing,
    volume: state.volume,
    currentStream: state.currentStream,
    error: state.error,
    streams: DEFAULT_STREAMS,
    playerRef,
    play,
    pause,
    togglePlayPause,
    setVolume,
    setStream,
    handleError,
    handleReady,
  };
}
