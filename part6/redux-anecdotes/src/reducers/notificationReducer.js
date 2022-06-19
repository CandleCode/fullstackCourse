import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: '',
  timeoutID:''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setTimeoutID(state, action) {
      state.timeoutID = action.payload
    },
    createNotification(state, action) {
      const content = action.payload
      clearTimeout(state.timeoutID)
      state.notification = ( content )
      return state
    },
    removeNotification(state) {
      state.notification = ''
      return state
    }
  },
})

export const { createNotification, removeNotification, setTimeoutID } = notificationSlice.actions



export const setNotification = (content, timeout) => {
  return dispatch => {
    dispatch(createNotification(content))
    const timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
    dispatch(setTimeoutID(timeoutID))
  }
}

export default notificationSlice.reducer