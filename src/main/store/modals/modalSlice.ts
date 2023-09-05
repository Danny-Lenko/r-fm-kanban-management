import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
   name: 'modals',
   initialState: {
      taskManaging: false,
      taskEditing: false,
      isExistingTask: false,
      boardEditing: false,
      submissionTrigger: false,
      isExistingBoard: false,
      deletingBoard: false,
      deletingTask: false,
      xsBoardsOpen: false,
   },

   reducers: {
      setTaskManaging: (state, { payload }) => {
         state.taskManaging = payload;
      },

      setTaskEditing: (state, { payload }) => {
         state.taskEditing = payload;
      },

      setExistingTask: (state, { payload }) => {
         state.isExistingTask = payload;
      },

      setBoardEditing: (state, { payload }) => {
         state.boardEditing = payload;
      },

      setSubmissionTrigger: (state, { payload }) => {
         state.submissionTrigger = payload;
      },

      setIsExistingBoard: (state, { payload }) => {
         state.isExistingBoard = payload;
      },

      setDeletingBoard: (state, { payload }) => {
         state.deletingBoard = payload;
      },

      setDeletingTask: (state, { payload }) => {
         state.deletingTask = payload;
      },

      setXsBoardsOpen: (state, { payload }) => {
         state.xsBoardsOpen = payload;
      },
   },
});

export const {
   setTaskManaging,
   setTaskEditing,
   setExistingTask,
   setBoardEditing,
   setSubmissionTrigger,
   setIsExistingBoard,
   setDeletingBoard,
   setDeletingTask,
   setXsBoardsOpen,
} = modalSlice.actions;
export default modalSlice.reducer;
