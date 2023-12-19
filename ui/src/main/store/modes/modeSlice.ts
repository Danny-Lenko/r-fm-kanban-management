import { createSlice } from '@reduxjs/toolkit';

export const modeSlice = createSlice({
   name: 'modes',
   initialState: {
      editMode: false,
   },

   reducers: {
      setEditMode: (state, { payload }) => {
         state.editMode = payload;
      },
   },
});

export const { setEditMode } = modeSlice.actions;
export default modeSlice.reducer;
