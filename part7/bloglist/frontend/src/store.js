import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import userListReducer from "./reducers/userListReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    userList: userListReducer,
  },
});

export default store;
