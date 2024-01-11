import { createSlice } from '@reduxjs/toolkit';
import { DeleteModalTypes } from '../../../library/types';

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

      boardUpdating: false,
      boardCreating: false,

      submissionTrigger: false,
      boardIsExisting: false,
      boardDeleting: false,
      xsBoardsOpen: false,

      modalIsSubmitting: false,
      categoryIsCreating: false,

      deleteModalMode: null as DeleteModalTypes | null,
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

      setBoardUpdating: (state, { payload }) => {
         state.boardUpdating = payload;
      },

      setBoardCreating: (state, { payload }) => {
         state.boardCreating = payload;
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

      setCategoryIsCreating: (state, { payload }) => {
         state.categoryIsCreating = payload;
      },

      setDeleteModalMode: (state, { payload }) => {
         state.deleteModalMode = payload;
      },
   },
});

export const {
   setTaskManaging,
   setTaskAdding,
   setExistingTask,
   setBoardUpdating,
   setBoardCreating,
   setSubmissionTrigger,
   setBoardIsExisting,
   setBoardDeleting,
   setTaskDeleting,
   setXsBoardsOpen,
   setTaskModalExpansionId,
   setTaskCardWasDragged,
   setTaskAddingColumn,
   setModalIsSubmitting,
   setCategoryIsCreating,
   setDeleteModalMode,
} = modalSlice.actions;
export default modalSlice.reducer;
