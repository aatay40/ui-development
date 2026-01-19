import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import type { Task, ColumnId } from '../domain/types'
import { TaskCard } from './TaskCard'

export function Column({ column, tasks } : { column: {id: ColumnId; title: string}; tasks: Task[] }) {
  // TODO(Day3,GOLD): wrap with Droppable + placeholder
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className="rounded-xl border bg-white p-3">
            <div className="font-bold mb-2">{column.title}</div>
            {tasks.map((t, idx) => (
                  <TaskCard key={t.id} 
                            task={t}
                            index={idx} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>    
  )
}