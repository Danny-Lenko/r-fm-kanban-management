import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectModalsReducer = (state: RootState) => state.modals;

// general selectors
export const selectSubmissionTrigger = createSelector(
   [selectModalsReducer],
   (modals) => modals.submissionTrigger,
);

export const selectXsBoardsOpen = createSelector(
   [selectModalsReducer],
   (modals) => modals.xsBoardsOpen,
);

// board selectors
export const selectBoardEditing = createSelector(
   [selectModalsReducer],
   (modals) => modals.boardEditing,
);

export const selectBoardDeleting = createSelector(
   [selectModalsReducer],
   (modals) => modals.boardDeleting,
);

export const selectBoardIsExisting = createSelector(
   [selectModalsReducer],
   (modals) => modals.boardIsExisting,
);

// tasks selectors
export const selectTaskManaging = createSelector(
   [selectModalsReducer],
   (modals) => modals.taskManaging,
);

export const selectTaskEditing = createSelector(
   [selectModalsReducer],
   (modals) => modals.taskEditing,
);

export const selectTaskDeleting = createSelector(
   [selectModalsReducer],
   (modals) => modals.taskDeleting,
);

export const selectTaskIsExisting = createSelector(
   [selectModalsReducer],
   (modals) => modals.taskIsExisting,
);
