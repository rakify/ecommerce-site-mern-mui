import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import {
  getCartProducts,
  getProducts,
  getProductsAsSeller,
  getUser,
} from "./redux/apiCalls";
import { forwardRef, useEffect, useState } from "react";
import SellerOrders from "./pages/SellerOrders";
import RegisterSeller from "./pages/RegisterSeller";
import ToBeSeller from "./components/ToBeSeller";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import SellerDashboard from "./pages/SellerDashboard";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Fab,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Favorite, Inbox, Mail, ShoppingBag } from "@mui/icons-material";
import Dashboard from "./pages/Dashboard";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade direction="left" ref={ref} {...props} />;
});
const drawerWidth = 300;
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser) || 0;
  const cart = useSelector((state) => state.cart);

  const [cartOpen, setCartOpen] = useState(false);

  //When theres user get cart and user info and any time check for latest products
  useEffect(() => {
    (!user || user.accountType !== 1) && getProducts(dispatch);
    user &&
      user.accountType === 1 &&
      getProductsAsSeller(user.username, dispatch);
    user && getUser(user._id, dispatch);
    user && user.accountType !== 1 && getCartProducts(user._id, dispatch);
  }, [dispatch]);

  return (
    <>
      <Router>
        {/* {user.accountType !== 1 && <Header />} */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              user.accountType === 1 ? (
                <SellerDashboard />
              ) : user.accountType === 2 ? (
                <ToBeSeller />
              ) : (
                <Dashboard />
              )
            }
          />

          {/* <Route
            path="/products/:category"
            element={
              user.accountType === 1 || user.accountType === 2 ? (
                <Navigate to="/" />
              ) : (
                <ProductList />
              )
            }
          />
          <Route
            path="/cart"
            element={
              !user || user.accountType === 1 || user.accountType === 2 ? (
                <Navigate to="/" />
              ) : (
                <Cart />
              )
            }
          />
          <Route
            path="/wishlist"
            element={
              !user || user.accountType === 1 || user.accountType === 2 ? (
                <Navigate to="/" />
              ) : (
                <Wishlist />
              )
            }
          />
          <Route
            path="/checkout"
            element={
              !user || user.accountType === 1 || user.accountType === 2 ? (
                <Navigate to="/" />
              ) : (
                <Checkout />
              )
            }
          />
          <Route
            path="/orders"
            element={
              !user || user.accountType === 2 ? (
                <Navigate to="/" />
              ) : user.accountType === 1 ? (
                <SellerOrders />
              ) : (
                <Orders />
              )
            }
          />
          <Route
            path="/profile"
            element={user.accountType === 0 && <Profile />}
          /> */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/sell-online"
            element={user ? <Navigate to="/" /> : <RegisterSeller />}
          />

          <Route
            exact
            path="/seller/:screen"
            element={user.accountType === 1 && <SellerDashboard />}
          />
          <Route
            path="/shop/:shopName"
            element={user.accountType !== 1 && <Dashboard />}
          />
          <Route path="/products/:screen" element={<Dashboard />} />
          <Route path="/:screen" element={<Dashboard />} />
        </Routes>
      </Router>
      <Footer />

      {!cartOpen && (
        <Fab
          color="primary"
          aria-label="cart"
          variant="extended"
          sx={{
            display: { xs: "none", sm: "block" },
            position: "fixed",
            bottom: "50%",
            right: 16,
            borderRadius: "20px",
            height: 70,
          }}
          onClick={() => setCartOpen(true)}
        >
          <Stack alignItems="center">
            <ShoppingBag fontSize="large" />
            <Typography>{cart.products.length} Items</Typography>
            <Typography>৳ {cart.total}</Typography>
          </Stack>
        </Fab>
      )}

      {!cartOpen && (
        <Paper
          sx={{
            display: { xs: "block", sm: "none" },
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
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

      {cartOpen && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="right"
        >
          <Toolbar />
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Your Cart</Typography>
            <Button
              color="error"
              variant="outlined"
              onClick={() => setCartOpen(!cartOpen)}
            >
              Close
            </Button>
          </Stack>
          <Cart />
        </Drawer>
      )}

      {/* <Dialog
        TransitionComponent={Transition}
        open={cartOpen}
        scroll="paper"
        aria-labelledby="title"
      >
        <DialogActions>
          <Button onClick={() => setCartOpen(false)}>Cancel</Button>
        </DialogActions>
        <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
          Cart
        </DialogTitle>
        <DialogContent>
          <Cart />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" component="a" href="/checkout">
            CHECKOUT NOW
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default App;
