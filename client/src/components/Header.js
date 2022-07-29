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
  KeyboardArrowDown,
  LoginRounded,
  AccountBox,
} from "@mui/icons-material";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  InputBase,
  Link,
  Menu,
  MenuItem,
  Paper,
  Slide,
  Stack,
  styled,
  Toolbar,
  Tooltip,
  tooltipClasses,
  Typography,
  Zoom,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import Notification from "./Notification";
import CategoryList from "./CategoryList";
import ShopList from "./ShopList";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Title = styled(Box)({
  display: "inline-block",
  overflow: "hidden",
  margin: "0 auto",
  whiteSpace: "nowrap",
  fontWeight: 800,
  fontSize: 20,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  animation: "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
  "@keyframes typing": {
    from: {
      width: 0,
    },
    to: {
      width: "100%",
    },
  },
  "@keyframes blink-caret": {
    "from, to": { borderColor: "transparent" },
    "50%": { borderColor: "orange" },
  },
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
  borderRadius: "10%",
  border: "3px solid white",
  width: "20%",
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "whitesmoke",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElShop, setAnchorElShop] = useState(null);
  const [anchorElCat, setAnchorElCat] = useState(null);
  const open = Boolean(anchorEl);
  const openCat = Boolean(anchorElCat);
  const openShop = Boolean(anchorElShop);

  const handleClick = (event) => {
    setAnchorElShop(null);
    setAnchorElCat(null);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCat = (event) => {
    setAnchorElShop(null);
    setAnchorEl(null);
    setAnchorElCat(event.currentTarget);
  };
  const handleCloseCat = () => {
    setAnchorElCat(null);
  };

  const handleClickShop = (event) => {
    setAnchorElCat(null);
    setAnchorEl(null);
    setAnchorElShop(event.currentTarget);
  };
  const handleCloseShop = () => {
    setAnchorElShop(null);
  };

  const user = useSelector((state) => state.user.currentUser) || "";
  const cart = useSelector((state) => state.cart);

  return (
    <>
      {/* <Typography
        sx={{
          bgcolor: "#082032",
          flex: 1,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Free Shipping on Orders Over ৳499*
      </Typography> */}
      <AppBar
        position="sticky"
        sx={{
          display: "flex",
          justifyContent: "center",
          flex: 2,
          mb: 2,
        }}
      >
        <StyledToolbar sx={{ bgcolor: "#E3FDFD", flex: 2 }}>
          {/* {user.accountType === 0 && (
            <Stack
              sx={{ flex: 1, fontSize: 10, gap: { sx: 0, sm: 2 } }}
              direction="row"
              alignItems="center"
              divider={<Divider />}
            >
              <Link
                underline="hover"
                sx={{
                  cursor: "grab",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-controls={openShop ? "shop-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openShop ? "true" : undefined}
                onClick={handleClickShop}
              >
                <Tooltip title="List of Shops">
                  <p>Shop</p>
                </Tooltip>
                <KeyboardArrowDown size="small" />
              </Link>
              <Link
                underline="hover"
                aria-controls={openCat ? "cat-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openCat ? "true" : undefined}
                onClick={handleClickCat}
                sx={{
                  cursor: "grab",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Tooltip title="List of Categories">
                  <p>Category</p>
                </Tooltip>
                <KeyboardArrowDown size="small" />
              </Link>
            </Stack>
          )} */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ flex: 1 }}
          >
            <Link href="/" underline="none">
              <LocalFlorist sx={{ display: { sm: "none", xs: "block" } }} />
              {/* <Typography
                variant="overline"
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: "black",
                  fontWeight: 1000,
                  fontSize: 25,
                }}
              > */}
              <Title sx={{ display: { sm: "block", xs: "none" } }}>
                Bettermart
              </Title>
              {/* </Typography> */}
            </Link>
          </Stack>
          <Search sx={{ flex: 3 }}>
            <InputBase fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              }
              placeholder="What are you looking for..."
            ></InputBase>
          </Search>

          {user === "" && (
            <>
              <Stack
                sx={{ width: 170, ml: 2, flex: 1 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <AccountBox color="primary" fontSize="large" />
                  <Stack direction="column" justifyContent="space-between">
                    <Link href="/login/" underline="hover">
                      <Tooltip title="Login" placement="left">
                        <p>Login</p>
                      </Tooltip>
                    </Link>
                    <Link href="/register/" underline="hover">
                      <Tooltip title="Register" placement="left">
                        <p>Register</p>
                      </Tooltip>
                    </Link>
                  </Stack>
                </Stack>
                <Link href="/sell-online" underline="hover">
                  <Tooltip title="Sell on Bettermart">
                    <p>Become Seller</p>
                  </Tooltip>
                </Link>
                <Link href="#" underline="none" color="inherit">
                  <Tooltip
                    title={
                      <>
                        <Typography variant="caption" sx={{ mt: 1.5 }}>
                          Please{" "}
                          <Link href="/login" sx={{ color: "#fff" }}>
                            Login
                          </Link>{" "}
                          first
                        </Typography>
                      </>
                    }
                  >
                    <Badge badgeContent={0} color="error">
                      <ShoppingCart
                        color="primary"
                        sx={{ width: 20, height: 20 }}
                      />
                    </Badge>
                  </Tooltip>
                </Link>
              </Stack>
            </>
          )}

          {user && (
            <Stack
              sx={{ width: 100, ml: 2 }}
              direction="row"
              justifyContent="space-between"
              divider={<Divider orientation="vertical" flexItem />}
            >
              {user.accountType === 0 && (
                <Link href="/cart/" underline="none" color="inherit">
                  <Tooltip title="Shopping Cart">
                    <Badge
                      badgeContent={cart.products ? cart.products.length : 0}
                      color="error"
                    >
                      <ShoppingCart
                        sx={{ width: 20, height: 20, color: "black" }}
                      />
                    </Badge>
                  </Tooltip>
                </Link>
              )}

              {user && <Notification />}
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
                  onMouseOver={handleClick}
                ></Avatar>
              </StyledBadge>
            </Stack>
          )}
        </StyledToolbar>

        {/* Menu on click shop */}
        <Menu
          marginThreshold={0}
          TransitionComponent={Zoom}
          transitionDuration={500}
          PaperProps={{
            style: {
              maxWidth: "100%",
              left: 0,
              right: 0,
            },
          }}
          id="shop-menu"
          anchorEl={anchorElShop}
          open={openShop}
          onClose={handleCloseShop}
          MenuListProps={{
            "aria-labelledby": "shop-button",
            onMouseLeave: handleCloseShop,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          sx={{ mt: 3 }}
        >
          <ShopList />
        </Menu>

        {/* Menu on click shop */}
        <Menu
          marginThreshold={0}
          TransitionComponent={Zoom}
          transitionDuration={500}
          PaperProps={{
            style: {
              maxWidth: "100%",
              left: 0,
              right: 0,
            },
          }}
          id="shop-menu"
          anchorEl={anchorElCat}
          open={openCat}
          onClose={handleCloseCat}
          MenuListProps={{
            "aria-labelledby": "cat-button",
            onMouseLeave: handleCloseCat,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          sx={{ mt: 3 }}
        >
          <CategoryList />
        </Menu>

        {/* Menu on click profile picture */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
            onMouseLeave: handleClose,
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AccountCircle />
            <Link href="/profile/" underline="none" color="inherit">
              Profile
            </Link>
          </MenuItem>
          {user.accountType === 0 && (
            <>
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Inventory />
                <Link href="/orders/" underline="none" color="inherit">
                  Orders
                </Link>
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Favorite />
                <Link href="/wishlist/" underline="none" color="inherit">
                  Wishlist
                </Link>
              </MenuItem>
            </>
          )}
          <Divider />
          <MenuItem
            onClick={() => logout()}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <LogoutSharp />
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    </>
  );
}
