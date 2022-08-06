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
import { useEffect } from "react";
import Seller from "./pages/Seller";
import EditProduct from "./components/EditProduct";
import SellerOrders from "./pages/SellerOrders";
import RegisterSeller from "./pages/RegisterSeller";
import ToBeSeller from "./components/ToBeSeller";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser) || 0;

  //When theres user get cart and user info and any time check for latest products
  useEffect(() => {
    (user == 0 || user.accountType !== 1) && getProducts(dispatch);
    user && user.accountType === 1 && getProductsAsSeller(user.username, dispatch);
    user && getUser(user._id, dispatch);
    user && user.accountType !== 1 && getCartProducts(user._id, dispatch);
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            user.accountType === 1 ? (
              <Seller />
            ) : user.accountType === 2 ? (
              <ToBeSeller />
            ) : (
              <Home />
            )
          }
        />
        <Route
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
          path="/product/:id"
          element={
            user.accountType === 1 || user.accountType === 2 ? (
              <Navigate to="/" />
            ) : (
              <Product />
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
            !user || user.accountType === 1 || user.accountType === 2 ? (
              <Navigate to="/" />
            ) : (
              <Orders />
            )
          }
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
          path="/shop/:shopId"
          element={user.accountType !== 1 ? <Shop /> : <Navigate to="/" />}
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

      <Footer />
    </Router>
  );
};

export default App;
