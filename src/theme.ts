import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  components: {},
  palette: {
    primary: {
      main: '#F2F2F2',
      dark: '#C9C9C9'
    },
    secondary: {
      main: '#42097F'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  spacing: 4
})
