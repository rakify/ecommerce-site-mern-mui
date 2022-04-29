import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
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
import { getCartProducts, getProducts, getUser } from "./redux/apiCalls";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser?._id);

  //Even when theres no user available get products
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  //When theres user get cart and user info
  useEffect(() => {
    user && getUser(user, dispatch);
    user && getCartProducts(user, dispatch);
  });

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
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
      </Routes>
    </Router>
  );
};

export default App;
