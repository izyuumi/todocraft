'use client';

import React from 'react';
import { Header } from '@/components/header';
import { TaskEditor } from '@/components/task-editor';
import { TaskItem } from '@/components/task-item';
import { useTasks } from '@/components/task-provider';

export default function Home() {
  const { tasks } = useTasks();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Header />
        <TaskEditor />
        
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No tasks yet!</p>
              <p className="text-sm">Add your first task above to get started.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>
        
        {tasks.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Click on any task to edit it</p>
          </div>
        )}
      </div>
    </div>
  );
}