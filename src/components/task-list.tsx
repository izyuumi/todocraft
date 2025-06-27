'use client'

import { useMemo, useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/lib/types'
import { useTasks } from '@/lib/tasks-context'
import { TaskItem } from './task-item'

interface SortableTaskItemProps {
  task: Task
}

function SortableTaskItem({ task }: SortableTaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <TaskItem 
        task={task} 
        isDragging={isDragging}
        dragHandleProps={listeners}
      />
    </div>
  )
}

export function TaskList() {
  const { tasks, filter, reorderTasks } = useTasks()
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const filteredTasks = useMemo(() => {
    const sorted = [...tasks].sort((a, b) => a.order - b.order)
    
    switch (filter) {
      case 'active':
        return sorted.filter(task => !task.completed)
      case 'completed':
        return sorted.filter(task => task.completed)
      default:
        return sorted
    }
  }, [tasks, filter])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const allTasks = [...tasks].sort((a, b) => a.order - b.order)
      const oldIndex = allTasks.findIndex((task) => task.id === active.id)
      const newIndex = allTasks.findIndex((task) => task.id === over?.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(allTasks, oldIndex, newIndex)
        reorderTasks(reordered)
      }
    }

    setActiveId(null)
  }

  const activeTask = useMemo(
    () => tasks.find((task) => task.id === activeId),
    [tasks, activeId]
  )

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {filter === 'completed' 
          ? 'No completed tasks yet' 
          : filter === 'active'
          ? 'No active tasks. Well done!'
          : 'No tasks yet. Add one above!'}
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTasks.map(task => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <SortableTaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeTask ? <TaskItem task={activeTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}