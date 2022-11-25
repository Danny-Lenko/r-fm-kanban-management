import { createSlice } from '@reduxjs/toolkit'

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    open: false
  },
  reducers: {
    openDrawer: (state, action) => {
      state.open = true
    },
    closeDrawer: (state, action) => {
      state.open = false
    }
  }
})

export const { openDrawer, closeDrawer } = drawerSlice.actions
export default drawerSlice.reducer