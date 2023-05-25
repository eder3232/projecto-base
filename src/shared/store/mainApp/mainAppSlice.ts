import { createSlice } from '@reduxjs/toolkit'

export const mainApp = createSlice({
  name: 'mainApp',
  initialState: {
    counter: 0,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state += action.payload
    },
  },
})

export const { incrementByAmount } = mainApp.actions

export default mainApp.reducer
