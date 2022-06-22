import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import TableRow from "@mui/material/TableRow";
import { Paper, Typography, Button, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  deleteNotification,
  getNotifications,
  updateUser,
} from "../redux/apiCalls";
import { GppBad, GppGood } from "@mui/icons-material";

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

export default function Notifications() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    getNotifications().then((res) => setNotifications(res.data));
  }, []);

  const handleApprove = (notification) => {
    const user = users.find((user) => user._id === notification.fromUser._id);
    const updatedUser = {
      ...user,
      password: "",
      accountType: notification.messageSubject,
    };
    updateUser(notification.fromUser._id, updatedUser, dispatch).then((res) => {
      if (res.status === 200) {
        deleteNotification(notification._id);
        getNotifications().then((res) => setNotifications(res.data));
      }
    });
  };
  const handleDecline = (notification) => {
    const user = users.find((user) => user._id === notification.fromUser._id);
    const updatedUser = {
      ...user,
      password: "",
      accountType: notification.messageSubject === 0 ? 1 : 0,
    };
    updateUser(notification.fromUser._id, updatedUser, dispatch).then((res) => {
      if (res.status === 200) {
        deleteNotification(notification._id);
        getNotifications().then((res) => setNotifications(res.data));
      }
    });
  };
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Notifications
      </Typography>
      <Paper
        sx={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        {notifications.length === 0 && <Typography>No request yet.</Typography>}
        {notifications.length > 0 &&
          notifications.map((notification) => (
            <Stack
              key={notification._id}
              direction="row"
              justifyContent="space-between"
            >
              <Stack direction="row">
                <Link
                  color="primary"
                  href={`/user/${notification.fromUser._id}`}
                  sx={{ mr: 1 }}
                >
                  {notification.fromUser.username}
                </Link>
                is awaiting your approval to be{" "}
                {notification.messageSubject === 0 ? "buyer" : "seller"}
              </Stack>
              <Stack direction="row">
                <Button onClick={() => handleApprove(notification)}>
                  <GppGood />
                </Button>
                <Button onClick={() => handleDecline(notification)}>
                  <GppBad />
                </Button>
              </Stack>
            </Stack>
          ))}
      </Paper>
    </>
  );
}
