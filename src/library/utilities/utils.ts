export const countCompletedSubtasks = (task: any) => {
   let completed = 0
   task.subtasks.forEach((subtask: any) => subtask.isCompleted ? completed = completed + 1 : completed)
   return completed
}
