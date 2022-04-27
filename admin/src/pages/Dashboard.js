import {
  Inventory2,
  DashboardSharp,
  People,
  Layers,
  BarChart,
  ShoppingCart,
  Reviews,
  AddBox,
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
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Orders from "../components/Orders";
import { getProducts, getUsers } from "../redux/apiCalls";
import { useEffect, useState } from "react";
import Users from "../components/Users";
import {
  Button,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import UserList from "./UserList";

const drawerWidth = 240;

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
  const [nowShowing, setNowShowing] = useState("Dashboard");
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  //Control WHats displaying
  const handleClick = (content) => {
    setNowShowing(content);
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
              {nowShowing}
            </Typography>
            
            {nowShowing === "Users" && (
              <Link href="/newUser" color="inherit" underline="hover">
                <Button variant="contained" startIcon={<AddBox />}>
                  Add New
                </Button>
              </Link>
            )}

            {nowShowing === "Products" && (
              <Link href="/newProduct" color="inherit" underline="hover">
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
            <ListItemButton onClick={() => handleClick("Dashboard")}>
              <ListItemIcon>
                <DashboardSharp />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("Products")}>
              <ListItemIcon>
                <Inventory2 />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("Users")}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("Orders")}>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("Reviews")}>
              <ListItemIcon>
                <Reviews />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("Reports")}>
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </List>
        </Drawer>
        {nowShowing === "Dashboard" ? (
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
        ) : (
          ""
        )}
      </Box>
    </ThemeProvider>
  );
}
