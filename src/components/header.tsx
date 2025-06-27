'use client';

import React from 'react';
import { useTheme } from './theme-provider';
import { useTasks } from './task-provider';
import { Button } from './ui/button';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { tasks } = useTasks();

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">TodoCraft</h1>
        <p className="text-muted-foreground">
          {totalCount === 0 
            ? "No tasks yet" 
            : `${completedCount} of ${totalCount} completed`
          }
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
      </div>
    </header>
  );
}