import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
   name: 'modals',
   initialState: {
      taskManaging: false,
      taskAdding: false,
      taskAddingColumn: '',
      taskIsExisting: false,
      taskDeleting: false,
      taskModalExpansionId: '',
      taskCardWasDragged: false,

      boardEditing: false,
      submissionTrigger: false,
      boardIsExisting: false,
      boardDeleting: false,
      xsBoardsOpen: false,

      modalIsSubmitting: false,
   },

   reducers: {
      setTaskManaging: (state, { payload }) => {
         state.taskManaging = payload;
      },

      setTaskAdding: (state, { payload }) => {
         state.taskAdding = payload;
      },

      setTaskAddingColumn: (state, { payload }) => {
         state.taskAddingColumn = payload;
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

      setTaskModalExpansionId: (state, { payload }) => {
         state.taskModalExpansionId = payload;
      },

      setTaskCardWasDragged: (state, { payload }) => {
         state.taskCardWasDragged = payload;
      },

      setModalIsSubmitting: (state, { payload }) => {
         state.modalIsSubmitting = payload;
      },
   },
});

export const {
   setTaskManaging,
   setTaskAdding,
   setExistingTask,
   setBoardEditing,
   setSubmissionTrigger,
   setBoardIsExisting,
   setBoardDeleting,
   setTaskDeleting,
   setXsBoardsOpen,
   setTaskModalExpansionId,
   setTaskCardWasDragged,
   setTaskAddingColumn,
   setModalIsSubmitting,
} = modalSlice.actions;
export default modalSlice.reducer;
