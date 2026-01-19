import React from 'react'
import { Draggable } from '@hello-pangea/dnd'
import type { Task } from '../domain/types'
import { useKanban } from '../state/KanbanContext'
  
export function TaskCard({ task, index }: { task: Task; index: number }) {
  const { dispatch } = useKanban()

  const body = (
    <div className="rounded-lg border bg-white p-3 shadow-sm mb-2">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <div className="font-semibold">{task.title}</div>
          {
            task.description 
                ? <div className="text-xs text-slate-600 mt-1">{task.description}</div> 
                : null}
        </div>
                  
        <button 
          className="text-xs text-red-600 hover:underline"
          onClick={() => 
            dispatch({ type: 'DELETE_TASK', payload: { id: task.id } })}
        >
          Delete        
        </button>
      </div>
    </div>
  )
  
  // TODO(Day3,GOLD): wrap with Draggable and attach refs/props
  return body;
}