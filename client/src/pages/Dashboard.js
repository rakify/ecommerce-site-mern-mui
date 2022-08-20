import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Navbar from "../components/Navbar";
import Home from "./Home";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getCats, logout } from "../redux/apiCalls";
import Checkout from "./Checkout";
import Profile from "./Profile";
import Orders from "./Orders";
import {
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  InputBase,
  Link,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  AccountCircle,
  Cancel,
  Favorite,
  Inventory,
  LocalFlorist,
  LogoutSharp,
  SearchRounded,
  ShoppingCart,
  Whatshot,
} from "@mui/icons-material";
import ProductList from "./ProductList";
import Login from "./Login";
import Register from "./Register";
import RegisterSeller from "./RegisterSeller";
import { useSelector } from "react-redux";
import Wishlist from "./Wishlist";
import Shop from "./Shop";
import NotFoundPage from "./NotFoundPage";
import Product from "./Product";

const drawerWidth = 170;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),

    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [nowShowing, setNowShowing] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  document.title =
    nowShowing === "" ? "Bettermart" : nowShowing + " - Bettermart";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useSelector((state) => state.user.currentUser) || "";

  const screen = useParams().screen;
  const shopName = useParams().shopName;
  const categoryName = useParams().categoryName;
  const productId = useParams().productId;

  // console.log(productId, shopName, categoryName, screen);
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
  }, [screen, user, navigate]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ zIndex: theme.zIndex.drawer + 1 }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 1, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <Link
                href="/"
                underline="none"
                color="inherit"
                sx={{
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
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Navbar />
        </Drawer>
        <Toolbar />

        <Main open={open}>
          <DrawerHeader />

          {shopName ? (
            <Shop />
          ) : categoryName ? (
            <ProductList />
          ) : productId ? (
            <Product />
          ) : nowShowing === "" ? (
            <Home />
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
        </Main>
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
          <Link href="/profile/" underline="none" color="inherit">
            Your Profile
          </Link>
        </MenuItem>
        <Divider />
        {user.accountType === 0 && (
          <>
            <MenuItem>
              <Link href="/orders/" underline="none" color="inherit">
                Your Orders
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Link href="/wishlist/" underline="none" color="inherit">
                Your Wishlist
              </Link>
            </MenuItem>
            <Divider />
          </>
        )}
        <IconButton onClick={() => logout()}>
          <Tooltip title="Logout">
            <Typography>Logout</Typography>
          </Tooltip>
        </IconButton>
      </Menu>
    </>
  );
}
