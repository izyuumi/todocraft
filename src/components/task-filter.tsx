'use client'

import { Button } from '@/components/ui/button'
import { TaskFilter as FilterType } from '@/lib/types'
import { useTasks } from '@/lib/tasks-context'
import { cn } from '@/lib/utils'

export function TaskFilter() {
  const { filter, setFilter } = useTasks()

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ]

  return (
    <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
      {filters.map((item) => (
        <Button
          key={item.value}
          variant={filter === item.value ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setFilter(item.value)}
          className={cn(
            'transition-all',
            filter === item.value && 'shadow-sm'
          )}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}