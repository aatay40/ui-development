import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Task, ColumnId } from '../domain/types'
import { TaskCard } from './TaskCard'

export function Column({ 
  column, 
  tasks, 
  taskIds, 
  droppableId 
} : { 
  column: {id: ColumnId; title: string}
  tasks: Task[]
  taskIds: string[]
  droppableId: string
 }) {
  const { setNodeRef, isOver } = useDroppable({ id: droppableId })

  return (
    <div ref={setNodeRef}>
      <div className={['rounded-xl border bg-white p-3', isOver ? 'ring-2 ring-emerald-400' : ''].join(' ')}>
        <div className="font-bold mb-2">{column.title}</div>
        {
          // TODO(Day3,GOLD): wrap with SortableContext with verticalListSortingStrategy
          tasks.map((t) => (
              <TaskCard key={t.id} 
                        task={t} />
        ))}
      </div>
    </div>
  )
}