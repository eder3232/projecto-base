import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'

type Props = {
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseNavMenu: () => void
  anchorElNav: null | HTMLElement
  pages: string[]
}

const HamburguerMenu = ({
  handleOpenNavMenu,
  anchorElNav,
  handleCloseNavMenu,
  pages,
}: Props) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default HamburguerMenu
