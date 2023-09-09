import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
   name: 'modals',
   initialState: {
      taskManaging: false,
      taskEditing: false,
      taskIsExisting: false,
      taskDeleting: false,
      boardEditing: false,
      submissionTrigger: false,
      boardIsExisting: false,
      boardDeleting: false,
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
         state.taskIsExisting = payload;
      },

      setBoardEditing: (state, { payload }) => {
         state.boardEditing = payload;
      },

      setSubmissionTrigger: (state, { payload }) => {
         state.submissionTrigger = payload;
      },

      setBoardIsExisting: (state, { payload }) => {
         state.boardIsExisting = payload;
      },

      setBoardDeleting: (state, { payload }) => {
         state.boardDeleting = payload;
      },

      setTaskDeleting: (state, { payload }) => {
         state.taskDeleting = payload;
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
   setBoardIsExisting,
   setBoardDeleting,
   setTaskDeleting,
   setXsBoardsOpen,
} = modalSlice.actions;
export default modalSlice.reducer;
