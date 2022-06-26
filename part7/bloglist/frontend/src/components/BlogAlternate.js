import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBlogComment, deleteBlog, likeBlog } from "../reducers/blogReducer";
import { Button, List, ListItem, TextField } from "@mui/material";
import { useState } from "react";

const BlogAlternate = () => {
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const [commentField, setCommentField] = useState("");

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLikeClick = () => {
    return dispatch(likeBlog(blog));
  };

  const handleDeleteClick = () => {
    if (window.confirm(`remove ${blog.title} ${blog.author} ?`)) {
      dispatch(deleteBlog(blog.id));
      navigate("/");
    }
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addBlogComment({ comment: event.target.comment.value, id: blog.id })
    );
    setCommentField("");
  };

  if (!blog) return null;

  const showWhenSameUser = {
    display: user?.username === blog.user.username ? "" : "none",
  };

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <>amount of likes: {blog.likes}</>
        <Button variant="outlined" onClick={handleLikeClick}>
          like blog
        </Button>
      </div>
      <p>added by {blog.user.name}</p>
      <Button
        variant="outlined"
        onClick={handleDeleteClick}
        style={showWhenSameUser}
      >
        delete blog
      </Button>
      <h3>comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <TextField
          type="text"
          value={commentField}
          onChange={(e) => setCommentField(e.target.value)}
          name="comment"
        ></TextField>
        <Button variant="outlined" type="submit">
          Add comment
        </Button>
      </form>
      <List>
        {blog.comments.map((comment, index) => (
          <ListItem divider={true} key={index}>
            {comment}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BlogAlternate;
