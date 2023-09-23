import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../store';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      // user: null,
      user: { user: 'User' },
   },
   reducers: {
      // openDrawer: (state) => {
      //    state.open = true;
      // },
      // closeDrawer: (state) => {
      //    state.open = false;
      // },
   },
});

// export const { openDrawer, closeDrawer } = drawerSlice.actions;

export const selectAuthReducer = (state: RootState) => state.auth;

export const selectUser = createSelector(
   [selectAuthReducer],
   (auth) => auth.user,
);

export default authSlice.reducer;
