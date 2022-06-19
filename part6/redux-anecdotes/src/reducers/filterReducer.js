import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    newFilter(state, action) {
      const content = action.payload
      return state = ( content )
    },
  },
})

export const { newFilter } = filterSlice.actions
export default filterSlice.reducer