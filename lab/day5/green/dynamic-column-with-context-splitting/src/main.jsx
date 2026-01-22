import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { buildTheme } from './theme/theme.js'

function ThemeRoot() {
  // Day4: useState + persistence + "theme rebuild" via useMemo
  const [mode, setMode] = React.useState(() => {
    const saved = localStorage.getItem('taskmaster:colorMode')
    return saved === 'dark' || saved === 'light' ? saved : 'light'
  })

  React.useEffect(() => {
    localStorage.setItem('taskmaster:colorMode', mode)
  }, [mode])

  const theme = React.useMemo(() => buildTheme(mode), [mode])

  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App colorMode={mode} onToggleColorMode={toggleMode} />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeRoot />
  </React.StrictMode>
)