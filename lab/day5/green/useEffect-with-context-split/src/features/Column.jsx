import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import { Paper, Typography, Box } from '@mui/material'
import { TaskCard } from './TaskCard.jsx'

export function Column({ column, tasks }) {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
              {column.title}
            </Typography>

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