import {
   setTaskEditing,
   setExistingTask,
   setBoards,
   assignActiveBoard,
} from '../../../../../../main/slices';
import { countCompletedSubtasks } from '../../../../../utilities/utils';
import { ISumbissionParams } from '../../../../../interfaces';

export type Values = {
   title: string;
   description: string;
   subtasks: string[];
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
   activeTask,
   activeColId,
}: Props) => {
   const activeCol = columns.find((col) => col.name === values.status);
   const newTask = {
      ...values,
      subtasks: values.subtasks.map((sub) => ({
         title: sub,
         isCompleted: false,
      })),
      completedSubtasks: 0,
      id: activeCol!.tasks.length,
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
                         tasks: [newTask, ...col.tasks].map((task, i) => ({
                            ...task,
                            id: i,
                         })),
                      },
              ),
           },
   );

   dispatch(setBoards(boardsUpdated));
   dispatch(assignActiveBoard(activeBoardId));
   dispatch(setTaskEditing(false));
};

// saveChanges
export const saveChanges = ({
   values,
   columns,
   boards,
   activeBoard,
   activeBoardId,
   dispatch,
   activeTask,
   activeColId,
}: Props) => {
   let taskUpdated = {
      ...activeTask,
      ...values,
      subtasks: values.subtasks.map((sub, i) =>
         activeTask.subtasks[i] && sub === activeTask.subtasks[i].title
            ? activeTask.subtasks[i]
            : { title: sub, isCompleted: false },
      ),
   };
   taskUpdated = {
      ...taskUpdated,
      completedSubtasks: countCompletedSubtasks(taskUpdated),
   };
   const pastCol = columns.find((col) => col.id === activeColId);
   const futureCol = columns.find((col) => col.name === values.status);
   const statusChanged = taskUpdated.status !== pastCol!.name;

   const boardsUpdated = boards.map((board) =>
      board.id !== activeBoard.id
         ? board
         : {
              ...board,
              columns: board.columns.map((col) =>
                 col.id === pastCol!.id
                    ? // changing past column depending on if the status changed or not
                      {
                         ...col,
                         tasks: statusChanged
                            ? col.tasks
                                 .filter((task) => task.id !== taskUpdated.id)
                                 .map((task, i) => ({
                                    ...task,
                                    id: i,
                                 }))
                            : col.tasks.map((task) =>
                                 task.id !== taskUpdated.id
                                    ? task
                                    : taskUpdated,
                              ),
                      }
                    : // changing future column if the status changed
                    col.id === futureCol!.id
                    ? {
                         ...col,
                         tasks: statusChanged
                            ? [taskUpdated, ...col.tasks].map((task, i) => ({
                                 ...task,
                                 id: i,
                              }))
                            : col.tasks,
                      }
                    : col,
              ),
           },
   );

   dispatch(setBoards(boardsUpdated));
   dispatch(assignActiveBoard(activeBoardId));
   dispatch(setTaskEditing(false));
   dispatch(setExistingTask(false));
};
