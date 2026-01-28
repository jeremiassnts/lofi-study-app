/**
 * Task Management Type Definitions
 */

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  groupId: string | null;
  createdAt: string; // ISO date string
  order: number; // For sorting/reordering
}

export interface Group {
  id: string;
  name: string;
  color: string; // Hex color code
}

export type TaskFilter = 'all' | 'active' | 'completed' | string; // string is groupId
