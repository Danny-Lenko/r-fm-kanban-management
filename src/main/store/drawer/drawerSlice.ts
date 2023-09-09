import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../store';

export const drawerSlice = createSlice({
   name: 'drawer',
   initialState: {
      open: false,
   },
   reducers: {
      openDrawer: (state) => {
         state.open = true;
      },
      closeDrawer: (state) => {
         state.open = false;
      },
   },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export const selectDrawerOpen = (state: RootState) => state.drawer.open;

export const selectIsDrawerOpen = createSelector(
   [selectDrawerOpen],
   (open) => open,
);

export default drawerSlice.reducer;
