'use client';

import { useMemo } from 'react';
import { TaskGroup } from './task-group';
import { TaskItem } from './task-item';
import type { Task, Group } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  groups: Group[];
  filter: string;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  showGroups?: boolean;
}

export function TaskList({
  tasks,
  groups,
  filter: _filter,
  onToggle,
  onUpdate,
  onDelete,
  showGroups = true,
}: TaskListProps) {
  // Get group map for quick lookup
  const groupMap = useMemo(() => {
    const map = new Map<string, Group>();
    groups.forEach((group) => map.set(group.id, group));
    return map;
  }, [groups]);

  // Group tasks by groupId
  const groupedTasks = useMemo(() => {
    const grouped: Record<string, Task[]> = {};
    const ungrouped: Task[] = [];

    tasks.forEach((task) => {
      if (task.groupId && showGroups) {
        if (!grouped[task.groupId]) {
          grouped[task.groupId] = [];
        }
        grouped[task.groupId].push(task);
      } else {
        ungrouped.push(task);
      }
    });

    return { grouped, ungrouped };
  }, [tasks, showGroups]);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  // If showing groups, render grouped
  if (showGroups) {
    return (
      <div className="space-y-4">
        {/* Render grouped tasks */}
        {Object.entries(groupedTasks.grouped).map(([groupId, groupTasks]) => {
          const group = groupMap.get(groupId);
          return (
            <TaskGroup
              key={groupId}
              group={group || null}
              tasks={groupTasks}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}

        {/* Render ungrouped tasks */}
        {groupedTasks.ungrouped.length > 0 && (
          <TaskGroup
            group={null}
            tasks={groupedTasks.ungrouped}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        )}
      </div>
    );
  }

  // Flat list (no grouping)
  return (
    <div className="space-y-2">
      {tasks.map((task) => {
        const group = task.groupId ? groupMap.get(task.groupId) : null;
        return (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
            groupColor={group?.color || null}
          />
        );
      })}
    </div>
  );
}
