import React from 'react'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core'
import type { ColumnId, Task } from '../domain/types'
import { Column } from './Column'
import { useKanban } from '../state/KanbanContext'
import { TaskCard } from './TaskCard'

const columns: { id: ColumnId; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
]

const columnDroppableId = (columnId: ColumnId) => `column:${columnId}`
const isColumnDroppableId = (id: string) => id.startsWith('column:')
const parseColumnId = (droppableId: string) => droppableId.split(':')[1] as ColumnId

function findColumnByTaskId(state: any, taskId: string): ColumnId | null {
  for (const [colId, ids] of Object.entries(state.columns as Record<string, string[]>)) {
    if (ids.includes(taskId)) return colId as ColumnId
  }
  return null
}

function getDestination(state: any, activeId: string, overId: string): { toColumn: ColumnId; toIndex: number } | null {
  // TODO(Day3,GOLD): ignore drop outside and same-position drops
  // use isColumnDroppableId, findColumnByTaskId, overId
  return null
}

export function Board() {
  const { state, dispatch } = useKanban()

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const [activeId, setActiveId] = React.useState<string | null>(null)

  const onDragStart = (event: DragStartEvent) => {
    // TODO(Day3,GOLD): assign activeId
  }

  const onDragEnd = (result: DragEndEvent) => {
    // TODO(Day3,GOLD): dispatch MOVE_TASK with typed payload
  }

  const activeTask: Task | null = activeId ? state.tasksById[activeId] ?? null : null

  return (
    // TODO(Day2,GOLD): map state.columns to tasks
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
                  tasks={tasks}
                  taskIds={ids}
                  droppableId={columnDroppableId(c.id)} />
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="w-[280px]">
            <TaskCard task={activeTask} overlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}