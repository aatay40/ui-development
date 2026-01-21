import React from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import { Column } from './Column.jsx'
import { useKanban } from '../state/KanbanContext.jsx'
import { moveTaskOnServer } from '../api/mockServer.js'

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
]

// TODO(Day4): Introduce Optimistic UI using React 19 useOptimistic.
// We’ll keep canonical state in Context, but show “pending sync” per task and rollback on failure.

export function Board() {
  const { state, dispatch } = useKanban()

  const onDragEnd = async (result) => {
    if (!result.destination) 
      return

    const samePlace =
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index

    if (samePlace) 
      return

    const id = result.draggableId
    const toColumn = result.destination.droppableId
    const toIndex = result.destination.index

    // TODO(Day4): capture "before" to enable rollback on failure:
    // const fromColumn = result.source.droppableId; const fromIndex = result.source.index;

    // TODO(Day4): optimistic UI:
    // - mark pending
    // - dispatch MOVE_TASK immediately
    // - call server
    // - if fail: rollback MOVE_TASK back to fromColumn/fromIndex and set error
    // - finally: unmark pending
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((c) => {
          const ids = state.columns[c.id] || []
          const tasks = ids.map((id) => state.tasksById[id]).filter(Boolean)
          return <Column key={c.id} column={c} tasks={tasks} />
        })}
      </div>
    </DragDropContext>
  )
}