import { Box } from '@mui/material'
import React from 'react'
import ResponsiveAppBar from '../../shared/components/Navigation/appBar/ResponsiveAppBar'

type Props = {}

const MainLayout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <Box>
      <ResponsiveAppBar />
      {children}
    </Box>
  )
}

export default MainLayout
