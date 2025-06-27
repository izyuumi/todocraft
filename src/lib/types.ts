export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  category?: string
  order: number
}

export type TaskFilter = 'all' | 'active' | 'completed'

export interface TasksContextType {
  tasks: Task[]
  filter: TaskFilter
  addTask: (title: string, category?: string) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
  reorderTasks: (tasks: Task[]) => void
  setFilter: (filter: TaskFilter) => void
  clearCompleted: () => void
}