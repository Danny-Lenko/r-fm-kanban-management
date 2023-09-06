import { createSlice } from '@reduxjs/toolkit';

import rowData from '../../../resources/data/data.json';

import { countCompletedSubtasks } from '../../../library/utilities/utils';
import { COLUMNCOLORS } from '../../../library/common/constants';
import { IBoard, IColumn, ITask } from '../../../library/interfaces';

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

type State = {
   boards: IBoard[];
   activeBoardId: string;
   activeColumnId: string;
   activeTaskId: string;
};

type DragDropIndexes = {
   sourceIndex: number;
   destinationIndex: number;
};

type Payload = IBoard | IColumn[] | ITask | DragDropIndexes;
type SetBoards = (state: State, payload: Payload) => IBoard[];

export const dataSlice = createSlice({
   name: 'data',
   initialState: {
      boards: mockData,
      activeBoardId: '0',
      activeColumnId: '0',
      activeTaskId: '0',
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

      updateColumns: (state, { payload }) => {
         state.boards = updateColumnsHelper(state, payload);
      },

      swapColumns: (state, { payload }) => {
         state.boards = swapColumnsHelper(state, payload);
      },

      updateActiveTask: (state, { payload }) => {
         state.boards = updateTaskHelper(state, payload);
      },
   },
});

export const {
   setBoards,
   setActiveBoardId,
   setActiveColumndId,
   setActiveTaskId,
   updateColumns,
   updateActiveTask,
   swapColumns,
} = dataSlice.actions;

export default dataSlice.reducer;

const updateColumnsHelper: SetBoards = (
   { boards, activeBoardId },
   columnsUpdated,
) => {
   const boardsUpdated = boards.map((board) => {
      const { id } = board;

      if (id === activeBoardId) {
         return {
            ...board,
            columns: columnsUpdated as IColumn[],
         };
      }

      return board;
   });

   return boardsUpdated;
};

const swapColumnsHelper: SetBoards = ({ boards, activeBoardId }, indexes) => {
   if (
      typeof indexes === 'object' &&
      'sourceIndex' in indexes &&
      'destinationIndex' in indexes
   ) {
      const { sourceIndex, destinationIndex } = indexes;
      const { columns } = boards.find((board) => board.id === activeBoardId)!;
      const columnsUpdated = [...columns];

      const [removedColumn] = columnsUpdated.splice(sourceIndex, 1);
      columnsUpdated.splice(destinationIndex, 0, removedColumn);

      const boardsUpdated = boards.map((board) => {
         const { id } = board;

         if (id === activeBoardId) {
            return {
               ...board,
               columns: columnsUpdated as IColumn[],
            };
         }

         return board;
      });

      return boardsUpdated;
   }

   return boards;
};

const updateTaskHelper: SetBoards = (
   { boards, activeBoardId, activeColumnId, activeTaskId },
   taskUpdated,
) => {
   const boardsUpdated = boards.map((board) => {
      const { id, columns } = board;

      if (id === activeBoardId) {
         return {
            ...board,
            columns: columns.map((column) => {
               const { id, tasks } = column;

               if (id === activeColumnId) {
                  return {
                     ...column,
                     tasks: tasks.map((task) => {
                        const { id } = task;

                        if (id === activeTaskId) {
                           return taskUpdated as ITask;
                        }

                        return task;
                     }),
                  };
               }

               return column;
            }),
         };
      }

      return board;
   });

   return boardsUpdated;
};
