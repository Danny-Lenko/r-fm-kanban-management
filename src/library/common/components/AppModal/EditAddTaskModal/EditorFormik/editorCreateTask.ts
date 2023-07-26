import {
   setTaskEditing,
   setBoards,
   assignActiveBoard,
} from '../../../../../../main/slices';

export const createTask = ({
   values,
   cols,
   boards,
   activeBoard,
   activeBoardId,
   dispatch,
}: any) => {
   const activeCol = cols.find((col: any) => col.name === values.status);
   const newTask = {
      ...values,
      subtasks: values.subtasks.map((sub: any) => ({
         title: sub,
         isCompleted: false,
      })),
      completedSubtasks: 0,
      id: activeCol!.tasks.length,
   };

   const boardsUpdated = boards.map((board: any) =>
      board.id !== activeBoard.id
         ? board
         : {
              ...board,
              columns: board.columns.map((col: any) =>
                 col.id !== activeCol!.id
                    ? col
                    : {
                         ...col,
                         tasks: [newTask, ...col.tasks].map(
                            (task: any, i: number) => ({ ...task, id: i }),
                         ),
                      },
              ),
           },
   );

   dispatch(setBoards(boardsUpdated));
   dispatch(assignActiveBoard(activeBoardId));
   dispatch(setTaskEditing(false));
};
