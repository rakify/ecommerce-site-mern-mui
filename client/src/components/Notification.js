import { useState, useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import {
  Menu,
  Typography,
  IconButton,
  Button,
  Stack,
  Badge,
  Tooltip,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { deleteNotification, getNotifications } from "../redux/apiCalls";
import { Clear, Campaign, Notifications } from "@mui/icons-material";

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

  const handleRemove = (notification) => {
    deleteNotification(notification._id).then(
      getNotifications().then((res) => setNotifications(res.data))
    );
  };
  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {" "}
        <Tooltip title="Notifications">
            <Badge
              badgeContent={notifications.length}
              color="error"
              variant="dot"
            >
              <Notifications fontSize="small" />
            </Badge>
        </Tooltip>
      </IconButton>
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
              <Typography>
                {notification.messageSubject === 2
                  ? "Your request has been approved. You are now a buyer."
                  : 3
                  ? "Your request has been approved. You are now a seller."
                  : 4
                  ? "Your request has been declined. You can not become buyer now."
                  : "Your request has been declined. You can not become seller now."}
              </Typography>
              <Stack direction="row" justifyContent="space-around">
                <IconButton
                  size="small"
                  onClick={() => handleRemove(notification)}
                >
                  <Clear sx={{ color: "red" }} />
                </IconButton>
              </Stack>
            </Stack>
          ))}
      </Menu>
    </>
  );
}
