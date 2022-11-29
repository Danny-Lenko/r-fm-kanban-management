import { createSlice } from '@reduxjs/toolkit'
import rowData from '../../resources/data/data.json'

const data = rowData.boards.map((board, i) => ({
   ...board,
   id: i,
   path: board.name.split(' ').map(word => word.toLowerCase()).join('-'),
   columns: board.columns.map((col, i) => ({
      ...col,
      id: i,
      tasks: col.tasks.map((task, i) => {
         let completed = 0
         task.subtasks.forEach(subtask => subtask.isCompleted ? completed = completed + 1 : completed)
         return ({
            ...task,
            id: i,
            completedSubtasks: completed
         })
      })
   }))
}))

export const dataSlice = createSlice({
   name: 'data',
   initialState: {
      boards: data,
      activeBoard: data[0],
      activeBoardId: 0,
      activeColId: 0,
      activeTaskId: 0,
      taskManaging: false,
      managedTask: data[0].columns[0].tasks[0]
   },
   reducers: {
      assignActiveBoard: (state, action) => {
         state.activeBoard = state.boards.find(board => board.path === action.payload)!
         state.activeBoardId = state.activeBoard.id
      },
      openTaskManage: (state, action) => {
         state.taskManaging = true
         state.managedTask = action.payload
         state.activeTaskId = action.payload.id
         state.activeColId = state.activeBoard.columns.find(col => col.tasks.find(task => task.title === action.payload.title))!.id
      },
      closeTaskManage: (state, action) => {
         // state.boards = state.boards.map(board => board.name !== state.activeBoard.name ? board : {
         //    ...board,
         //    columns: board.columns
         // })
         state.taskManaging = false
      }
   }
})

export const { assignActiveBoard, openTaskManage, closeTaskManage } = dataSlice.actions
export default dataSlice.reducer