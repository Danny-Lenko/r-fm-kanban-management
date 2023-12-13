import { createSlice } from '@reduxjs/toolkit';

import rowData from '../../../resources/data/data.json';

import { countCompletedSubtasks } from '../../../library/utilities';
import { columnColors } from '../../../library/common/constants';
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
      color: columnColors[i],
      id: col.id,
      tasks: col.tasks.map((task, i) => {
         let completed = 0;
         task.subtasks.forEach((subtask) =>
            subtask.isCompleted ? (completed = completed + 1) : completed,
         );
         return {
            ...task,
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

type DragDropInfo = DragDropIndexes & {
   sourceColumnId: string;
   destinationColumnId: string;
};

type Payload = IBoard | IColumn[] | ITask | DragDropIndexes | DragDropInfo;
type SetBoards = (state: State, payload: Payload) => IBoard[];

export const dataSlice = createSlice({
   name: 'data',
   initialState: {
      boards: mockData,
      activeBoardId: '',
      activeColumnId: '0',
      activeTaskId: '',
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

      updateColumns: (state, { payload }) => {
         // state.boards = updateColumnsHelper(state, payload);
      },

      dropColumn: (state, { payload }) => {
         // state.boards = dropColumnHelper(state, payload);
      },

      setActiveTaskId: (state, { payload }) => {
         state.activeTaskId = payload;
      },

      updateActiveTask: (state, { payload }) => {
         // state.boards = updateTaskHelper(state, payload);
      },

      dropTask: (state, { payload }) => {
         // state.boards = dropTaskHelper(state, payload); 
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
   dropColumn,
   dropTask,
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

const dropColumnHelper: SetBoards = (state, indexes) => {
   const { boards, activeBoardId } = state;

   if (typeof indexes === 'object' && 'sourceIndex' in indexes) {
      const { sourceIndex, destinationIndex } = indexes;
      const { columns } = boards.find((board) => board.id === activeBoardId)!;
      const columnsUpdated = [...columns];

      const [removedColumn] = columnsUpdated.splice(sourceIndex, 1);
      columnsUpdated.splice(destinationIndex, 0, removedColumn);

      return updateColumnsHelper(state, columnsUpdated);
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

const dropTaskHelper: SetBoards = (state, payload) => {
   const { boards, activeBoardId } = state;

   if (typeof payload === 'object' && 'sourceColumnId' in payload) {
      const {
         sourceIndex,
         destinationIndex,
         sourceColumnId,
         destinationColumnId,
      } = payload;
      const { columns } = boards.find((board) => board.id === activeBoardId)!;

      const sourceColumnIndex = columns.findIndex(
         (column) => column.id === sourceColumnId,
      );
      const destinationColumnIndex = columns.findIndex(
         (column) => column.id === destinationColumnId,
      );
      const destinationColumnName = columns.find(
         (column) => column.id === destinationColumnId,
      )!.name;

      const newSourceTasks = [...columns[sourceColumnIndex].tasks];
      const newDestinationTasks =
         sourceColumnId !== destinationColumnId
            ? [...columns[destinationColumnIndex].tasks]
            : newSourceTasks;

      const [deletedTask] = newSourceTasks.splice(sourceIndex, 1);
      newDestinationTasks.splice(destinationIndex, 0, {
         ...deletedTask,
         status: destinationColumnName,
      });

      const columnsUpdated = [...columns];

      columnsUpdated[sourceColumnIndex] = {
         ...columns[sourceColumnIndex],
         tasks: newSourceTasks,
      };
      columnsUpdated[destinationColumnIndex] = {
         ...columns[destinationColumnIndex],
         tasks: newDestinationTasks,
      };

      return updateColumnsHelper(state, columnsUpdated);
   }

   return boards;
};
