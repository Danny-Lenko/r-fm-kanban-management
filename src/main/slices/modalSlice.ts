import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
   name: 'modals',
   initialState: {
      taskManaging: false,
      taskEditing: false,
      isExistingTask: false,
      boardManaging: false,
      submissionTrigger: false,
      isExistingBoard: false,
      deletingBoard: false,
      deletingTask: false,
      xsBoardsOpen: false,
   },

   reducers: {
      setTaskManaging: (state, action) => {
         state.taskManaging = action.payload;
      },

      setTaskEditing: (state, action) => {
         state.taskEditing = action.payload;
      },

      setExistingTask: (state, action) => {
         state.isExistingTask = action.payload;
      },

      setBoardManaging: (state, action) => {
         state.boardManaging = action.payload;
      },

      setSubmissionTrigger: (state, action) => {
         state.submissionTrigger = action.payload;
      },

      setIsExistingBoard: (state, action) => {
         state.isExistingBoard = action.payload;
      },

      setDeletingBoard: (state, action) => {
         state.deletingBoard = action.payload;
      },

      setDeletingTask: (state, action) => {
         state.deletingTask = action.payload;
      },

      setXsBoardsOpen: (state, action) => {
         state.xsBoardsOpen = action.payload;
      },
   },
});

export const {
   setTaskManaging,
   setTaskEditing,
   setExistingTask,
   setBoardManaging,
   setSubmissionTrigger,
   setIsExistingBoard,
   setDeletingBoard,
   setDeletingTask,
   setXsBoardsOpen,
} = modalSlice.actions;
export default modalSlice.reducer;
