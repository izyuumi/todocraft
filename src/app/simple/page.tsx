'use client'

import { useState } from 'react'

export default function SimpleTodo() {
  const [tasks, setTasks] = useState<{ id: number; text: string; done: boolean }[]>([])
  const [input, setInput] = useState('')

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, done: false }])
      setInput('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8">Simple Todo Test</h1>
        
        <form onSubmit={addTask} className="mb-6 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Add a task..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        <div className="space-y-2">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 bg-gray-100 rounded-md"
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                className="h-5 w-5"
              />
              <span className={task.done ? 'line-through text-gray-500' : ''}>
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  )
}