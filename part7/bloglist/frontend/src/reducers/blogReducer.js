import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    likeABlog(state, action) {
      const id = action.payload;
      const blogToLike = state.find((n) => n.id === id);
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
      return state.map((blog) => (blog.id !== id ? blog : likedBlog));
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    appendBlogComment(state, action) {
      const { id, comment } = action.payload;
      return state.map((blog) =>
        blog.id !== id
          ? blog
          : { ...blog, comments: blog.comments.concat(comment) }
      );
    },
  },
});

export const {
  appendBlog,
  setBlogs,
  likeABlog,
  removeBlog,
  appendBlogComment,
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
    dispatch(likeABlog(blog.id));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteObject(id);
    dispatch(removeBlog(id));
  };
};

export const createBlog = (content, populateUser) => {
  return async (dispatch) => {
    let newBlog;
    try {
      newBlog = await blogService.create(content);
      dispatch(
        setNotification(
          {
            text: `a new blog ${newBlog.title} by ${newBlog.author} has been added`,
            isError: false,
          },
          5000
        )
      );
      const populatedNewBlog = {
        ...newBlog,
        user: populateUser(newBlog.user.id),
      };

      //refer to blogForm populateUserFunction for reasoning to this

      dispatch(appendBlog(populatedNewBlog));
    } catch (e) {
      dispatch(setNotification({ text: e.response.data, isError: true }, 5000));
    }
  };
};

export const addBlogComment = (content) => {
  return async (dispatch) => {
    let modifiedBlog;
    try {
      modifiedBlog = await blogService.addComment(content.id, content.comment);
      dispatch(
        setNotification(
          {
            text: `a new comment has been added to ${modifiedBlog.title} by ${modifiedBlog.author}`,
            isError: false,
          },
          5000
        )
      );
      dispatch(appendBlogComment({ id: content.id, comment: content.comment }));
    } catch (e) {
      dispatch(setNotification({ text: e.response.data, isError: true }, 5000));
    }
  };
};

export default blogSlice.reducer;
