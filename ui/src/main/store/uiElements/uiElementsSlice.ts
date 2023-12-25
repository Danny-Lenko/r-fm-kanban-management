import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../store';

export const uiElementsSlice = createSlice({
   name: 'uiElements',
   initialState: {
      drawerIsOpen: false,
      expandedCategories: [0],
   },
   reducers: {
      openDrawer: (state) => {
         state.drawerIsOpen = true;
      },
      closeDrawer: (state) => {
         state.drawerIsOpen = false;
      },

      setExpandedCategories: (state, { payload }) => {
         state.expandedCategories = payload;
      },
   },
});

export const { openDrawer, closeDrawer, setExpandedCategories } =
   uiElementsSlice.actions;

export const selectUiElements = (state: RootState) => state.uiElements;

export const selectDrawerIsOpen = createSelector(
   [selectUiElements],
   (state) => state.drawerIsOpen,
);

export const selectExpandedCategories = createSelector(
   [selectUiElements],
   (state) => state.expandedCategories,
);

export default uiElementsSlice.reducer;
