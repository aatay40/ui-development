import React from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { useKanban } from '../state/KanbanContext.jsx'

export function TaskCard({ task, index, isPending }) {
  const { dispatch } = useKanban()

  const body = (
    <div className="rounded-lg border bg-white p-3 shadow-sm mb-2">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <div className="font-semibold flex items-center gap-2">
            <span>{task.title}</span>
            {/* TODO(Day4): show "Syncing..." badge while isPending */}
            {isPending ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Syncing…</span> : null}
          </div>

          {task.description ? <div className="text-xs text-slate-600 mt-1">{task.description}</div> : null}
        </div>

        <button
          className="text-xs text-red-600 hover:underline"
          onClick={() => dispatch({ type: 'DELETE_TASK', payload: { id: task.id } })}
        >
          Delete
        </button>
      </div>
    </div>
  )

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {body}
        </div>
      )}
    </Draggable>
  )
}