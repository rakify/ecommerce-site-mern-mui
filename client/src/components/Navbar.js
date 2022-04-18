import {
  AccountCircle,
  Favorite,
  Inventory,
  LocalFlorist,
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
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#659dbd" }}>
      <StyledToolbar>
        <Typography
          variant="h4"
          sx={{ display: { xs: "none", sm: "block", color: "black" } }}
        >
          <Link href="/" underline="none" color="white">
            Better Buys
          </Link>
        </Typography>
        <LocalFlorist sx={{ display: { sm: "none", xs: "block" } }} />
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
                sx={{ width: 30, height: 30 }}
                src={user.img}
                onClick={(e) => setShowMenu(true)}
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

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={showMenu}
            onClose={(e) => setShowMenu(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ marginTop: 4 }}
          >
            <MenuItem sx={{ gap: 1 }}>
              <AccountCircle />
              Profile
            </MenuItem>
            <MenuItem sx={{ gap: 1 }}>
              <Inventory />
              Orders
            </MenuItem>
            <MenuItem sx={{ gap: 1 }}>
              <Favorite />
              Wishlist
            </MenuItem>
          </Menu>
          <Link href="/cart" underline="none" color="inherit">
            <Badge
              badgeContent={cart.products ? cart.products.length : 0}
              color="error"
            >
              <ShoppingCart sx={{ width: 30, height: 30 }} />
            </Badge>
          </Link>
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
