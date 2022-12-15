import { closeBoardManager } from '../../../../../main/slices/modalElsSlice';
import { setBoards, assignActiveBoard } from '../../../../../main/slices/dataSlice';

export const createBoard = ({
   values,
   boards,
   dispatch
}:any) => {
   const newBoard = {
       id: boards.length,
       columns: values.columns.map( (col:any, i:number) => ({ id: i, name: col, tasks: [] }) ),
       name: values.name,
       path: values.name.split(' ').map( (word:any) => word.toLowerCase()).join('-')
   }

   const boardsUpdated = [...boards, newBoard]

   dispatch(setBoards(boardsUpdated))
   dispatch(assignActiveBoard(boards.length))
   dispatch(closeBoardManager('close'))
}