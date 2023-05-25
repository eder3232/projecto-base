import React from 'react'
import { Box } from '@mui/material'

import CircularProgress from '@mui/material/CircularProgress'

interface Props {}

const CheckingAuth = (props: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: 'primary.main',
        p: 4,
      }}
    >
      <Box
        className="box-shadow"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          minWidth: '300px',
          maxWidth: '500px',
          minHeight: '300px',
          maxHeight: '500px',
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  )
}

export default CheckingAuth
