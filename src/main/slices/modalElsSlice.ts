import { createSlice } from '@reduxjs/toolkit'

export const drawerSlice = createSlice({
   name: 'modals',
   initialState: {
      taskManaging: false,
      taskEditing: false,
      isExistingTask: false,
      boardManaging: false,
      isExistingBoard: false,
      deletingBoard: false,
      deletingTask: false
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
      },

      openBoardManager: (state, action) => {
         state.boardManaging = true
      },

      closeBoardManager: (state, action) => {
         state.boardManaging = false
      },

      setIsExistingBoard: (state, action) => {
         state.isExistingBoard = action.payload
      },

      setDeletingBoard: (state, action) => {
         state.deletingBoard = action.payload
      },

      setDeletingTask: (state, action) => {
         state.deletingTask = action.payload
      }
   }
})

export const { 
   openTaskManager, 
   closeTaskManager,
   openTaskEditor,
   closeTaskEditor,
   disableEditorExisting,
   enableEditorExisting,
   openBoardManager,
   closeBoardManager,
   setIsExistingBoard,
   setDeletingBoard,
   setDeletingTask
 } = drawerSlice.actions
export default drawerSlice.reducer