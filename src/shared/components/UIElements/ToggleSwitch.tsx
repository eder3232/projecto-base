import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch } from '@mui/material'

import { toggleTheme } from '../../store/shared/themeSlice'
import { RootState } from '../../store/store'
import { Box } from '@mui/system'
import MUISwitch from './MUIswitch'

type Props = {}

// Como colocar darkmode con redux
// https://dev.to/rajeshj3/toggle-theme-in-react-with-mui-v5-and-redux-4h4b
const ToggleSwitch = (props: Props) => {
  const theme = useSelector((state: RootState) => state.theme)

  // initialize dispatch variable
  const dispatch = useDispatch()
  return (
    <Box sx={{ backgroundColor: 'primary', borderRadius: 4, mx: 1 }}>
      {/* <Switch
        checked={theme.darkTheme}
        onChange={() => dispatch(toggleTheme())}
      /> */}
      <MUISwitch
        checked={theme.darkTheme}
        onChange={() => dispatch(toggleTheme())}
      />
    </Box>
  )
}

export default ToggleSwitch
