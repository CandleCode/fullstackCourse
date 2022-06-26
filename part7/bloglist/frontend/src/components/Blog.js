import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const [blogFullView, setBlogFullView] = useState(false);
  const hideWhenVisible = { display: blogFullView ? "none" : "" };
  const showWhenVisible = { display: blogFullView ? "" : "none" };
  const showWhenSameUser = {
    display: user.username === blog.user.username ? "" : "none",
  };
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDeleteClick = () => {
    if (window.confirm(`remove ${blog.title} ${blog.author} ?`)) {
      return dispatch(deleteBlog(blog.id));
    }
  };

  const handleLikeClick = () => {
    return dispatch(likeBlog(blog));
  };

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className="blogText">
        {blog.title} {blog.author}
        <button onClick={() => setBlogFullView(true)}>view</button>
      </div>
      <div style={showWhenVisible} className="blogTextFull">
        {blog.title} {blog.author}
        <button onClick={() => setBlogFullView(false)}>hide</button>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={handleLikeClick}>like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={handleDeleteClick} style={showWhenSameUser}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
