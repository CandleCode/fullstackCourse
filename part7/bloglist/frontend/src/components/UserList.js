import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const UserList = () => {
  const userList = useSelector((state) => state.userList);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">User name</TableCell>
          <TableCell align="left">Blog count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {userList.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </TableCell>
            <TableCell>{user.blogs.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserList;
