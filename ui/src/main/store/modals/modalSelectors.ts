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
export const selectBoardUpdating = createSelector(
   [selectModalsReducer],
   (modals) => modals.boardUpdating,
);

export const selectBoardCreating = createSelector(
   [selectModalsReducer],
   (modals) => modals.boardCreating,
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

export const selectTaskAdding = createSelector(
   [selectModalsReducer],
   (modals) => modals.taskAdding,
);

export const selectTaskAddingColumn = createSelector(
   [selectModalsReducer],
   (modals) => modals.taskAddingColumn,
);

export const selectTaskDeleting = createSelector(
   [selectModalsReducer],
   (modals) => modals.taskDeleting,
);

export const selectTaskIsExisting = createSelector(
   [selectModalsReducer],
   (modals) => modals.taskIsExisting,
);

export const selectTaskModalExpansionId = createSelector(
   [selectModalsReducer],
   (modals) => modals.taskModalExpansionId,
);

export const selectTaskCardWasDragged = createSelector(
   [selectModalsReducer],
   (modals) => modals.taskCardWasDragged,
);

export const selectModalIsSubmitting = createSelector(
   [selectModalsReducer],
   (modals) => modals.modalIsSubmitting,
);

// category

export const selectCategoryIsCreating = createSelector(
   [selectModalsReducer],
   (modals) => modals.categoryIsCreating,
);

// delete modal

export const selectDeleteModalMode = createSelector(
   [selectModalsReducer],
   (modals) => modals.deleteModalMode,
);
