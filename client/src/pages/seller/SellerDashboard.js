import {
  Inventory2,
  DashboardSharp,
  People,
  BarChart,
  ShoppingCart,
  Reviews,
  AddBox,
  Category,
  AccountBox,
  Person,
  Edit,
  Logout,
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
import { forwardRef, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../../components/Notification";
import ViewProfile from "../../components/ViewProfile";
import SellerOrders from "./SellerOrders";
import SellerProductList from "../../components/SellerProductList";
import EditProfile from "../../components/EditProfile";
import AddressBook from "../../components/AddressBook";
import AddProduct from "../../components/AddProduct";
import { logout } from "../../redux/apiCalls";

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

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade direction="left" ref={ref} {...props} />;
});

export default function SellerDashboard() {
  const dispatch = useDispatch();
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addressBookOpen, setAddressBookOpen] = useState(false);
  const navigate = useNavigate();
  const [nowShowing, setNowShowing] = useState("");
  const [open, setOpen] = useState(false);
  const url = useLocation().pathname;

  //Control which screen is displaying
  useEffect(() => {
    url === "/"
      ? setNowShowing("")
      : setNowShowing(url[8].toUpperCase() + url.slice(9));
  }, [url]);

  //console.log(nowShowing);
  //Control drawer open or close
  const toggleDrawer = () => {
    setOpen(!open);
  };

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

            {nowShowing === "" && (
              <>
                <IconButton onClick={() => logout()}>
                  <Tooltip title="Logout">
                    <Logout fontSize="small" />
                  </Tooltip>
                </IconButton>{" "}
                <Notification />
              </>
            )}

            {nowShowing === "Products" && (
              <Button
                variant="contained"
                startIcon={<AddBox />}
                onClick={() => setAddProductOpen(true)}
              >
                Add New
              </Button>
            )}
            {nowShowing === "Profile" && (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => setEditProfileOpen(true)}
              >
                Edit Profile
              </Button>
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
              onClick={() => navigate("/seller/products")}
              selected={nowShowing === "Products"}
            >
              <ListItemIcon>
                <Inventory2 />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/seller/profile")}
              selected={nowShowing === "Profile"}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/seller/orders")}
              selected={nowShowing === "Orders"}
            >
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Orders" />
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
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
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
                    A Chart describing orders followers growth will appear here
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
                    Latest Sells will appear here
                    {/* <Deposits /> */}
                  </Paper>
                </Grid>

                {/* Last 5 Users */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    Last 5 followers
                    {/* <Users /> */}
                  </Paper>
                </Grid>

                {/* Last 10 Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    Last 10 orders
                    {/* <Orders /> */}
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        ) : nowShowing === "Products" ? (
          <SellerProductList />
        ) : nowShowing === "Orders" ? (
          <SellerOrders />
        ) : nowShowing === "Profile" ? (
          <ViewProfile />
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

      <Dialog
        TransitionComponent={Transition}
        open={addProductOpen}
        scroll="paper"
        aria-labelledby="title"
      >
        <DialogActions>
          <Button onClick={() => setAddProductOpen(false)}>Cancel</Button>
        </DialogActions>
        <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
          Add New Product
        </DialogTitle>
        <DialogContent>
          <AddProduct />
        </DialogContent>
      </Dialog>

      <Dialog
        TransitionComponent={Transition}
        open={editProfileOpen}
        scroll="paper"
        aria-labelledby="title"
      >
        <DialogActions>
          <Button onClick={() => setEditProfileOpen(false)}>Cancel</Button>
        </DialogActions>
        <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
          Edit Profile
        </DialogTitle>
        <DialogContent>
          <EditProfile />
        </DialogContent>
      </Dialog>

      <Dialog
        TransitionComponent={Transition}
        open={addressBookOpen}
        scroll="paper"
        aria-labelledby="title"
      >
        <DialogActions>
          <Button onClick={() => setAddressBookOpen(false)}>Cancel</Button>
        </DialogActions>
        <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
          Address Book
        </DialogTitle>
        <DialogContent>
          <AddressBook />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
