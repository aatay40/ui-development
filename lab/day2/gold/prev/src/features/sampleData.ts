import type { Column, Task } from '../domain/types'

export const columns: Column[] = [
  { 
    id: 'todo', 
    title: 'To Do' 
  },
  { 
    id: 'in-progress', 
    title: 'In Progress' 
  },
  { 
    id: 'done', 
    title: 'Done' 
  }
]

export const tasks: Task[] = [
  { 
    id: 't-1', 
    title: 'Welcome', 
    description: 'Edit or move me later', 
    columnId: 'todo' 
  },
  { 
    id: 't-2', 
    title: 'Learn React', 
    description: 'Props, state, effects', 
    columnId: 'in-progress' 
  },
  { 
    id: 't-3', 
    title: 'Ship', 
    description: 'Deploy on Day 5', 
    columnId: 'done' 
  }
]