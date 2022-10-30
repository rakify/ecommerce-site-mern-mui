import {
  Inventory2,
  DashboardSharp,
  People,
  BarChart,
  ShoppingCart,
  Reviews,
  AddBox,
  Category,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Orders from "../components/Orders";
import { getProducts, getUsers } from "../redux/apiCalls";
import { useEffect, useState } from "react";
import Users from "../components/Users";
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import UserList from "../components/UserList";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import OrderList from "../components/OrderList";
import Notification from "../components/Notification";
import CatList from "../components/CatList";

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nowShowing, setNowShowing] = useState("");
  const [open, setOpen] = useState(false);
  const url = useLocation();

  //Control which screen is displaying
  useEffect(() => {
    url.pathname === "/"
      ? setNowShowing("")
      : setNowShowing(url.pathname[1].toUpperCase() + url.pathname.slice(2));
  }, [url]);

  //Control drawer open or close
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Get All Users
  useEffect(() => {
    getUsers(dispatch);
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {nowShowing === "" ? "Dashboard" : nowShowing}
            </Typography>

            {nowShowing === "" && <Notification />}

            {nowShowing === "Users" && (
              <Link href="/user" color="inherit" underline="hover">
                <Button variant="contained" startIcon={<AddBox />}>
                  Add New
                </Button>
              </Link>
            )}

            {nowShowing === "Products" && (
              <Link href="/product" color="inherit" underline="hover">
                <Button variant="contained" startIcon={<AddBox />}>
                  Add New
                </Button>
              </Link>
            )}
            {nowShowing === "Categories" && (
              <Link href="/category" color="inherit" underline="hover">
                <Button variant="contained" startIcon={<AddBox />}>
                  Add New
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton
              onClick={() => navigate("/")}
              selected={nowShowing === ""}
            >
              <ListItemIcon>
                <DashboardSharp />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/products")}
              selected={nowShowing === "Products"}
            >
              <ListItemIcon>
                <Inventory2 />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/users")}
              selected={nowShowing === "Users"}
            >
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/orders")}
              selected={nowShowing === "Orders"}
            >
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>

            <ListItemButton
              onClick={() => navigate("/categories")}
              selected={nowShowing === "Categories"}
            >
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>

            <ListItemButton
              onClick={() => navigate("/reviews")}
              selected={nowShowing === "Reviews"}
            >
              <ListItemIcon>
                <Reviews />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/reports")}
              selected={nowShowing === "Reports"}
            >
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </List>
        </Drawer>
        {nowShowing === "" ? (
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    {/* <Chart /> */}
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    {/* <Deposits /> */}
                  </Paper>
                </Grid>

                {/* Last 5 Users */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Users />
                  </Paper>
                </Grid>

                {/* Last 10 Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        ) : nowShowing === "Users" ? (
          <UserList />
        ) : nowShowing === "Products" ? (
          <ProductList />
        ) : nowShowing === "Orders" ? (
          <OrderList />
        ) : nowShowing === "Categories" ? (
          <CatList />
        ) : (
          <Container>
            <Typography sx={{ mt: 10 }} variant="h6">
              The page{" "}
              <span style={{ color: "red", textDecoration: "underline" }}>
                {nowShowing.toLowerCase()}
              </span>{" "}
              you are trying to access is not available yet... maybe there is
              some misspelling...
            </Typography>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}
