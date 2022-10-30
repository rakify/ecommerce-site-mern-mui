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
            z
          />
          <Route path="/products/:categoryName" element={<Dashboard />} />
          <Route path="/product/:productId" element={<Dashboard />} />
          <Route path="/:screen" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
