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
      deletingTask: false,
      xsBoardsOpen: false
   },

   reducers: {
      setTaskManaging: (state, action) => {
         state.taskManaging = action.payload
      },

      setTaskEditing: (state, action) => {
         state.taskEditing = action.payload
      },

      setExistingTask: (state, action) => {
         state.isExistingTask = action.payload
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
      },

      setXsBoardsOpen: (state, action) => {
         state.xsBoardsOpen = action.payload
      }
   }
})

export const { 
   setTaskManaging,
   setTaskEditing,
   setExistingTask,
   openBoardManager,
   closeBoardManager,
   setIsExistingBoard,
   setDeletingBoard,
   setDeletingTask,
   setXsBoardsOpen
 } = drawerSlice.actions
export default drawerSlice.reducer