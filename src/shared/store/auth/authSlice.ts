import { AlertColor } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum EnumStatus {
  'checking' = 'checking',
  'notAuthenticated' = 'notAuthenticated',
  'authenticated' = 'authenticated',
}

type IType = 'success' | 'info' | 'warning' | 'error'

interface IFeedBack {
  code: number | null
  message: string | null
  type: IType | null
}

interface IAuthState {
  status: EnumStatus
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  feedback: IFeedBack
}

const initialState: IAuthState = {
  status: EnumStatus.checking,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  feedback: {
    code: null,
    message: null,
    type: null,
  },
}

export interface IPayLoadLogin {
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export interface IPayLoadLogout {
  message: string | null
  code: number | null
  type: IType | null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<IPayLoadLogin>) => {
      state.status = EnumStatus.authenticated
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL
      // state.errorMessage = null
      state.feedback.message = null
      state.feedback.code = null
      state.feedback.type = null
    },
    logout: (state, { payload }: PayloadAction<IPayLoadLogout>) => {
      state.status = EnumStatus.notAuthenticated
      state.email = null
      state.displayName = null
      state.photoURL = null
      // state.errorMessage = payload?.errorMessage
      state.feedback.message = payload?.message
      state.feedback.code = payload?.code
      state.feedback.type = payload?.type
    },
    checkingCredentials: (state) => {
      state.status = EnumStatus.checking
    },
    deleteMessageError: (state) => {
      // state.errorMessage = null
      state.feedback.message = null
      state.feedback.code = null
      state.feedback.type = null
    },
  },
})

export const { checkingCredentials, deleteMessageError, login, logout } =
  authSlice.actions

export default authSlice.reducer
