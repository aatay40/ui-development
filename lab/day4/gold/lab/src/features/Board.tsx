import React from 'react'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core'
import { useKanban } from '../state/KanbanContext'
import type { ColumnId, Task } from '../domain/types'
import { Column } from './Column'
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
  if (!overId) return null

  if (isColumnDroppableId(overId)) {
    const toColumn = parseColumnId(overId)
    const destIds = (state.columns[toColumn] as string[]).filter((id) => id !== activeId)
    return { toColumn, toIndex: destIds.length }
  }

  const toColumn = findColumnByTaskId(state, overId)
  if (!toColumn) return null

  const destIds = (state.columns[toColumn] as string[]).filter((id) => id !== activeId)
  const toIndex = Math.max(0, destIds.indexOf(overId))
  return { toColumn, toIndex }
}

export function Board() {
  const { state, dispatch } = useKanban()

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const [activeId, setActiveId] = React.useState<string | null>(null)

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }

  const onDragEnd = (event: DragEndEvent) => {
    const active = event.active?.id ? String(event.active.id) : null
    const over = event.over?.id ? String(event.over.id) : null

    setActiveId(null)
    if (!active || !over) return

    const fromColumn = findColumnByTaskId(state, active)
    if (!fromColumn) return

    const dest = getDestination(state, active, over)
    if (!dest) return

    const fromIndex = (state.columns[fromColumn] as string[]).indexOf(active)

    if (dest.toColumn === fromColumn && fromIndex === dest.toIndex) return

    dispatch({ type: 'MOVE_TASK', payload: { id: active, toColumn: dest.toColumn, toIndex: dest.toIndex } })
  }

  const activeTask: Task | null = activeId ? state.tasksById[activeId] ?? null : null

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((c) => {
          const ids = (state.columns[c.id] || []) as string[]
          const tasks = ids.map((id) => state.tasksById[id]).filter(Boolean)

          return (
            <Column
              key={c.id}
              column={c}
              tasks={tasks}
              taskIds={ids}
              droppableId={columnDroppableId(c.id)}
            />
          )
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