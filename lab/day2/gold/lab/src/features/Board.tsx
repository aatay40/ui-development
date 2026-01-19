import React from 'react'
import type { ColumnId } from '../domain/types'
import { Column } from './Column'
import { useKanban } from '../state/KanbanContext'

const columns: { id: ColumnId; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
]

export function Board() {
  const { state } = useKanban()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map((c) => (
        <Column
          key={c.id}
          column={c}
          // TODO(Day2,GOLD): map state.columns to tasks
          tasks={[]}
        />
      ))}
    </div>
  )
}