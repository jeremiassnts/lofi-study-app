'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTasks } from '@/components/tasks/use-tasks';
import { TaskList } from '@/components/tasks/task-list';
import { TaskForm } from '@/components/tasks/task-form';
import { TaskFilters } from '@/components/tasks/task-filters';
import { GroupManager } from '@/components/tasks/group-manager';

export function TasksSection() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showGroupManager, setShowGroupManager] = useState(false);

  const {
    tasks,
    groups,
    filter,
    setFilter,
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
      <Card className="h-full flex flex-col">
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
            <TaskList
              tasks={filteredTasks}
              groups={groups}
              filter={filter}
              onToggle={toggleTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
              showGroups={true}
            />
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
