import React from 'react'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import type { ColumnId, Task } from '../domain/types'
import { Column } from './Column'
import { useKanban } from '../state/KanbanContext'

const columns: { id: ColumnId; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
]

export function Board() {
  const { state, dispatch } = useKanban()

  const onDragEnd = (result: DropResult) => {
    // TODO(Day3,GOLD): ignore drop outside and same-position drops
    // TODO(Day3,GOLD): dispatch MOVE_TASK with typed payload
  }

  return (
    // TODO(Day2,GOLD): map state.columns to tasks
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((c) => {
          const ids = state.columns[c.id] || []
          const tasks: Task[] = 
            ids.map((id) => 
              state.tasksById[id])
                .filter(Boolean)

          return <Column 
                  key={c.id} 
                  column={c} 
                  tasks={tasks} />
        })}
      </div>
    </DragDropContext>
  )
}