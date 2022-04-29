import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function Users() {
  const users = useSelector((state) => state.user.users);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Last 5 Users
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(0,5).map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
              <TableCell>{user.phoneNumber || "Not provided"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.gender}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/?s=Users" sx={{ mt: 3 }}>
        See more users
      </Link>
    </>
  );
}
