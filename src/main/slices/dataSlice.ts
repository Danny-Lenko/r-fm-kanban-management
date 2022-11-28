import { createSlice } from '@reduxjs/toolkit'
import rowData from '../../resources/data/data.json'

const data = rowData.boards.map(board => ({
   ...board,
   path: board.name.split(' ').map(word => word.toLowerCase()).join('-'),
   columns: board.columns.map(col => ({
      ...col,
      tasks: col.tasks.map(task => {
         let completed = 0
         task.subtasks.forEach(subtask => subtask.isCompleted ? completed = completed + 1 : completed)
         return ({
            ...task,
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
      taskManaging: false,
      managedTask: data[0].columns[0].tasks[0]
   },
   reducers: {
      assignActiveBoard: (state, action) => {
         state.activeBoard = state.boards.find(board => board.path === action.payload)!
      },
      openTaskManage: (state, action) => {
         state.taskManaging = true
         state.managedTask = action.payload
      },
      closeTaskManage: (state, action) => {
         state.taskManaging = false
      }
   }
})

export const { assignActiveBoard, openTaskManage, closeTaskManage } = dataSlice.actions
export default dataSlice.reducer