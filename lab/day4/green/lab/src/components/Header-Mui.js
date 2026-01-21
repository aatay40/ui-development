import React from 'react'
import { Box, Stack, Typography, Button, Paper } from '@mui/material'

export function Header() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        borderRadius: 0
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" fontWeight={800}>
            TaskMaster
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Day 4: Material UI
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button variant="contained">New Task</Button>
          <Button variant="outlined">Refresh</Button>
        </Stack>
      </Box>
    </Paper>
  )
}
