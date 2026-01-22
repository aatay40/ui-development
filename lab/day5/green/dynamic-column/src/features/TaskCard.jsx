import React from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Card, CardContent, Typography, Chip, IconButton, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useKanban } from '../state/KanbanContext.jsx'

export function TaskCard({ task, index }) {
  const { dispatch } = useKanban()

  const body = (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ pb: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle1" sx={{ fontWeight: 700, flex: 1 }}>
            {task.title}
          </Typography>

          <IconButton size="small" onClick={() => dispatch({ type: 'DELETE_TASK', payload: { id: task.id } })}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>

        {task.description ? (
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
            {task.description}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
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