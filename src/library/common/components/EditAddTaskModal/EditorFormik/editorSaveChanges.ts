import { closeTaskEditor, disableEditorExisting } from '../../../../../main/slices/modalElsSlice';
import { setBoards, assignActiveBoard } from '../../../../../main/slices/dataSlice';

export const saveChanges = ({
   values,
   cols,
   boards,
   activeBoard,
   activeBoardId,
   dispatch,
   activeTask,
   activeColId
}: any) => {

   const taskUpdated = {
      ...activeTask,
      ...values,
      subtasks: values.subtasks.map( (sub:any, i:number) => 
         ( activeTask.subtasks[i] && sub === activeTask.subtasks[i].title ) 
            ? activeTask.subtasks[i] 
            : {title: sub, isCompleted: false} )
   }
   const pastCol = cols.find((col: any) => col.id === activeColId)
   const futureCol = cols.find((col: any) => col.name === values.status)
   const statusChanged = taskUpdated.status !== pastCol.name

   console.log(activeTask)

   const boardsUpdated = boards.map((board:any) => board.id !== activeBoard.id ? board : {
      ...board,
      columns: board.columns.map((col:any) => col.id === pastCol!.id
         // changing past column depending on if the status changed or not 
         ? {
            ...col,
            tasks: statusChanged 
               ? col.tasks
                  .filter( (task:any) => task.id !== taskUpdated.id )
                  .map( (task:any, i:number) => ({...task, id: i}) )
               : col.tasks
                  .map( (task:any) => task.id !== taskUpdated.id ? task : taskUpdated )
         }
         // changing future column if the status changed
         : col.id === futureCol.id ? {
            ...col,
            tasks: statusChanged 
               ? [taskUpdated, ...col.tasks]
                  .map( (task:any, i:number) => ({...task, id: i}) )
               : col.tasks
         }
         : col
      )
   })

   dispatch(setBoards(boardsUpdated))
   dispatch(assignActiveBoard(activeBoardId))
   dispatch(closeTaskEditor('close'))
   dispatch(disableEditorExisting('disable'))
}