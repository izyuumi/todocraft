'use client'

import React, { createContext, useContext, useCallback, useMemo } from 'react'
import { Task, TaskFilter, TasksContextType } from './types'
import { useLocalStorage } from './hooks'

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todocraft-tasks', [])
  const [filter, setFilter] = useLocalStorage<TaskFilter>('todocraft-filter', 'all')

  const addTask = useCallback((title: string, category?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      category,
      order: tasks.length
    }
    setTasks(prev => [...prev, newTask])
  }, [tasks.length, setTasks])

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ))
  }, [setTasks])

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const filtered = prev.filter(task => task.id !== id)
      return filtered.map((task, index) => ({ ...task, order: index }))
    })
  }, [setTasks])

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ))
  }, [setTasks])

  const reorderTasks = useCallback((reorderedTasks: Task[]) => {
    setTasks(reorderedTasks.map((task, index) => ({ ...task, order: index })))
  }, [setTasks])

  const clearCompleted = useCallback(() => {
    setTasks(prev => {
      const active = prev.filter(task => !task.completed)
      return active.map((task, index) => ({ ...task, order: index }))
    })
  }, [setTasks])

  const value = useMemo(() => ({
    tasks,
    filter,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    reorderTasks,
    setFilter,
    clearCompleted
  }), [tasks, filter, addTask, updateTask, deleteTask, toggleTask, reorderTasks, setFilter, clearCompleted])

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider')
  }
  return context
}