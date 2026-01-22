import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import { Paper, Typography, Box, IconButton, Stack, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TaskCard } from './TaskCard.jsx'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export function Column({ column, tasks, index, totalColumns, onMoveLeft, onMoveRight, onRename, onDelete, canDelete = true }) {
  const rename = () => {
    const next = window.prompt('Rename column', column.title)
    if (next && next.trim()) onRename(next.trim())
  }

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
                {column.title}
              </Typography>

              <Tooltip title="Move left">
                <span>
                  <IconButton size="small" onClick={onMoveLeft} disabled={index === 0}>
                    <ArrowBackIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="Move right">
                <span>
                  <IconButton size="small" onClick={onMoveRight} disabled={index === totalColumns - 1}>
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="Rename column">
                <IconButton size="small" onClick={rename}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={canDelete ? 'Delete column (moves tasks to first column)' : 'You need at least 1 column'}>
                <span>
                  <IconButton size="small" onClick={onDelete} disabled={!canDelete}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>

            <Box sx={{ minHeight: 160 }}>
              {tasks.map((t, idx) => (
                <TaskCard key={t.id} task={t} index={idx} />
              ))}
              {provided.placeholder}
            </Box>
          </Paper>
        </div>
      )}
    </Droppable>
  )
}