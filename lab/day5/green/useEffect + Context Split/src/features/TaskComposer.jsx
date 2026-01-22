import React from 'react'
import { useKanbanDispatch } from '../state/KanbanContext.jsx'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack } from '@mui/material'

const randomId = () => 't-' + Math.random().toString(16).slice(2)

export function TaskComposer() {
  const dispatch = useKanbanDispatch()

  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const submit = () => {
    // TODO(Day2): validate title required
    if (!title.trim()) {
      dispatch({ type: 'SET_ERROR', payload: { message: 'Title is required' } })
      return
    }

    dispatch({
      type: 'ADD_TASK',
      payload: {
        task: {
          id: randomId(),
          title: title.trim(),
          description: description.trim() ? description.trim() : undefined,
          columnId: 'todo',
          updatedAt: Date.now()
        }
      }
    })

    dispatch({ type: 'CLEAR_ERROR' })
    setTitle('')
    setDescription('')
    setOpen(false)
  }

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Task
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>New task</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Title (required)" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
            <TextField label="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={submit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}