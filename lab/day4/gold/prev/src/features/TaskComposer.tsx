import React from 'react'
import { useKanban } from '../state/KanbanContext'
import type { Task } from '../domain/types'

const randomId = () => 't-' + Math.random().toString(16).slice(2)

export function TaskComposer() {
  const { dispatch } = useKanban()

  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const submit = () => {
    // TODO(Day2,GOLD): validate title, dispatch typed action
    if (!title.trim()) {
      dispatch({ type: 'SET_ERROR', payload: { message: 'Title is required' } })
      return
    }

    const task: Task = {
      id: randomId(),
      title: title.trim(),
      description: description.trim() ? description.trim() : undefined,
      columnId: 'todo',
      updatedAt: Date.now()
    }

    dispatch({ type: 'ADD_TASK', payload: { task } })
    dispatch({ type: 'CLEAR_ERROR' })

    setTitle('')
    setDescription('')
    setOpen(false)    
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className="px-3 py-2 rounded-lg bg-teal-700 text-white text-sm hover:bg-teal-800"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Close' : 'New Task'}
      </button>

      {open ? (
        <div className="flex flex-col md:flex-row md:items-center gap-2 w-full">
          <input
            className="border rounded-lg px-2 py-2 text-sm w-full md:w-64"
            placeholder="Title (required)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border rounded-lg px-2 py-2 text-sm w-full md:w-80"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm" onClick={submit}>
            Add
          </button>
        </div>
      ) : null}
    </div>
  )
}