import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import TableRow from "@mui/material/TableRow";
import {
  Menu,
  Typography,
  IconButton,
  Button,
  Stack,
  Badge,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  deleteNotification,
  getNotifications,
  sendNotification,
  updateUser,
} from "../redux/apiCalls";
import { Campaign, GppBad, GppGood } from "@mui/icons-material";

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

export default function Notification() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getNotifications().then((res) => setNotifications(res.data));
  }, []);

  const handleApprove = (notification) => {
    const user = users.find((user) => user._id === notification.from._id);
    const updatedUser = {
      ...user,
      password: "",
      accountType: notification.messageSubject,
    };
    let newNotification = {
      from: { username: "Admin" },
      to: notification.from._id,
      messageSubject: notification.messageSubject === 0 ? 2 : 1 ? 3 : "",
    };
    updateUser(notification.from._id, updatedUser, dispatch).then((res) => {
      if (res.status === 200) {
        deleteNotification(notification._id).then(
          getNotifications().then((res) => {
            setNotifications(res.data);
            sendNotification(newNotification);
          })
        );
      }
    });
  };
  const handleDecline = (notification) => {
    const user = users.find((user) => user._id === notification.from._id);
    const updatedUser = {
      ...user,
      password: "",
      accountType: notification.messageSubject === 0 ? 1 : 0,
    };
    let newNotification = {
      from: { username: "Admin" },
      to: notification.from._id,
      messageSubject: notification.messageSubject === 0 ? 4 : 1 ? 5 : "",
    };
    updateUser(notification.from._id, updatedUser, dispatch).then((res) => {
      if (res.status === 200) {
        deleteNotification(notification._id).then(
          getNotifications().then((res) => {
            setNotifications(res.data);
            sendNotification(newNotification);
          })
        );
      }
    });
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ width: 30, height: 30 }}
      >
        <Badge badgeContent={notifications.length} color="success">
          <Campaign sx={{ color: "white" }} fontSize="large" />
        </Badge>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {notifications.length === 0 && (
          <Typography sx={{ ml: 2, mr: 2 }}>No more notifications.</Typography>
        )}
        {notifications.length > 0 &&
          notifications.map((notification) => (
            <Stack
              key={notification._id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ ml: 2, mr: 2 }}
            >
              <Stack direction="row">
                <Link
                  underline="none"
                  color="primary"
                  href={`/user/${notification.from._id}`}
                  sx={{ mr: 1 }}
                >
                  {notification.from.username}
                </Link>
                is awaiting your approval to be{" "}
                {notification.messageSubject === 0 ? "buyer." : "seller."}
              </Stack>
              <Stack direction="row" justifyContent="space-around">
                <IconButton
                  size="small"
                  onClick={() => handleApprove(notification)}
                >
                  <GppGood sx={{ color: "green" }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDecline(notification)}
                >
                  <GppBad sx={{ color: "red" }} />
                </IconButton>
              </Stack>
            </Stack>
          ))}
      </Menu>
    </>
  );
}
