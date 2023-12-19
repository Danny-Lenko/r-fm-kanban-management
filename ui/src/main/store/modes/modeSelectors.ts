import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectModeReducer = (state: RootState) => state.modes;

// general selectors
export const selectEditMode = createSelector(
   [selectModeReducer],
   (modes) => modes.editMode,
);
