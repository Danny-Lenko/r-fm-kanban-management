import { createSlice } from '@reduxjs/toolkit'

export const drawerSlice = createSlice({
   name: 'modals',
   initialState: {
      taskManaging: false,
      taskEditing: false,
      isExistingTask: false
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
      },

      enableEditorExisting: (state, action) => {
         state.isExistingTask = true
      },

      disableEditorExisting: (state, action) => {
         state.isExistingTask = false
      }
   }
})

export const { 
   openTaskManager, 
   closeTaskManager,
   openTaskEditor,
   closeTaskEditor,
   disableEditorExisting,
   enableEditorExisting
 } = drawerSlice.actions
export default drawerSlice.reducer