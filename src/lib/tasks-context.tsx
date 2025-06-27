'use client'

import React, { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react'
import { Task, TaskFilter, TasksContextType } from './types'

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<TaskFilter>('all')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedTasks = localStorage.getItem('todocraft-tasks')
    const loadedFilter = localStorage.getItem('todocraft-filter')
    
    if (loadedTasks) {
      try {
        const parsed = JSON.parse(loadedTasks)
        // Convert date strings back to Date objects
        const tasksWithDates = parsed.map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt)
        }))
        setTasks(tasksWithDates)
      } catch (e) {
        console.error('Failed to load tasks:', e)
      }
    }
    
    if (loadedFilter) {
      setFilter(loadedFilter as TaskFilter)
    }
    
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todocraft-tasks', JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  // Save filter preference
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todocraft-filter', filter)
    }
  }, [filter, isLoaded])

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
  }, [tasks.length])

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ))
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const filtered = prev.filter(task => task.id !== id)
      return filtered.map((task, index) => ({ ...task, order: index }))
    })
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ))
  }, [])

  const reorderTasks = useCallback((reorderedTasks: Task[]) => {
    setTasks(reorderedTasks.map((task, index) => ({ ...task, order: index })))
  }, [])

  const clearCompleted = useCallback(() => {
    setTasks(prev => {
      const active = prev.filter(task => !task.completed)
      return active.map((task, index) => ({ ...task, order: index }))
    })
  }, [])

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
  }), [tasks, filter, addTask, updateTask, deleteTask, toggleTask, reorderTasks, clearCompleted])

  if (!isLoaded) {
    return null // Don't render until localStorage is loaded
  }

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