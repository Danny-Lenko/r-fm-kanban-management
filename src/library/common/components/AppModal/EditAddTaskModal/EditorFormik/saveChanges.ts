import { Dispatch } from '@reduxjs/toolkit';

import {
   setTaskEditing,
   setExistingTask,
   setBoards,
   assignActiveBoard,
} from '../../../../../../main/slices';

import { countCompletedSubtasks } from '../../../../../utilities/utils';
import { ICol, IBoard, ITask } from '../../../../../interfaces';
import { Values } from '.';

interface Props {
   values: Values;
   cols: ICol[];
   boards: IBoard[];
   activeBoard: IBoard;
   activeBoardId: number;
   dispatch: Dispatch;
   activeTask: ITask;
   activeColId: number;
}

export const saveChanges = ({
   values,
   cols,
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
   const pastCol = cols.find((col) => col.id === activeColId);
   const futureCol = cols.find((col) => col.name === values.status);
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
