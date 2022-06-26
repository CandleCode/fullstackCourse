import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  timeoutID: "",
  isError: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setTimeoutID(state, action) {
      state.timeoutID = action.payload;
    },
    createNotification(state, action) {
      const { text, isError } = action.payload;
      clearTimeout(state.timeoutID);
      state.text = text;
      state.isError = isError;
      return state;
    },
    removeNotification(state) {
      state.text = "";
      return state;
    },
  },
});

export const { createNotification, removeNotification, setTimeoutID } =
  notificationSlice.actions;

export const setNotification = (content, timeout) => {
  return (dispatch) => {
    dispatch(createNotification(content));
    const timeoutID = setTimeout(() => {
      dispatch(removeNotification());
    }, timeout);
    dispatch(setTimeoutID(timeoutID));
  };
};

export default notificationSlice.reducer;
