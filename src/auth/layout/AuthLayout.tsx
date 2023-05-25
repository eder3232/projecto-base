import React from 'react'
import { Box } from '@mui/material'

interface Props {}

const AuthLayout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
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
        sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          minWidth: '300px',
          maxWidth: '500px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AuthLayout
