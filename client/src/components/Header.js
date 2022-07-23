import { useLocation } from "react-router-dom";
import {
  AccountBalance,
  AccountCircle,
  AppRegistration,
  Favorite,
  Inventory,
  LocalFlorist,
  Login,
  LogoutSharp,
  Home,
  Person,
  ShoppingBag,
  SearchRounded,
  ShoppingCart,
  Store,
} from "@mui/icons-material";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Badge,
  Breadcrumbs,
  Chip,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, emphasize } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import Notification from "./Notification";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    cursor: "grab",
    fontSize: 10,
    height: theme.spacing(2.5),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize("#BBE1FA", 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
      cursor: "grabbing",
    },
  };
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
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 10,
}));

export default function Header() {
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector((state) => state.user.currentUser) || "";
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "#BBE1FA",
          height: 50,
          display: "flex",
          justifyContent: "center",
        }}
      >
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
          {user.accountType !== 1 && (
            <Link href="/orders/" underline="none" color="inherit">
              <MenuItem sx={{ gap: 1 }}>
                <Inventory />
                Orders
              </MenuItem>
            </Link>
          )}
          {user.accountType !== 1 && (
            <Link href="/wishlist/" underline="none" color="inherit">
              <MenuItem sx={{ gap: 1 }}>
                <Favorite />
                Wishlist
              </MenuItem>
            </Link>
          )}
          <MenuItem sx={{ gap: 1 }} onClick={() => logout()}>
            <LogoutSharp />
            Logout
          </MenuItem>
        </Menu>

        <StyledToolbar>
          <Stack direction="row" alignItems="center" sx={{ flex: 1 }}>
            <IconButton
              sx={{ display: { xs: "none", sm: "flex" } }}
              onClick={() => setMenuOpen(!menuOpen)}
              size="large"
              edge="start"
              aria-label="menu"
            >
              <MenuIcon fontSize="small" />
            </IconButton>
            {/* User is Seller */}
            {menuOpen && user.accountType === 1 && (
              <Breadcrumbs
                aria-label="breadcrumb"
                separator=""
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <StyledBreadcrumb
                  component={pathname.slice(1) === "" ? "" : "a"}
                  href="/"
                  label="Home"
                  icon={<Home fontSize="small" />}
                  sx={{
                    backgroundColor:
                      pathname.slice(1) !== "" ? "inherit" : "#BBE1FA",
                    pt: pathname.slice(1) === "" && 7,
                    pb: pathname.slice(1) === "" && 1.5,
                  }}
                />
                <StyledBreadcrumb
                  component={pathname.startsWith("/profile") ? "" : "a"}
                  href="/profile"
                  label="Profile"
                  icon={<Person fontSize="small" />}
                  sx={{
                    backgroundColor: pathname.startsWith("/profile")
                      ? "#BBE1FA"
                      : "inherit",
                    pt: pathname.startsWith("/profile") && 7,
                    pb: pathname.startsWith("/profile") && 1.5,
                  }}
                />
                <StyledBreadcrumb
                  component={pathname.startsWith("/seller/orders") ? "" : "a"}
                  href="/seller/orders"
                  label="Orders"
                  icon={<AccountBalance fontSize="small" />}
                  sx={{
                    backgroundColor: pathname.startsWith("/seller/orders")
                      ? "#BBE1FA"
                      : "inherit",
                    pt: pathname.startsWith("/seller/orders") && 7,
                    pb: pathname.startsWith("/seller/orders") && 1.5,
                  }}
                />
              </Breadcrumbs>
            )}
            {/* User is not seller */}
            {(user.accountType === 0 || user.accountType === 2) && menuOpen && (
              <Breadcrumbs
                aria-label="breadcrumb"
                separator=""
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <StyledBreadcrumb
                  component={pathname.slice(1) === "" ? "" : "a"}
                  href="/"
                  label="Home"
                  icon={<Home fontSize="small" />}
                  sx={{
                    backgroundColor:
                      pathname.slice(1) !== "" ? "inherit" : "#BBE1FA",
                    pt: pathname.slice(1) === "" && 7,
                    pb: pathname.slice(1) === "" && 1.5,
                  }}
                />
                <StyledBreadcrumb
                  component={pathname.startsWith("/profile") ? "" : "a"}
                  href="/profile"
                  label="Profile"
                  icon={<Person fontSize="small" />}
                  sx={{
                    backgroundColor: pathname.startsWith("/profile")
                      ? "#BBE1FA"
                      : "inherit",
                    pt: pathname.startsWith("/profile") && 7,
                    pb: pathname.startsWith("/profile") && 1.5,
                  }}
                />
                <StyledBreadcrumb
                  component={pathname.startsWith("/orders") ? "" : "a"}
                  href="/orders"
                  label="Orders"
                  icon={<AccountBalance fontSize="small" />}
                  sx={{
                    backgroundColor: pathname.startsWith("/orders")
                      ? "#BBE1FA"
                      : "inherit",
                    pt: pathname.startsWith("/orders") && 7,
                    pb: pathname.startsWith("/orders") && 1.5,
                  }}
                />
                <StyledBreadcrumb
                  component={pathname.startsWith("/cart") ? "" : "a"}
                  href="/cart"
                  label="Cart"
                  icon={<ShoppingBag fontSize="small" />}
                  sx={{
                    backgroundColor: pathname.startsWith("/cart")
                      ? "#BBE1FA"
                      : "inherit",
                    pt: pathname.startsWith("/cart") && 7,
                    pb: pathname.startsWith("/cart") && 1.5,
                  }}
                />
              </Breadcrumbs>
            )}
            {/* User is not registerd or logged in */}
            {menuOpen && !user && (
              <Breadcrumbs maxItems={4} aria-label="breadcrumb" separator="">
                <StyledBreadcrumb
                  component={pathname.startsWith("/login") ? "" : "a"}
                  href="/login"
                  label="Login"
                  icon={<Login fontSize="small" />}
                  sx={{
                    backgroundColor: pathname.startsWith("/login") && "inherit",
                  }}
                />
                <StyledBreadcrumb
                  component={pathname.startsWith("/register") ? "" : "a"}
                  href="/register"
                  label="Register"
                  icon={<AppRegistration fontSize="small" />}
                  sx={{
                    backgroundColor:
                      pathname.startsWith("/register") && "inherit",
                  }}
                />
                <StyledBreadcrumb
                  component={pathname.startsWith("/sell-online") ? "" : "a"}
                  href="/sell-online"
                  label="Start Selling"
                  icon={<AppRegistration fontSize="small" />}
                  sx={{
                    backgroundColor:
                      pathname.startsWith("/sell-online") && "inherit",
                  }}
                />
              </Breadcrumbs>
            )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ flex: 1 }}
          >
            <Link href="/" underline="none">
              <LocalFlorist sx={{ display: { sm: "none", xs: "block" } }} />
              <Typography
                variant="overline"
                sx={{ display: { xs: "none", sm: "block" }, color: "black" }}
              >
                Better Buys
              </Typography>
            </Link>
          </Stack>
          {/* <Search>
            <InputBase
              startAdornment={
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              }
              placeholder="Search for products..."
            ></InputBase>
          </Search> */}

          <Icons sx={{ flex: 1 }}>
            {user && (
              <Stack
                sx={{ width: 100, padding: 1 }}
                direction="row"
                justifyContent="space-between"
                divider={<Divider orientation="vertical" flexItem />}
              >
                {user.accountType !== 1 && (
                  <Link href="/cart/" underline="none" color="inherit">
                    <Badge
                      badgeContent={cart.products ? cart.products.length : 0}
                      color="error"
                    >
                      <ShoppingCart
                        sx={{ width: 20, height: 20, color: "black" }}
                      />
                    </Badge>
                  </Link>
                )}
                <Notification />
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  sx={{ width: 20, height: 20 }}
                >
                  <Avatar
                    alt="pic"
                    sx={{ width: 20, height: 20, cursor: "pointer" }}
                    src={user.img}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  ></Avatar>
                </StyledBadge>
              </Stack>
            )}{" "}
          </Icons>
        </StyledToolbar>
      </AppBar>
    </>
  );
}
