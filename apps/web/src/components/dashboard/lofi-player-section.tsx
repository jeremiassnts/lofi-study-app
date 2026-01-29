'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlayer } from '@/components/lofi-player/use-player';
import { PlayerContainer } from '@/components/lofi-player/player-container';
import { PlayerControls } from '@/components/lofi-player/player-controls';
import { StreamSelector } from '@/components/lofi-player/stream-selector';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function LofiPlayerSection() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const player = usePlayer();
  const prevErrorRef = useRef<string | null>(null);

  useEffect(() => {
    if (player.error && player.error !== prevErrorRef.current) {
      prevErrorRef.current = player.error;
      toast.error(player.error, { description: 'Try another stream from the dropdown.' });
    } else if (!player.error) {
      prevErrorRef.current = null;
    }
  }, [player.error]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <CardTitle>Lofi Music Player</CardTitle>
          {player.error && (
            <span className="text-xs text-destructive">({player.error})</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <StreamSelector
            streams={player.streams}
            currentStream={player.currentStream}
            onStreamChange={player.setStream}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand player' : 'Collapse player'}
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent
        className={cn(
          'transition-all duration-300 overflow-hidden',
          isCollapsed && 'max-h-0 p-0'
        )}
      >
        <div className="space-y-4">
          <PlayerContainer
            url={player.currentStream.url}
            playing={player.playing}
            volume={player.volume}
            playerRef={player.playerRef}
            onError={player.handleError}
            onReady={player.handleReady}
            onVideoClick={player.togglePlayPause}
          />
          <PlayerControls
            playing={player.playing}
            volume={player.volume}
            onTogglePlayPause={player.togglePlayPause}
            onVolumeChange={player.setVolume}
          />
        </div>
      </CardContent>
    </Card>
  );
}
