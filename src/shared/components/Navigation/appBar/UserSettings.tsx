import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'
import { startLogout } from '../../../store/auth/thunks'
import { useAppDispatch } from '../../../store/hooks/reduxHooks'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

type Props = {
  photoURL: string
  displayName: string
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseUserMenu: () => void
  anchorElUser: null | HTMLElement
}

const UserSettings = ({
  photoURL,
  displayName,
  handleOpenUserMenu,
  handleCloseUserMenu,
  anchorElUser,
}: Props) => {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    handleCloseUserMenu()
    dispatch(startLogout())
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            sx={{ bgcolor: blue[500] }}
            alt={displayName}
            // src={'/statis/images/avatars/avatar_6.png'}
          >
            <img src={photoURL} alt={displayName} width={40} />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}

        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        {/* <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Account</Typography>
        </MenuItem> */}
        {/* <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Dashboard</Typography>
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Cerrar sesión</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserSettings
