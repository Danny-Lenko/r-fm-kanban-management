import { createSlice } from '@reduxjs/toolkit'
import rowData from '../../resources/data/data.json'

const data = rowData.boards.map(board => ({
   ...board,
   path: board.name.split(' ').map(word => word.toLowerCase()).join('-')
}))

export const dataSlice = createSlice({
   name: 'data',
   initialState: {
      boards: data,
      activeBoard: data[0]
   },
   reducers: {
      assignActiveBoard: (state, action) => {
         state.activeBoard = state.boards.find(board => board.path === action.payload)!
      }
   }
})

export const { assignActiveBoard } = dataSlice.actions
export default dataSlice.reducer