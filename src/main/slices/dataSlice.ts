import { createSlice } from '@reduxjs/toolkit'
import rowData from '../../resources/data/data.json'

const data = rowData.boards.map(board => ({
   ...board,
   path: board.name.split(' ').map(word => word.toLowerCase()).join('-')
}))

export const dataSlice = createSlice({
   name: 'data',
   initialState: {
      data: data
   },
   reducers: {
      //  openDrawer: (state, action) => {
      //    state.open = true
      //  },
      //  closeDrawer: (state, action) => {
      //    state.open = false
      //  }
   }
})

// export const { openDrawer, closeDrawer } = drawerSlice.actions
export default dataSlice.reducer