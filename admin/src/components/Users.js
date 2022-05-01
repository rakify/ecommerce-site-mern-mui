import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import styled from "@emotion/styled";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Users() {
  const users = useSelector((state) => state.user.users);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Last 5 Users
      </Typography>
      <Paper
        sx={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        {users.length === 0 ? (
          <Typography>No user has been registered yet.</Typography>
        ) : (
          <Table size="small" sx={{ minWidth: 300 }}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Registered At</StyledTableCell>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>Full Name</StyledTableCell>
                <StyledTableCell>Phone Number</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, 5).map((user) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell>
                    <Moment fromNow>{user.createdAt}</Moment>
                  </StyledTableCell>
                  <StyledTableCell>{user.username}</StyledTableCell>
                  <StyledTableCell>
                    {user.firstName + " " + user.lastName}
                  </StyledTableCell>
                  <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{user.gender}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
      {users.length>5 && <Link color="primary" href="/users" sx={{ mt: 3 }}>
        See more users
      </Link>}
    </>
  );
}
