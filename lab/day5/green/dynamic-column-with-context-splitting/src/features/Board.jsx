import React from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import { Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { Column } from './Column.jsx'
import { useKanbanDispatch, useKanbanState } from '../state/KanbanContext.jsx'

const randomColId = () => 'c-' + Math.random().toString(16).slice(2, 8)

export function Board() {
  const state = useKanbanState()
  const dispatch = useKanbanDispatch()

  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')

  const onDragEnd = (result) => {
    if (!result.destination) return

    const samePlace =
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index

    if (samePlace) return

    const id = result.draggableId
    const toColumn = result.destination.droppableId
    const toIndex = result.destination.index

    dispatch({ type: 'MOVE_TASK', payload: { id, toColumn, toIndex } })
  }

  const mdWidth = (() => {
    const n = state.columnOrder.length
    if (n <= 1) return 12
    if (n === 2) return 6
    return 4 // 3 per row on md+
  })()

  const addColumn = () => {
    const t = title.trim()
    if (!t) return

    dispatch({
      type: 'ADD_COLUMN',
      payload: { id: randomColId(), title: t }
    })

    setTitle('')
    setOpen(false)
  }

  return (
    <>
<Stack
  direction="row"
  alignItems="center"
  justifyContent="flex-start"
  spacing={2}
  sx={{ mb: 2 }}
>
  <Button variant="outlined" onClick={() => setOpen(true)}>
    Add column
  </Button>
</Stack>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            overflowY: 'hidden',
            pb: 1,
            pr: 2, // room so sticky tile doesn't overlap last column too much
            position: 'relative',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {state.columnOrder.map((colId, index) => {
            const meta = state.columnMeta[colId]
            if (!meta) return null

            const ids = state.columns[colId] || []
            const tasks = ids.map((id) => state.tasksById[id]).filter(Boolean)

            return (
              <Box
                key={colId}
                sx={{
                  flex: { xs: '0 0 280px', md: '0 0 340px' },
                  maxWidth: { xs: 280, md: 340 }
                }}
              >
                <Column
                  column={meta}
                  tasks={tasks}
                  index={index}
                  totalColumns={state.columnOrder.length}
                  onMoveLeft={() => dispatch({ type: 'MOVE_COLUMN', payload: { fromIndex: index, toIndex: index - 1 } })}
                  onMoveRight={() => dispatch({ type: 'MOVE_COLUMN', payload: { fromIndex: index, toIndex: index + 1 } })}
                  onRename={(title) => dispatch({ type: 'RENAME_COLUMN', payload: { id: colId, title } })}
                  onDelete={() => dispatch({ type: 'DELETE_COLUMN', payload: { id: colId } })}
                  canDelete={state.columnOrder.length > 1}
                />
              </Box>
            )
          })}
        </Box>
      </DragDropContext>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>New column</DialogTitle>
        <DialogContent>
          <TextField
            label="Column title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            fullWidth
            sx={{ mt: 1 }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addColumn()
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={addColumn}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}