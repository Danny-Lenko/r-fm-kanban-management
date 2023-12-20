import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectModeReducer = (state: RootState) => state.modes;

export const selectEditMode = createSelector(
   [selectModeReducer],
   (modes) => modes.editMode,
);
