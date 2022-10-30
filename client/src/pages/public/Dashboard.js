import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "../../components/Navbar";
import Home from "./Home";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../redux/apiCalls";
import Checkout from "../user/Checkout";
import Profile from "../user/Profile";
import Orders from "../user/Orders";
import {
  AppBar,
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Fab,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Cancel,
  Logout,
  SearchRounded,
  ShoppingBag,
} from "@mui/icons-material";
import ProductList from "./ProductList";
import Login from "../public/Login";
import Register from "../public/Register";
import RegisterSeller from "../public/RegisterSeller";
import { useSelector } from "react-redux";
import Wishlist from "../user/Wishlist";
import Shop from "../public/Shop";
import NotFoundPage from "../public/NotFoundPage";
import Product from "../public/Product";
import ProductSearch from "./ProductSearch";
import Footer from "../../components/Footer";
import Cart from "../user/Cart";

const drawerWidth = 200;
const cartDrawerWidth = 350;
const transitionDuration = 1000;

const Search = styled("div")(({ theme }) => ({
  width: "40%",
  padding: "0 10px",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
}));

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

export default function Dashboard() {
  const cart = useSelector((state) => state.cart);

  const [cartOpen, setCartOpen] = useState(false);

  const theme = useTheme();
  const [nowShowing, setNowShowing] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState("");
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(!open);
  };

  document.title =
    nowShowing === ""
      ? "Bettermart - Online Shopping Mall"
      : nowShowing + " - Bettermart - Online Shopping Mall";

  const user = useSelector((state) => state.user.currentUser) || "";

  const screen = useParams().screen;
  const shopName = useParams().shopName;
  const categoryName = useParams().categoryName;
  const productId = useParams().productId;

  //Control which screen is displaying
  useEffect(() => {
    !screen
      ? setNowShowing("")
      : (screen === "login" ||
          screen === "register" ||
          screen === "sell-online") &&
        user !== ""
      ? navigate("/")
      : setNowShowing(screen[0].toUpperCase() + screen.slice(1));
  }, [navigate, screen, user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleMenuClick}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  gap: 1,
                }}
              >
                <Typography variant="h6">Bettermart</Typography>
              </Link>
            </Stack>
            <Search>
              <InputBase
                startAdornment={
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                }
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
              ></InputBase>
            </Search>

            {user === "" && (
              <Stack direction="column" justifyContent="space-between">
                <Button component="a" href="/login" color="inherit">
                  <Typography variant="overline">Sign In</Typography>
                </Button>
              </Stack>
            )}

            {user && (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{ width: 30, height: 30 }}
              >
                <Avatar
                  alt="pic"
                  sx={{ width: 30, height: 30, cursor: "pointer" }}
                  src={user.img}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  onMouseOver={handleClick}
                />
              </StyledBadge>
            )}
          </Toolbar>
        </AppBar>

        <Drawer
          variant="persistent"
          open={open}
          transitionDuration={{
            enter: transitionDuration,
            exit: transitionDuration,
          }}
          PaperProps={{
            sx: { width: drawerWidth },
          }}
          onClose={() => setOpen(!open)}
        >
          <Toolbar />
          <Navbar />
        </Drawer>
        <Box
          sx={{
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.easeInOut,
              duration: transitionDuration,
            }),
            marginLeft: open ? `${drawerWidth}px` : 0,
            marginRight: cartOpen ? "350px" : 0,
            width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
          }}
        >
          <Toolbar />
          {query !== "" ? (
            <ProductSearch query={query.toLowerCase().split(" ").join("-")} />
          ) : shopName ? (
            <Shop cartOpen={cartOpen} open={open} />
          ) : categoryName ? (
            <ProductList cartOpen={cartOpen} open={open} />
          ) : productId ? (
            <Product />
          ) : nowShowing === "" ? (
            <Home cartOpen={cartOpen} open={open} />
          ) : nowShowing === "Checkout" ? (
            <Checkout />
          ) : nowShowing === "Wishlist" ? (
            <Wishlist />
          ) : nowShowing === "Profile" ? (
            <Profile />
          ) : nowShowing === "Orders" ? (
            <Orders />
          ) : nowShowing === "Login" ? (
            <Login />
          ) : nowShowing === "Register" ? (
            <Register />
          ) : nowShowing === "Sell-online" ? (
            <RegisterSeller />
          ) : (
            <NotFoundPage />
          )}
        </Box>
      </Box>

      {/* Menu on click profile picture */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
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
        sx={{ pointer: "grab" }}
      >
        <MenuItem>
          <Link
            to="/profile"
            href="/profile/"
            style={{
              textDecoration: "none",
            }}
          >
            Your Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/orders"
            href="/orders/"
            style={{
              textDecoration: "none",
            }}
          >
            Your Orders
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/wishlist"
            style={{
              textDecoration: "none",
            }}
          >
            Your Wishlist
          </Link>
        </MenuItem>
        <Divider />
        <Button
          variant="text"
          sx={{ display: "flex", color: "red" }}
          onClick={() => logout()}
        >
          <Logout />
          Logout
        </Button>
      </Menu>

      {/* Pc or tab users cart */}
      {!cartOpen && user.accountType !== 1 && (
        <Fab
          color="primary"
          aria-label="cart"
          variant="extended"
          sx={{
            display: { xs: "none", md: "block" },
            position: "fixed",
            bottom: "50%",
            right: 0,
            height: 85,
            bgcolor: "transparent",
            color: "blue",
            opacity: 0.7,
            "&:hover": {
              opacity: 1,
              bgcolor: "transparent",
              height: 90,
              transition: "height 0.5s ease",
            },
          }}
          onClick={() => setCartOpen(true)}
        >
          <Stack alignItems="center" justifyContent="center">
            <ShoppingBag fontSize="large" />
            <Typography>{cart.products.length} Items</Typography>
            <Divider sx={{ width: "100%" }} />
            <Typography>৳ {cart.total}</Typography>
          </Stack>
        </Fab>
      )}

      {/* mobile users cart */}
      {!cartOpen && user.accountType !== 1 && (
        <Paper
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            bottom: "80%",
            right: 0,
            bgcolor: "transparent",
            color: "blue",
            width: 50,
            opacity: 0.7,
            "&:hover": {
              opacity: 1,
              transition: "opacity 1s ease",
            },
          }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label={`${cart.products.length} Items`}
              icon={<ShoppingBag color="primary" />}
              onClick={() => setCartOpen(true)}
            />
          </BottomNavigation>
        </Paper>
      )}

      {cartOpen && user.accountType !== 1 && (
        <Drawer
          sx={{
            width: cartDrawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: cartDrawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="right"
        >
          <Toolbar />
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="overline"
              sx={{
                display: "flex",
                flexDirection: "center",
                alignItems: "center",
                fontWeight: 700,
                fontSize: 18,
                gap: 1,
                fontFamily: "Brush Script MT, cursive",
                letterSpacing: ".2rem",
              }}
            >
              <ShoppingBag fontSize="large" /> {cart.products.length} Items
            </Typography>
            <Button
              color="error"
              variant="outlined"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <Cancel />
            </Button>
          </Stack>
          <Cart />
        </Drawer>
      )}
    </>
  );
}
