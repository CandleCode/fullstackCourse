import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    logInUser(state, action) {
      return action.payload;
    },
    logoutUser() {
      return null;
    },
  },
});

export const { logInUser, logoutUser } = userSlice.actions;

export const logInUserAction = (content) => {
  if (content.token) {
    return (dispatch) => {
      dispatch(logInUser(content));
      blogService.setToken(content.token);
    };
  } else
    return async (dispatch) => {
      let newUser;
      try {
        newUser = await loginService.login({
          username: content.username,
          password: content.password,
        });
        window.localStorage.setItem("loggedBlogUser", JSON.stringify(newUser));
        blogService.setToken(newUser.token);
        dispatch(
          setNotification(
            { text: `${newUser.name} successfully logged in`, isError: false },
            5000
          )
        );
        dispatch(logInUser(newUser));
      } catch (e) {
        dispatch(
          setNotification(
            { text: "Wrong username or password", isError: true },
            5000
          )
        );
      }
    };
};

export const logOutUserAction = () => {
  return (dispatch) => {
    dispatch(logoutUser());
    window.localStorage.clear();
    blogService.setToken(null);
    dispatch(
      setNotification({ text: "successfully logged out", isError: false }, 5000)
    );
  };
};

export default userSlice.reducer;
