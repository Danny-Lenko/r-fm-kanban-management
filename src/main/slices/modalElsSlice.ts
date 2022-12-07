import { createSlice } from '@reduxjs/toolkit'

export const drawerSlice = createSlice({
   name: 'modals',
   initialState: {
      taskManaging: false,
      taskEditing: false
   },

   reducers: {
      openTaskManager: (state, action) => {
         state.taskManaging = true
      },

      closeTaskManager: (state, action) => {
         state.taskManaging = false
      },

      openTaskEditor: (state, action) => {
         state.taskEditing = true
      },

      closeTaskEditor: (state, action) => {
         state.taskEditing = false
      }

   }
})

export const { 
   openTaskManager, 
   closeTaskManager,
   openTaskEditor,
   closeTaskEditor
 } = drawerSlice.actions
export default drawerSlice.reducer