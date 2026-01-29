'use client';

/**
 * Task and group CRUD hook with localStorage persistence.
 * @module use-tasks
 */

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { getItem, setItem } from '@/lib/storage';
import type { Task, Group } from '@/types/task';

const STORAGE_KEY_TASKS = 'tasks';
const STORAGE_KEY_GROUPS = 'groups';

/** Default group used when none exist in storage. */
const DEFAULT_GROUPS: Group[] = [
  { id: 'default', name: 'General', color: '#6366f1' },
];

/**
 * Tasks and groups management. Hydrates from localStorage after mount,
 * syncs tasks/groups on change, and surfaces storage failures via toasts.
 * Storage keys: lofi-study:tasks, lofi-study:groups.
 * @returns Tasks, groups, filter state, CRUD actions, and helpers (getFilteredTasks, getTasksByGroup, getGroupById).
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => []);
  const [groups, setGroups] = useState<Group[]>(() => DEFAULT_GROUPS);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load from storage after mount (same initial render on server and client to avoid hydration mismatch)
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- hydrate from localStorage after mount */
    const savedTasks = getItem<Task[]>(STORAGE_KEY_TASKS);
    const savedGroups = getItem<Group[]>(STORAGE_KEY_GROUPS);
    if (savedTasks) setTasks(savedTasks);
    if (savedGroups && savedGroups.length > 0) setGroups(savedGroups);
    if (!savedGroups || savedGroups.length === 0) {
      const ok = setItem(STORAGE_KEY_GROUPS, DEFAULT_GROUPS);
      if (!ok) toast.error('Could not save groups. Storage may be full or disabled.');
    }
    setIsLoading(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Sync tasks to storage whenever they change
  useEffect(() => {
    if (tasks.length > 0 || getItem<Task[]>(STORAGE_KEY_TASKS) !== null) {
      const ok = setItem(STORAGE_KEY_TASKS, tasks);
      if (!ok) toast.error('Could not save tasks. Storage may be full or disabled.');
    }
  }, [tasks]);

  // Sync groups to storage whenever they change
  useEffect(() => {
    const ok = setItem(STORAGE_KEY_GROUPS, groups);
    if (!ok) toast.error('Could not save groups. Storage may be full or disabled.');
  }, [groups]);

  // Generate unique ID
  const generateId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Add a new task
  const addTask = useCallback((title: string, groupId: string | null = null) => {
    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      completed: false,
      groupId,
      createdAt: new Date().toISOString(),
      order: tasks.length,
    };

    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, [tasks.length, generateId]);

  // Update a task
  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  // Delete a task
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // Toggle task completion
  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // Add a new group
  const addGroup = useCallback((name: string, color: string) => {
    const newGroup: Group = {
      id: generateId(),
      name: name.trim(),
      color,
    };

    setGroups((prev) => [...prev, newGroup]);
    return newGroup;
  }, [generateId]);

  // Update a group
  const updateGroup = useCallback((id: string, updates: Partial<Group>) => {
    setGroups((prev) =>
      prev.map((group) => (group.id === id ? { ...group, ...updates } : group))
    );
  }, []);

  // Delete a group
  const deleteGroup = useCallback((id: string) => {
    // Don't allow deleting default group
    if (id === 'default') return;

    // Remove group from tasks
    setTasks((prev) =>
      prev.map((task) =>
        task.groupId === id ? { ...task, groupId: null } : task
      )
    );

    // Remove the group
    setGroups((prev) => prev.filter((group) => group.id !== id));
  }, []);

  // Get filtered tasks
  const getFilteredTasks = useCallback(() => {
    let filtered = tasks;

    if (filter === 'active') {
      filtered = tasks.filter((task) => !task.completed);
    } else if (filter === 'completed') {
      filtered = tasks.filter((task) => task.completed);
    } else if (filter !== 'all') {
      // Filter by group
      filtered = tasks.filter((task) => task.groupId === filter);
    }

    // Sort by order, then by creation date
    return filtered.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [tasks, filter]);

  // Get tasks by group
  const getTasksByGroup = useCallback(() => {
    const grouped: Record<string, Task[]> = {};

    tasks.forEach((task) => {
      const groupKey = task.groupId || 'ungrouped';
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(task);
    });

    return grouped;
  }, [tasks]);

  // Get group by ID
  const getGroupById = useCallback(
    (id: string | null) => {
      if (!id) return null;
      return groups.find((group) => group.id === id) || null;
    },
    [groups]
  );

  return {
    tasks,
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
    getTasksByGroup,
    getGroupById,
  };
}
