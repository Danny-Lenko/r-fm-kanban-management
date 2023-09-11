import { v4 as uuid } from 'uuid';

export const countCompletedSubtasks = (task: any) => {
   let completed = 0;
   task.subtasks.forEach((subtask: any) =>
      subtask.isCompleted ? (completed = completed + 1) : completed,
   );
   return completed;
};

export const generateId = () => {
   return uuid();
};
