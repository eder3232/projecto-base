import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from './shared/mui/lightTheme'

import './index.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { darkTheme } from './shared/mui'
import { RootState } from './shared/store/store'

import { AppRouter } from './shared/router/AppRouter'

interface Props {}
const AppContainer: React.FC<React.PropsWithChildren<Props>> = () => {
  // get theme from store
  const theme = useSelector((state: RootState) => state.theme)

  // initialize dispatch variable
  const dispatch = useDispatch()
  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}
export default AppContainer
