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
  getSellerProducts,
  getUser,
} from "./redux/apiCalls";
import { useEffect } from "react";
import Seller from "./pages/Seller";
import EditProduct from "./components/EditProduct";
import SellerOrders from "./pages/SellerOrders";
import RegisterSeller from "./pages/RegisterSeller";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser) || 0;

  //When theres user get cart and user info and any time check for latest products
  useEffect(() => {
    getProducts(dispatch);
    user && getUser(user._id, dispatch);
    user && getCartProducts(user._id, dispatch);
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={user.accountType === 1 ? <Seller /> : <Home />}
        />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/wishlist"
          element={!user ? <Navigate to="/" /> : <Wishlist />}
        />
        <Route
          path="/checkout"
          element={!user ? <Navigate to="/" /> : <Checkout />}
        />
        <Route
          path="/orders"
          element={!user ? <Navigate to="/" /> : <Orders />}
        />
        <Route
          path="/profile"
          element={!user ? <Navigate to="/" /> : <Profile />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/seller/product/:productId"
          element={
            user.accountType === 1 ? <EditProduct /> : <Navigate to="/" />
          }
        />
        <Route
          path="/seller/orders/"
          element={
            user.accountType === 1 ? <SellerOrders /> : <Navigate to="/" />
          }
        />
        <Route
          path="/sell-online"
          element={user ? <Navigate to="/" /> : <RegisterSeller />}
        />
      </Routes>
    </Router>
  );
};

export default App;
