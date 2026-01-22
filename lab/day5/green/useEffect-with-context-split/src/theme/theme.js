import { createTheme } from '@mui/material/styles'

// TODO(Day4): discuss theme tokens: palette, typography, component defaults.
export function buildTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: { main: '#00796b' }
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: 'system-ui'
    }
  })
}