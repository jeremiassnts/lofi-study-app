'use client';

import { lazy, Suspense } from 'react';
import type { RefObject } from 'react';

// Lazy load React Player to reduce initial bundle size
const ReactPlayer = lazy(() => import('react-player'));

interface PlayerContainerProps {
  url: string;
  playing: boolean;
  volume: number;
  playerRef: RefObject<any>;
  onError: (error: any) => void;
  onReady: () => void;
}

export function PlayerContainer({
  url,
  playing,
  volume,
  playerRef,
  onError,
  onReady,
}: PlayerContainerProps) {
  return (
    <div className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full aspect-video bg-muted flex items-center justify-center rounded-lg">
            <p className="text-sm text-muted-foreground">Loading player...</p>
          </div>
        }
      >
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <ReactPlayer
            ref={playerRef}
            url={url}
            playing={playing}
            volume={volume / 100}
            width="100%"
            height="100%"
            controls={false}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 0,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
              },
            }}
            onError={onError}
            onReady={onReady}
          />
        </div>
      </Suspense>
    </div>
  );
}
