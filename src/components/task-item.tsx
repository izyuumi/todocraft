"use client";

import { useState } from "react";
import { Trash2, GripVertical, Edit2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/lib/types";
import { useTasks } from "@/lib/tasks-context";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  isDragging?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function TaskItem({ task, isDragging, dragHandleProps }: TaskItemProps) {
  const { toggleTask, updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleEdit = () => {
    if (editValue.trim() && editValue !== task.title) {
      updateTask(task.id, { title: editValue.trim() });
    } else {
      setEditValue(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setEditValue(task.title);
      setIsEditing(false);
    }
  };

  return (
    <Card
      className={cn(
        "group p-3 flex items-center gap-3 transition-all hover:shadow-md",
        isDragging && "opacity-50 shadow-lg rotate-2",
        task.completed && "opacity-60"
      )}
    >
      <div
        {...dragHandleProps}
        className="cursor-move text-muted-foreground hover:text-foreground transition-colors touch-none"
      >
        <GripVertical className="h-5 w-5" />
      </div>

      <Checkbox
        checked={task.completed}
        onCheckedChange={() => toggleTask(task.id)}
        className="h-5 w-5"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            className="h-8"
          />
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "break-all",
                task.completed && "line-through text-muted-foreground"
              )}
              onDoubleClick={() => setIsEditing(true)}
            >
              {task.title}
            </span>
            {task.category && (
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                {task.category}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => setIsEditing(true)}
          disabled={isEditing}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => deleteTask(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
