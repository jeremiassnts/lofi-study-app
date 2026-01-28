'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, ChevronDown } from 'lucide-react';
import type { Group } from '@/types/task';

interface TaskFormProps {
  groups: Group[];
  onSubmit: (title: string, groupId: string | null) => void;
  onCancel?: () => void;
  initialGroupId?: string | null;
  defaultGroupId?: string | null;
}

export function TaskForm({
  groups,
  onSubmit,
  onCancel,
  initialGroupId = null,
  defaultGroupId = null,
}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(
    initialGroupId || defaultGroupId
  );
  const [error, setError] = useState('');

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title is required');
      return;
    }

    if (trimmedTitle.length > 200) {
      setError('Title is too long (max 200 characters)');
      return;
    }

    setError('');
    onSubmit(trimmedTitle, selectedGroupId);
    setTitle('');
    setSelectedGroupId(defaultGroupId);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="task-title">Task Title</Label>
        <Input
          id="task-title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          placeholder="Enter task title..."
          autoFocus
          aria-invalid={!!error}
          aria-describedby={error ? 'task-title-error' : undefined}
        />
        {error && (
          <p id="task-title-error" className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Group (Optional)</Label>
        <DropdownMenu>
          {
            // @ts-expect-error Base UI Trigger accepts asChild-style composition
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  {selectedGroup ? (
                    <>
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: selectedGroup.color }}
                      />
                      {selectedGroup.name}
                    </>
                  ) : (
                    'No group'
                  )}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          }
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => setSelectedGroupId(null)}>
              No group
            </DropdownMenuItem>
            {groups.map((group) => (
              <DropdownMenuItem
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  {group.name}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
    </form>
  );
}
