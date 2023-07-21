import { createSlice } from '@reduxjs/toolkit';
import { FormikProps, FormikValues } from 'formik';

interface Types {
   taskManaging: boolean;
   taskEditing: boolean;
   isExistingTask: boolean;
   boardManaging: boolean;
   boardManagerRef: string;
   isExistingBoard: boolean;
   deletingBoard: boolean;
   deletingTask: boolean;
   xsBoardsOpen: boolean;
}

const state: Types = {
   taskManaging: false,
   taskEditing: false,
   isExistingTask: false,
   boardManaging: false,
   boardManagerRef: '',
   isExistingBoard: false,
   deletingBoard: false,
   deletingTask: false,
   xsBoardsOpen: false,
};

export const modalSlice = createSlice({
   name: 'modals',
   initialState: state,

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

      setBoardManagerRef: (state, action) => {
         state.boardManagerRef = action.payload;
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
   setBoardManagerRef,
   setIsExistingBoard,
   setDeletingBoard,
   setDeletingTask,
   setXsBoardsOpen,
} = modalSlice.actions;
export default modalSlice.reducer;
