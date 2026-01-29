'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useTasks } from '@/components/tasks/use-tasks';
import { TaskList } from '@/components/tasks/task-list';
import { TaskForm } from '@/components/tasks/task-form';
import { TaskFilters } from '@/components/tasks/task-filters';
import { GroupManager } from '@/components/tasks/group-manager';

export function TasksSection() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showGroupManager, setShowGroupManager] = useState(false);

  const {
    groups,
    filter,
    setFilter,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addGroup,
    updateGroup,
    deleteGroup,
    getFilteredTasks,
  } = useTasks();

  const filteredTasks = getFilteredTasks();

  const handleAddTask = (title: string, groupId: string | null) => {
    addTask(title, groupId);
    setShowAddForm(false);
  };

  return (
    <>
      <Card className="h-full flex flex-col rounded-sm">
        <CardHeader>
          <CardTitle>Task Manager</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <TaskFilters
            filter={filter}
            groups={groups}
            onFilterChange={setFilter}
            onAddTask={() => setShowAddForm(true)}
            onManageGroups={() => setShowGroupManager(true)}
          />

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="space-y-3 p-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                    <Skeleton className="h-4 w-4 shrink-0 rounded" />
                    <Skeleton className="h-4 flex-1 max-w-[80%]" />
                  </div>
                ))}
              </div>
            ) : (
              <TaskList
                tasks={filteredTasks}
                groups={groups}
                filter={filter}
                onToggle={toggleTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
                showGroups={true}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Task Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            groups={groups}
            onSubmit={handleAddTask}
            onCancel={() => setShowAddForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Group Manager Dialog */}
      <GroupManager
        open={showGroupManager}
        onOpenChange={setShowGroupManager}
        groups={groups}
        onAddGroup={addGroup}
        onUpdateGroup={updateGroup}
        onDeleteGroup={deleteGroup}
      />
    </>
  );
}
