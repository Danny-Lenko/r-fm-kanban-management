import { createSlice } from '@reduxjs/toolkit';
import rowData from '../../resources/data/data.json';
import { countCompletedSubtasks } from '../../library/utilities/utils';
import { COLUMNCOLORS } from '../../library/common/constants';

const data = rowData.boards.map((board, i) => ({
   ...board,
   id: i,
   path: board.name
      .split(' ')
      .map((word) => word.toLowerCase())
      .join('-'),
   columns: board.columns.map((col, i) => ({
      ...col,
      color: COLUMNCOLORS[i],
      id: i,
      tasks: col.tasks.map((task, i) => {
         let completed = 0;
         task.subtasks.forEach((subtask) =>
            subtask.isCompleted ? (completed = completed + 1) : completed,
         );
         return {
            ...task,
            id: i,
            completedSubtasks: countCompletedSubtasks(task),
         };
      }),
   })),
}));

export const dataSlice = createSlice({
   name: 'data',
   initialState: {
      boards: data,
      activeBoard: data[0],
      activeBoardId: 0,
      activeColId: 0,
      activeTaskId: 0,
      managedTask: data[0].columns[0].tasks[0],
   },

   reducers: {
      assignActiveBoard: (state, action) => {
         state.activeBoard = state.boards.find(
            (board) => board.id === action.payload,
         )!;
         state.activeBoardId = state.activeBoard.id;
      },

      assignActiveTaskCol: (state, action) => {
         state.managedTask = action.payload;
         state.activeTaskId = action.payload.id;
         state.activeColId = state.activeBoard.columns.find((col) =>
            col.tasks.find((task) => task.title === action.payload.title),
         )!.id;
      },

      manageActiveTask: (state, action) => {
         state.boards = state.boards.map((board) =>
            board.id !== state.activeBoardId
               ? board
               : {
                    ...board,
                    columns: board.columns.map((col) =>
                       col.id !== state.activeColId
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

      setBoards: (state, action) => {
         state.boards = action.payload;
      },
   },
});

export const {
   assignActiveBoard,
   assignActiveTaskCol,
   manageActiveTask,
   manageColumnsChange,
   setBoards,
} = dataSlice.actions;

export default dataSlice.reducer;
