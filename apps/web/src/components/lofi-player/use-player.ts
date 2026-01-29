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
    id: 'chillhop',
    name: 'Chillhop Music',
    url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
  },
  {
    id: 'jazz-hop',
    name: 'The Jazz Hop Café',
    url: 'https://www.youtube.com/watch?v=9xkV2H5aRlk',
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

export function usePlayer() {
  const [state, setState] = useState<PlayerState>(() => {
    // Load persisted volume and stream from localStorage
    const savedVolume = getItem<number>(STORAGE_KEY_VOLUME) ?? DEFAULT_VOLUME;
    const savedStreamId = getItem<string>(STORAGE_KEY_STREAM);
    const savedStream =
      DEFAULT_STREAMS.find(s => s.id === savedStreamId) ?? DEFAULT_STREAMS[0];

    return {
      playing: false,
      volume: savedVolume,
      currentStream: savedStream,
      error: null,
    };
  });

  const playerRef = useRef<HTMLVideoElement | null>(null);

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
