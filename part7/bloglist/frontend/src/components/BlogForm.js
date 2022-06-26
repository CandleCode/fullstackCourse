import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { Button, TextField } from "@mui/material";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const populateUser = (userId) => {
    return {
      id: userId,
      name: user.name,
      username: user.username,
    };
  };
  /// i had to do this function otherwise remove button wouldn't appear because userID isn't populated in returnedBlog from post

  const handleSubmit = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    dispatch(createBlog(blogObject, populateUser));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          type="text"
          label="title"
          value={title}
          name="Title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <TextField
          type="text"
          label="author"
          value={author}
          name="Author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <TextField
          type="text"
          label="url"
          value={url}
          name="Url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button type="submit" variant="outlined" id="submit-button">
        submit
      </Button>
    </form>
  );
};

export default BlogForm;
