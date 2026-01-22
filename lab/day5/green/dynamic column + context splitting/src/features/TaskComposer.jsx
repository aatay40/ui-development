import React from 'react'
import { useKanbanState, useKanbanDispatch } from '../state/KanbanContext.jsx'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

const randomId = () => 't-' + Math.random().toString(16).slice(2)

export function TaskComposer() {
  const state = useKanbanState()
  const dispatch = useKanbanDispatch()

  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const defaultColumnId = state.columnOrder[0] || 'todo'
  const [columnId, setColumnId] = React.useState(defaultColumnId)

  // if columns change (dynamic), keep selection valid
  React.useEffect(() => {
    const stillValid = state.columnMeta[columnId]
    if (!stillValid) setColumnId(state.columnOrder[0] || 'todo')
  }, [state.columnOrder, state.columnMeta]) // eslint-disable-line react-hooks/exhaustive-deps

  const submit = () => {
    if (!title.trim()) {
      dispatch({ type: 'SET_ERROR', payload: { message: 'Title is required' } })
      return
    }

    const col = state.columnMeta[columnId] ? columnId : (state.columnOrder[0] || 'todo')

    dispatch({
      type: 'ADD_TASK',
      payload: {
        task: {
          id: randomId(),
          title: title.trim(),
          description: description.trim() ? description.trim() : undefined,
          columnId: col,
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

            <FormControl fullWidth>
              <InputLabel>Column</InputLabel>
              <Select label="Column" value={columnId} onChange={(e) => setColumnId(e.target.value)}>
                {state.columnOrder.map((id) => (
                  <MenuItem key={id} value={id}>
                    {state.columnMeta[id]?.title || id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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