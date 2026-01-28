'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { PomodoroConfig } from '@/types/pomodoro';

interface TimerSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: PomodoroConfig;
  onSave: (config: Partial<PomodoroConfig>) => void;
}

export function TimerSettings({
  open,
  onOpenChange,
  config,
  onSave,
}: TimerSettingsProps) {
  const [focusDuration, setFocusDuration] = useState(config.focusDuration);
  const [breakDuration, setBreakDuration] = useState(config.breakDuration);
  const [soundEnabled, setSoundEnabled] = useState(config.soundEnabled);
  const [autoStartBreak, setAutoStartBreak] = useState(config.autoStartBreak);

  const handleSave = () => {
    onSave({
      focusDuration,
      breakDuration,
      soundEnabled,
      autoStartBreak,
    });
    onOpenChange(false);
  };

  const handleReset = () => {
    setFocusDuration(25);
    setBreakDuration(5);
    setSoundEnabled(true);
    setAutoStartBreak(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
          <DialogDescription>
            Customize your Pomodoro timer to match your productivity style.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Focus Duration */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="focus-duration" className="text-right">
              Focus
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="focus-duration"
                type="number"
                min="1"
                max="60"
                value={focusDuration}
                onChange={(e) => setFocusDuration(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          </div>

          {/* Break Duration */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="break-duration" className="text-right">
              Break
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="break-duration"
                type="number"
                min="1"
                max="30"
                value={breakDuration}
                onChange={(e) => setBreakDuration(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          </div>

          {/* Sound Enabled */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sound-enabled"
              checked={soundEnabled}
              onCheckedChange={(checked) => setSoundEnabled(checked as boolean)}
            />
            <Label
              htmlFor="sound-enabled"
              className="text-sm font-normal cursor-pointer"
            >
              Play sound when timer completes
            </Label>
          </div>

          {/* Auto Start Break */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="auto-start-break"
              checked={autoStartBreak}
              onCheckedChange={(checked) => setAutoStartBreak(checked as boolean)}
            />
            <Label
              htmlFor="auto-start-break"
              className="text-sm font-normal cursor-pointer"
            >
              Automatically start break after focus session
            </Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
          >
            Reset to Default
          </Button>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
