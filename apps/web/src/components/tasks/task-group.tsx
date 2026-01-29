'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Task, Group } from '@/types/task';
import { TaskItem } from './task-item';

interface TaskGroupProps {
  group: Group | null; // null means ungrouped
  tasks: Task[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  defaultExpanded?: boolean;
}

export function TaskGroup({
  group,
  tasks,
  onToggle,
  onUpdate,
  onDelete,
  defaultExpanded = true,
}: TaskGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (tasks.length === 0) return null;

  const groupName = group?.name || 'Ungrouped';
  const groupColor = group?.color || null;

  return (
    <div className="mb-4">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-start p-2 h-auto font-medium"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 mr-2" />
        ) : (
          <ChevronRight className="h-4 w-4 mr-2" />
        )}
        <span
          className="flex-1 text-left"
          style={{ color: groupColor || undefined }}
        >
          {groupName}
        </span>
        <span className="text-xs text-muted-foreground ml-2">
          ({tasks.length})
        </span>
      </Button>

      {isExpanded && (
        <div className="ml-6 space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
              groupColor={groupColor}
            />
          ))}
        </div>
      )}
    </div>
  );
}
