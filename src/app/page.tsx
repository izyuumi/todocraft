'use client'

import { useState, useEffect } from 'react'
import { Task } from '@/lib/types'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load tasks from localStorage
    const saved = localStorage.getItem('todocraft-tasks')
    if (saved) {
      try {
        setTasks(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load tasks:', e)
      }
    }
  }, [])

  useEffect(() => {
    // Save tasks to localStorage
    if (mounted) {
      localStorage.setItem('todocraft-tasks', JSON.stringify(tasks))
    }
  }, [tasks, mounted])

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: input,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        order: tasks.length
      }
      setTasks([...tasks, newTask])
      setInput('')
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const activeCount = tasks.filter(t => !t.completed).length
  const completedCount = tasks.filter(t => t.completed).length

  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">TodoCraft</h1>
            <div className="text-sm text-muted-foreground">
              {activeCount} active, {completedCount} completed
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Add Task Form */}
          <form onSubmit={addTask} className="flex gap-2 p-4 bg-card rounded-lg border">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-3 py-2 bg-background border rounded-md"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Add
            </button>
          </form>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-2">
            {(['all', 'active', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md capitalize ${
                  filter === f 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-2">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5"
                />
                <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-destructive hover:text-destructive/80"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              {filter === 'completed' 
                ? 'No completed tasks yet' 
                : filter === 'active'
                ? 'No active tasks. Well done!'
                : 'No tasks yet. Add one above!'}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}