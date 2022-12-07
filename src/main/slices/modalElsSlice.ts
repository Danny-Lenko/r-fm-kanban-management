import { createSlice } from '@reduxjs/toolkit'

export const drawerSlice = createSlice({
  name: 'modals',
  initialState: {
    taskManaging: false
  },

  reducers: {
    openTaskManager: (state, action) => {
      state.taskManaging = true
    },

    closeTaskManager: (state, action) => {
      state.taskManaging = false
    }

  }
})

export const { openTaskManager, closeTaskManager } = drawerSlice.actions
export default drawerSlice.reducer