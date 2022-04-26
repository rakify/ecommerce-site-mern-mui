import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { format } from "timeago.js";
import { useSelector } from "react-redux";

function preventDefault(event) {
  event.preventDefault();
}

export default function Users() {
  const users = useSelector((state) => state.user.users);
  console.log(users);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        New Customers
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Saved Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{format(user.createdAt)}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.fullName || "Not provided"}</TableCell>
              <TableCell>{user.phoneNumber || "Not provided"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.shippingInfo.district && user.shippingInfo.division
                  ? user.shippingInfo.district +
                    "," +
                    user.shippingInfo.division
                  : "Not provided"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more users
      </Link>
    </>
  );
}
