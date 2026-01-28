'use client';

import { Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';
import type { Stream } from './use-player';

interface StreamSelectorProps {
  streams: Stream[];
  currentStream: Stream;
  onStreamChange: (stream: Stream) => void;
}

export function StreamSelector({
  streams,
  currentStream,
  onStreamChange,
}: StreamSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Music className="h-4 w-4" />
          <span className="truncate max-w-[150px]">{currentStream.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {streams.map((stream) => (
          <DropdownMenuItem
            key={stream.id}
            onClick={() => onStreamChange(stream)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="truncate">{stream.name}</span>
            {stream.id === currentStream.id && (
              <Check className="h-4 w-4 ml-2 shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
