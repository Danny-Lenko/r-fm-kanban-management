import { createSlice } from '@reduxjs/toolkit';

import rowData from '../../../resources/data/data.json';

import { countCompletedSubtasks } from '../../../library/utilities/utils';
import { COLUMNCOLORS } from '../../../library/common/constants';

const mockData = rowData.boards.map((board, i) => ({
   ...board,
   id: i + '',
   path: board.name
      .split(' ')
      .map((word) => word.toLowerCase())
      .join('-'),
   columns: board.columns.map((col, i) => ({
      ...col,
      color: COLUMNCOLORS[i],
      id: col.id,
      tasks: col.tasks.map((task, i) => {
         let completed = 0;
         task.subtasks.forEach((subtask) =>
            subtask.isCompleted ? (completed = completed + 1) : completed,
         );
         return {
            ...task,
            id: i + '',
            completedSubtasks: countCompletedSubtasks(task),
         };
      }),
   })),
}));

export const dataSlice = createSlice({
   name: 'data',
   initialState: {
      boards: mockData,
      activeBoardId: '',
      activeColumnId: '',
      activeTaskId: '',

      // activeBoard: mockData[0],
      // activeTask: mockData[0].columns[0].tasks[0],
   },

   reducers: {
      setBoards: (state, { payload }) => {
         state.boards = payload;
      },

      setActiveBoardId: (state, { payload }) => {
         state.activeBoardId = payload;
      },

      setActiveColumndId: (state, { payload }) => {
         state.activeColumnId = payload;
      },

      setActiveTaskId: (state, { payload }) => {
         state.activeTaskId = payload;
      },

      // assignActiveBoard: (state, action) => {
      //    state.activeBoard = state.boards.find(
      //       (board) => board.id === action.payload,
      //    )!;
      //    state.activeBoardId = state.activeBoard.id;
      // },

      // assignActiveTaskCol: (state, action) => {
      //    state.activeTask = action.payload;
      //    state.activeTaskId = action.payload.id;
      //    state.activeColumnId = state.activeBoard.columns.find((col) =>
      //       col.tasks.find((task) => task.title === action.payload.title),
      //    )!.id;
      // },

      manageActiveTask: (state, action) => {
         state.boards = state.boards.map((board) =>
            board.id !== state.activeBoardId
               ? board
               : {
                    ...board,
                    columns: board.columns.map((col) =>
                       col.id !== state.activeColumnId
                          ? col
                          : {
                               ...col,
                               tasks: col.tasks.map((task) =>
                                  task.id !== state.activeTaskId
                                     ? task
                                     : action.payload,
                               ),
                            },
                    ),
                 },
         );
      },

      manageColumnsChange: (state, action) => {
         state.boards = state.boards.map((board) =>
            board.id !== state.activeBoardId
               ? board
               : {
                    ...board,
                    columns: action.payload,
                 },
         );
      },
   },
});

export const {
   setBoards,
   setActiveBoardId,
   setActiveColumndId,
   setActiveTaskId,
   // assignActiveBoard,
   // assignActiveTaskCol,
   manageActiveTask,
   manageColumnsChange,
} = dataSlice.actions;

export default dataSlice.reducer;
