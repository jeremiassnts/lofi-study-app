'use client';

import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PlayerControlsProps {
  playing: boolean;
  volume: number;
  onTogglePlayPause: () => void;
  onVolumeChange: (volume: number) => void;
}

export function PlayerControls({
  playing,
  volume,
  onTogglePlayPause,
  onVolumeChange,
}: PlayerControlsProps) {
  const isMuted = volume === 0;

  const handleMuteToggle = () => {
    if (isMuted) {
      onVolumeChange(50); // Restore to 50% if muted
    } else {
      onVolumeChange(0); // Mute
    }
  };

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Play/Pause Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onTogglePlayPause}
        aria-label={playing ? 'Pause' : 'Play'}
        className="shrink-0 rounded-sm"
      >
        {playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>

      {/* Volume Control */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMuteToggle}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="shrink-0 rounded-sm"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className={cn(
              'flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer',
              'accent-primary',
              '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer',
              '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer'
            )}
            aria-label="Volume"
          />
          <span className="text-xs text-muted-foreground w-10 text-right shrink-0 tabular-nums">
            {volume}%
          </span>
        </div>
      </div>
    </div>
  );
}
