'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useTasks } from '@/lib/tasks-context'

export function TaskEditor() {
  const { addTask } = useTasks()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      addTask(title.trim(), category.trim() || undefined)
      setTitle('')
      setCategory('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as React.FormEvent)
    }
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Input
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-32"
        />
        <Button type="submit" size="icon" disabled={!title.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  )
}