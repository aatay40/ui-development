import React from 'react'
import type { Task } from '../domain/types'
import { useKanban } from '../state/KanbanContext'
  
type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: { task: Task }) {
  const { dispatch } = useKanban()

  return (
    <div className="rounded-lg border bg-white p-3 shadow-sm mb-2">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <div className="font-semibold">{task.title}</div>
          {
            task.description 
                ? <div className="text-xs text-slate-600 mt-1">{task.description}</div> 
                : null}
        </div>
          
        {/* TODO(Day2,GOLD): dispatch DELETE_TASK */}
        <button className="text-xs text-red-600 hover:underline">Delete</button>
      </div>
    </div>
  )
}