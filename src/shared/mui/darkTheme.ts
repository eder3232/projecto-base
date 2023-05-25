import { createTheme } from '@mui/material'

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

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#dd2c00',
    // },
    // secondary: {
    //   main: '#304ffe',
    // },
    // text: {
    //   primary: '#fff',
    // },
    background: {
      default: '#303030',
      paper: '#424242',
    },
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
