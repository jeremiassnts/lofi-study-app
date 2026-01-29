'use client';

import { lazy, Suspense } from 'react';
import type { RefObject } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load React Player to reduce initial bundle size
const ReactPlayer = lazy(() => import('react-player'));

interface PlayerContainerProps {
  url: string;
  playing: boolean;
  volume: number;
  playerRef: RefObject<HTMLVideoElement | null>;
  onError: (error: unknown) => void;
  onReady: () => void;
  /** Called when user clicks on the video area (for play/pause since we use controls={false}) */
  onVideoClick?: () => void;
}

function PlayerLoadingFallback() {
  return (
    <div className="w-full space-y-3">
      <Skeleton className="w-full aspect-video rounded-lg" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 shrink-0 rounded" />
        <Skeleton className="h-2 flex-1 max-w-[120px]" />
      </div>
    </div>
  );
}

export function PlayerContainer({
  url,
  playing,
  volume,
  playerRef,
  onError,
  onReady,
  onVideoClick,
}: PlayerContainerProps) {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<PlayerLoadingFallback />}>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <ReactPlayer
            ref={playerRef as RefObject<HTMLVideoElement>}
            src={url}
            playing={playing}
            volume={volume / 100}
            width="100%"
            height="100%"
            controls={false}
            config={{
              youtube: {
                // @ts-expect-error - react-player youtube type omits playerVars; used at runtime
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
          {onVideoClick && (
            <button
              type="button"
              className="absolute inset-0 z-10 w-full h-full cursor-pointer rounded-lg border-0 bg-transparent"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onVideoClick();
              }}
              aria-label={playing ? 'Pause' : 'Play'}
            />
          )}
        </div>
      </Suspense>
    </div>
  );
}
