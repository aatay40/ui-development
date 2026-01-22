import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

export function Layout({ children, colorMode = 'light', onToggleColorMode = () => {} }) {
  const isDark = colorMode === 'dark'

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            TaskMaster
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            SDB Workshop
          </Typography>

          <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton onClick={onToggleColorMode} aria-label="toggle dark mode">
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ p: 2, textAlign: 'center', opacity: 0.7 }}>
        <Typography variant="caption">© {new Date().getFullYear()} TaskMaster</Typography>
      </Box>
    </Box>
  )
}