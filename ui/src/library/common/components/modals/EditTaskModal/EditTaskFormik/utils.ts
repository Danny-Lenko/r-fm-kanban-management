import {
   setTaskAdding,
   setExistingTask,
   setBoards,
   setActiveBoardId,
} from '../../../../../../main/store';
import {
   countCompletedSubtasks,
   generateId,
} from '../../../../../utilities/utils';
import { ISubtask, ISumbissionParams } from '../../../../../interfaces';

export type Values = {
   title: string;
   description: string;
   subtasks: ISubtask[];
   status: string;
};

interface Props extends ISumbissionParams {
   values: Values;
}

// createTask
export const createTask = ({
   values,
   columns,
   boards,
   activeBoard,
   activeBoardId,
   dispatch,
}: Props) => {
   const activeCol = columns.find((col) => col.name === values.status);
   const newTask = {
      ...values,
      subtasks: values.subtasks.map((sub) => ({
         title: sub,
         isCompleted: false,
      })),
      completedSubtasks: 0,
      id: generateId(),
   };

   const boardsUpdated = boards.map((board) =>
      board.id !== activeBoard.id
         ? board
         : {
              ...board,
              columns: board.columns.map((col) =>
                 col.id !== activeCol!.id
                    ? col
                    : {
                         ...col,
                         tasks: [newTask, ...col.tasks],
                      },
              ),
           },
   );

   dispatch(setBoards(boardsUpdated));
   dispatch(setActiveBoardId(activeBoardId));
   dispatch(setTaskAdding(false));
};

// saveChanges
// export const saveChanges = ({
//    values,
//    columns,
//    boards,
//    activeBoard,
//    activeBoardId,
//    dispatch,
//    activeTask,
//    activeColumnId,
// }: Props) => {
//    let taskUpdated = {
//       ...activeTask,
//       ...values,
//       subtasks: values.subtasks.map((sub, i) =>
//          activeTask!.subtasks[i] && sub === activeTask!.subtasks[i].title
//             ? activeTask!.subtasks[i]
//             : { title: sub, isCompleted: false },
//       ),
//    };
//    taskUpdated = {
//       ...taskUpdated,
//       completedSubtasks: countCompletedSubtasks(taskUpdated),
//    };
//    const pastCol = columns.find((col) => col.id === activeColumnId);
//    const futureCol = columns.find((col) => col.name === values.status);
//    const statusChanged = taskUpdated.status !== pastCol!.name;

//    const boardsUpdated = boards.map((board) =>
//       board.id !== activeBoard.id
//          ? board
//          : {
//               ...board,
//               columns: board.columns.map((col) =>
//                  col.id === pastCol!.id
//                     ? // changing past column depending on if the status changed or not
//                       {
//                          ...col,
//                          tasks: statusChanged
//                             ? col.tasks.filter(
//                                  (task) => task.id !== taskUpdated.id,
//                               )
//                             : col.tasks.map((task) =>
//                                  task.id !== taskUpdated.id
//                                     ? task
//                                     : taskUpdated,
//                               ),
//                       }
//                     : // changing future column if the status changed
//                     col.id === futureCol!.id
//                     ? {
//                          ...col,
//                          tasks: statusChanged
//                             ? [taskUpdated, ...col.tasks]
//                             : col.tasks,
//                       }
//                     : col,
//               ),
//            },
//    );

//    dispatch(setBoards(boardsUpdated));
//    dispatch(setActiveBoardId(activeBoardId));
//    dispatch(setTaskAdding(false));
//    dispatch(setExistingTask(false));
// };
