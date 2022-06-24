import {
  AccountCircle,
  Favorite,
  Inventory,
  LocalFlorist,
  LogoutSharp,
  SearchRounded,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  InputAdornment,
  InputBase,
  Link,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import Notification from "./Notification";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "20%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#659dbd" }}>
      {/* Menu on click of profile picture */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ marginTop: 4 }}
      >
        <Link href="/profile/" underline="none" color="inherit">
          <MenuItem sx={{ gap: 1 }}>
            <AccountCircle />
            Profile
          </MenuItem>
        </Link>
        <Link href="/orders/" underline="none" color="inherit">
          <MenuItem sx={{ gap: 1 }}>
            <Inventory />
            Orders
          </MenuItem>
        </Link>
        <Link href="/wishlist/" underline="none" color="inherit">
          <MenuItem sx={{ gap: 1 }}>
            <Favorite />
            Wishlist
          </MenuItem>
        </Link>
        <MenuItem sx={{ gap: 1 }} onClick={() => logout()}>
          <LogoutSharp />
          Logout
        </MenuItem>
      </Menu>

      <StyledToolbar>
        <Link
          href="/"
          underline="none"
          color="white"
          xs={{ cursor: "pointer" }}
        >
          <LocalFlorist sx={{ display: { sm: "none", xs: "block" } }} />
          <Typography
            variant="h4"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Better Buys
          </Typography>
        </Link>
        <Search>
          <InputBase
            startAdornment={
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            }
            placeholder="Search for products..."
          ></InputBase>
        </Search>
        <Icons>
          {user ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="pic"
                sx={{ width: 30, height: 30, cursor: "pointer" }}
                src={user.img}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              ></Avatar>
            </StyledBadge>
          ) : (
            <Typography sx={{ display: "flex", gap: 1 }}>
              <Link href="/login" underline="none" color="inherit">
                Login
              </Link>
              |
              <Link href="/register" underline="none" color="inherit">
                Register
              </Link>
            </Typography>
          )}

          <Link href="/cart/" underline="none" color="inherit">
            <Badge
              badgeContent={cart.products ? cart.products.length : 0}
              color="error"
            >
              <ShoppingCart sx={{ width: 30, height: 30 }} />
            </Badge>
          </Link>

          {user && <Notification />}
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
