import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import { TaskCard } from './TaskCard.jsx'

export function Column({ column, tasks }) {
  return (
    // TODO(Day3): wrap the list with <Droppable droppableId={column.id}>
    // and render provided.placeholder.
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className="rounded-xl border bg-white p-3">
            <div className="font-bold mb-2">{column.title}</div>
            {
              tasks.map((t, idx) => (
                  <TaskCard key={t.id} 
                            task={t} 
                            index={idx} />
              ))
            }

            {provided.placeholder}
          </div>
        </div>
      )}  
    </Droppable>
  )
}