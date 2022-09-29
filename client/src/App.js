import Cart from "./pages/user/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartProducts,
  getProducts,
  getProductsAsSeller,
  getUser,
} from "./redux/apiCalls";
import { useEffect, useState } from "react";
import ToBeSeller from "./components/ToBeSeller";
import SellerDashboard from "./pages/seller/SellerDashboard";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Divider,
  Drawer,
  Fab,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Cancel, ShoppingBag } from "@mui/icons-material";
import Dashboard from "./pages/public/Dashboard";
import Footer from "./components/Footer";

const drawerWidth = 350;
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
                <Dashboard cartOpen={cartOpen} />
              )
            }
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
          <Route path="/products/:categoryName" element={<Dashboard />} />
          <Route path="/product/:productId" element={<Dashboard />} />
          <Route path="/:screen" element={<Dashboard />} />
        </Routes>
      </Router>

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
            width:50,
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
};

export default App;
