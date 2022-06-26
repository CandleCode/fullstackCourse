import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { List, ListItem } from "@mui/material";

const User = () => {
  const paramsId = useParams().id;
  const user = useSelector((state) =>
    state.userList.find((user) => user.id === paramsId)
  );
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3> added blogs</h3>
      <List>
        {user.blogs.map((blog) => (
          <ListItem divider={true} key={blog.id}>
            {blog.title}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default User;
