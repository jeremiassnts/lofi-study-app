'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import type { Group } from '@/types/task';

const PRESET_COLORS = [
  '#6366f1', // indigo
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
  '#ef4444', // red
  '#14b8a6', // teal
];

interface GroupManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: Group[];
  onAddGroup: (name: string, color: string) => void;
  onUpdateGroup: (id: string, updates: Partial<Group>) => void;
  onDeleteGroup: (id: string) => void;
}

export function GroupManager({
  open,
  onOpenChange,
  groups,
  onAddGroup,
  onUpdateGroup,
  onDeleteGroup,
}: GroupManagerProps) {
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      onAddGroup(newGroupName.trim(), selectedColor);
      setNewGroupName('');
      setSelectedColor(PRESET_COLORS[0]);
    }
  };

  const editableGroups = groups.filter((g) => g.id !== 'default');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Groups</DialogTitle>
          <DialogDescription>
            Organize your tasks into groups with custom colors.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add New Group */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Group Name</Label>
              <Input
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddGroup();
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex gap-2 flex-wrap">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-foreground scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            <Button onClick={handleAddGroup} className="w-full">
              Add Group
            </Button>
          </div>

          {/* Existing Groups */}
          {editableGroups.length > 0 && (
            <div className="space-y-2">
              <Label>Existing Groups</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {editableGroups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: group.color }}
                      />
                      <span className="text-sm">{group.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete "${group.name}"? Tasks in this group will be ungrouped.`
                          )
                        ) {
                          onDeleteGroup(group.id);
                        }
                      }}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
