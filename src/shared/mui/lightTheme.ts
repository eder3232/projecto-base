import { createTheme } from '@mui/material'
import { orange } from '@mui/material/colors'

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

export const lightTheme = createTheme({
  palette: {
    // primary: {
    //   main: '#dd2c00',
    // },
    // secondary: {
    //   main: '#304ffe',
    // },
  },
  typography: {
    h1: {
      fontSize: '2.7rem',
    },
    h2: {
      fontSize: '2.4rem',
    },
    h4: {
      fontSize: '1.8rem',
    },
    h3: {
      fontSize: '2.1rem',
    },
  },
})
