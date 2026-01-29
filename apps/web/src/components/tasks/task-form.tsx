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
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface TaskFormProps {
  groups: Group[];
  onSubmit: (title: string, groupId: string | null) => void;
  onCancel?: () => void;
  initialGroupId?: string | null;
  defaultGroupId?: string | null;
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).max(200, { message: 'Title is too long (max 200 characters)' }),
  groupId: z.string().nullable(),
});
type FormValues = z.infer<typeof formSchema>;

export function TaskForm({
  groups,
  onSubmit,
  onCancel,
  initialGroupId = null,
  defaultGroupId = null,
}: TaskFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      groupId: initialGroupId ? initialGroupId : defaultGroupId ? defaultGroupId : null,
    },
  });
  const handleSubmit = (data: FormValues) => {
    onSubmit(data.title, data.groupId);
  };

  const title = form.watch('title');
  const groupId = form.watch('groupId');
  const selectedGroup = groups.find((g) => g.id === groupId);

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="task-title">Task Title</Label>
        <Input
          id="task-title"
          value={title}
          placeholder="Enter task title..."
          autoFocus
          aria-invalid={!!form.formState.errors.title}
          aria-describedby={form.formState.errors.title ? 'task-title-error' : undefined}
          className='rounded-sm'
          {...form.register('title')}
        />
        {form.formState.errors.title && (
          <p id="task-title-error" className="text-sm text-destructive" role="alert">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Group (Optional)</Label>
        <DropdownMenu>
          {
            <DropdownMenuTrigger render={<Button
              type="button"
              variant="outline"
              className="w-full justify-between rounded-sm"
            />}>
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
            </DropdownMenuTrigger>
          }
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => form.setValue('groupId', null)}>
              No group
            </DropdownMenuItem>
            {groups.map((group) => (
              <DropdownMenuItem
                key={group.id}
                onClick={() => form.setValue('groupId', group.id)}
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
          <Button type="button" variant="outline" onClick={onCancel} className='rounded-sm'>
            Cancel
          </Button>
        )}
        <Button type="submit" className='rounded-sm'>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
    </form >
  );
}
