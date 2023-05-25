import { configureStore } from '@reduxjs/toolkit'

import themeReducer from './shared/themeSlice'
import mainAppReducer from './mainApp/mainAppSlice'
import authReducer from './auth/authSlice'

export const store = configureStore({
  reducer: {
    mainApp: mainAppReducer,
    theme: themeReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
