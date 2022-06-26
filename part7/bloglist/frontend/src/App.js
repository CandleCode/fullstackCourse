import { useEffect, useRef } from "react";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { logInUserAction, logOutUserAction } from "./reducers/userReducer";
import { initializeUserList } from "./reducers/userListReducer";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
import UserList from "./components/UserList";
import User from "./components/User";
import BlogAlternate from "./components/BlogAlternate";
import {
  AppBar,
  Button,
  Container,
  ListItem,
  TextField,
  Toolbar,
} from "@mui/material";
import * as PropTypes from "prop-types";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const padding = {
  padding: 5,
};

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortFunction = (a, b) => {
    return b.likes - a.likes;
  };

  const blogs = useSelector((state) => [...state.blogs].sort(sortFunction));
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUserList());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(logInUserAction(user));
    }
  }, [dispatch]);

  const LoginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            type="text"
            label="username"
            name="username"
            id="username"
          />
        </div>
        <div>
          {" "}
          <TextField
            type="text"
            label="password"
            name="password"
            id="password"
          />
        </div>
        <div>
          <Button variant="outlined" type="submit" id="login-button">
            login
          </Button>
        </div>
      </form>
    </div>
  );

  const BlogList = () => (
    <div>
      <h2>blogs</h2>
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Toggleable>
      {blogs.map((blog) => (
        <ListItem
          divider={true}
          component={Link}
          to={`/blogs/${blog.id}`}
          key={blog.id}
        >
          {blog.title}
        </ListItem>
      ))}
    </div>
  );

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logOutUserAction());
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(
      logInUserAction({
        username: event.target.username.value,
        password: event.target.password.value,
      })
    );
    event.target.username.value = "";
    event.target.password.value = "";
    navigate("/");
  };

  return (
    <Container>
      <div>
        <Notification />
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            {user ? (
              <div>
                <em>{user.name} logged in </em>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleLogout}
                >
                  log out
                </Button>
              </div>
            ) : (
              <Button color="inherit" component={Link} to="/login-form">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/login-form" element={<LoginForm />} />
          <Route path="/blogs/:id" element={<BlogAlternate />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<BlogList />} />
          <Route path={"/users/:id"} element={<User />} />
        </Routes>
      </div>
    </Container>
  );
};

export default App;
