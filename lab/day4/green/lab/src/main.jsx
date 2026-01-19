import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { theme } from './theme/theme'

// TODO(Day4): explain injectFirst when mixing Tailwind + MUI (Strangler).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)