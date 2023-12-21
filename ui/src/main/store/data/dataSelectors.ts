import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectDataReducer = (state: RootState) => state.data;

// all the boards
export const selectBoards = createSelector(
   [selectDataReducer],
   (data) => data.boards,
);

export const selectActiveCategoryName = createSelector(
   [selectDataReducer],
   (data) => data.activeCategoryName,
);

// active board info
export const selectActiveBoardId = createSelector(
   [selectDataReducer],
   (data) => data.activeBoardId,
);
export const selectActiveBoard = createSelector([selectDataReducer], (data) => {
   const { boards, activeBoardId } = data;
   // mock to quikly fix activeBoardId
   return boards.find((board) => board.id === '0')!;
});
export const selectActiveBoardInfo = createSelector(
   [selectActiveBoard, selectActiveBoardId],
   (activeBoard, activeBoardId) => ({
      activeBoard,
      activeBoardId,
   }),
);

// active column info
export const selectActiveColumnId = createSelector(
   [selectDataReducer],
   (data) => data.activeColumnId,
);
export const selectActiveColumn = createSelector(
   [selectDataReducer],
   (data) => {
      const { boards, activeBoardId, activeColumnId } = data;
      const activeBoard = boards.find((board) => board.id === activeBoardId)!;

      return (
         activeBoard.columns.find((column) => column.id === activeColumnId) ||
         null
      );
   },
);
export const selectActiveColumnInfo = createSelector(
   [selectActiveColumn, selectActiveColumnId],
   (activeColumn, activeColumnId) => ({
      activeColumn,
      activeColumnId,
   }),
);

// active task info
export const selectActiveTaskId = createSelector(
   [selectDataReducer],
   (data) => data.activeTaskId,
);
export const selectActiveTask = createSelector([selectDataReducer], (data) => {
   const { boards, activeBoardId, activeColumnId, activeTaskId } = data;
   const activeBoard = boards.find((board) => board.id === activeBoardId)!;
   const activeColumn =
      activeBoard.columns.find((column) => column.id === activeColumnId) ||
      null;

   if (activeColumn) {
      return (
         activeColumn.tasks.find((task) => task.id === activeTaskId) || null
      );
   }
   return null;
});
export const selectActiveTaskInfo = createSelector(
   [selectActiveTask, selectActiveTaskId],
   (activeTask, activeTaskId) => ({
      activeTask,
      activeTaskId,
   }),
);
