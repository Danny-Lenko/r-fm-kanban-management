import { createSlice } from '@reduxjs/toolkit'
import rowData from '../../resources/data/data.json'
import { countComletedSubtasks } from '../../library/utilities/utils'

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
            completedSubtasks: countComletedSubtasks(task)
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
         state.activeBoard = state.boards.find(board => board.id === action.payload)!
         state.activeBoardId = state.activeBoard.id
      },
      openTaskManage: (state, action) => {
         state.taskManaging = true
         state.managedTask = action.payload
         state.activeTaskId = action.payload.id
         state.activeColId = state.activeBoard.columns.find(col => col.tasks.find(task => task.title === action.payload.title))!.id
      },
      closeTaskManager: (state, action) => {
         state.taskManaging = false
      },
      manageActiveTask: (state, action) => {
         state.boards = state.boards.map(board => board.id !== state.activeBoardId ? board : {
            ...board,
            columns: board.columns.map(col => col.id !== state.activeColId ? col : {
               ...col,
               tasks: col.tasks.map(task => task.id !== state.activeTaskId ? task : action.payload)
            })
         })
      },
      manageColumnsChange: (state, action) => {
         state.boards = state.boards.map(board => board.id !== state.activeBoardId ? board : {
            ...board,
            columns: action.payload
         })
      }
   }
})

export const { 
   assignActiveBoard, 
   openTaskManage, 
   closeTaskManager, 
   manageActiveTask,
   manageColumnsChange 
} = dataSlice.actions

export default dataSlice.reducer