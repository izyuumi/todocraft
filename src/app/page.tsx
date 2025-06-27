'use client'

import { Header } from '@/components/header'
import { TaskEditor } from '@/components/task-editor'
import { TaskFilter } from '@/components/task-filter'
import { TaskList } from '@/components/task-list'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <TaskEditor />
          <div className="flex justify-center">
            <TaskFilter />
          </div>
          <TaskList />
        </div>
      </main>
    </div>
  )
}