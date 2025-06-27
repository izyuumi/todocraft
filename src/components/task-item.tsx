'use client';

import React, { useState } from 'react';
import { Task } from '@/lib/types';
import { useTasks } from './task-provider';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { updateTask, deleteTask, toggleTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() && editText.trim() !== task.text) {
      updateTask(task.id, { text: editText.trim() });
    }
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-3 p-3 border rounded-lg bg-card",
      task.completed && "opacity-60"
    )}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <span
            className={cn(
              "flex-1 cursor-pointer",
              task.completed && "line-through text-muted-foreground"
            )}
            onClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteTask(task.id)}
              className="text-destructive hover:text-destructive"
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
}