import { closeBoardManager } from '../../../../../main/slices/modalElsSlice';
import { setBoards, assignActiveBoard } from '../../../../../main/slices/dataSlice';

export const createBoard = ({
   values,
   cols,
   boards,
   activeBoard,
   activeBoardId,
   dispatch
}:any) => {
   console.log('add new board')
   console.log(values)
   // const activeCol = cols.find((col:any) => col.name === values.status)
   // const newTask = {
   //    ...values,
   //    subtasks: values.subtasks.map((sub:any) => ({ title: sub, isCompleted: false })),
   //    completedSubtasks: 0,
   //    id: activeCol!.tasks.length
   // }

   // const boardsUpdated = boards.map((board:any) => board.id !== activeBoard.id ? board : {
   //    ...board,
   //    columns: board.columns.map((col:any) => col.id !== activeCol!.id ? col : {
   //       ...col,
   //       tasks: [newTask, ...col.tasks]
   //          .map( (task:any, i:number) => ({...task, id:i}) )
   //    })
   // })

   // dispatch(setBoards(boardsUpdated))
   // dispatch(assignActiveBoard(activeBoardId))
   dispatch(closeBoardManager('close'))
}