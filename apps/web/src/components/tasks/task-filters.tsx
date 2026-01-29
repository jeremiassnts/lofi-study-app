'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, Filter, Palette, Plus, Settings } from 'lucide-react';
import type { Group } from '@/types/task';

interface TaskFiltersProps {
  filter: string;
  groups: Group[];
  onFilterChange: (filter: string) => void;
  onAddTask: () => void;
  onManageGroups?: () => void;
}

export function TaskFilters({
  filter,
  groups,
  onFilterChange,
  onAddTask,
  onManageGroups,
}: TaskFiltersProps) {
  const getFilterLabel = () => {
    if (filter === 'all') return 'All Tasks';
    if (filter === 'active') return 'Active';
    if (filter === 'completed') return 'Completed';
    const group = groups.find((g) => g.id === filter);
    return group ? group.name : 'All Tasks';
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="sm" aria-label="Select theme" className="rounded-sm" />}>
            <Filter className="h-[1.2rem] w-[1.2rem]" />
            {getFilterLabel()}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onFilterChange('all')}>
              All Tasks
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange('active')}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange('completed')}>
              Completed
            </DropdownMenuItem>
            {groups.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>By Group</DropdownMenuLabel>
                {groups.map((group) => (
                  <DropdownMenuItem
                    key={group.id}
                    onClick={() => onFilterChange(group.id)}
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
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        {onManageGroups && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onManageGroups}
            className="rounded-sm"
          >
            <Settings className="mr-2 h-4 w-4" />
            Groups
          </Button>
        )}
        <Button size="sm" onClick={onAddTask} className="rounded-sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
    </div>
  );
}
