import Cart from "./pages/user/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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
import { ShoppingBag } from "@mui/icons-material";
import Dashboard from "./pages/public/Dashboard";

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

      {!cartOpen && user.accountType !== 1 && (
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
            height: 90,
            bgcolor: "lightblue",
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

      {!cartOpen && user.accountType !== 1 && (
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
    </>
  );
};

export default App;
