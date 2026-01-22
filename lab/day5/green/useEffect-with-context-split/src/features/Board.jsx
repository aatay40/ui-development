import React from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import { Grid } from '@mui/material'
import { Column } from './Column.jsx'
import { useKanbanState, useKanbanDispatch } from '../state/KanbanContext.jsx'
import { moveTaskOnServer } from '../api/mockServer.js'

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
]

export function Board() {
  const state = useKanbanState()
  const dispatch = useKanbanDispatch()

  const onDragEnd = async (result) => {
    if (!result.destination) return

    const samePlace =
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index

    if (samePlace) return

    const id = result.draggableId
    const fromColumn = result.source.droppableId
    const fromIndex = result.source.index

    const toColumn = result.destination.droppableId
    const toIndex = result.destination.index

    dispatch({ type: 'MOVE_TASK', payload: { id, toColumn, toIndex } })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={2}>
        {columns.map((c) => {
          const ids = state.columns[c.id] || []
          const tasks = ids.map((id) => state.tasksById[id]).filter(Boolean)
          return (
            <Grid key={c.id} item xs={12} md={4}>
              <Column column={c} tasks={tasks} />
            </Grid>
          )
        })}
      </Grid>
    </DragDropContext>
  )
}