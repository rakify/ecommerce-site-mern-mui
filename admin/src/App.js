import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import Footer from "./components/Footer";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import EditOrder from "./pages/EditOrder";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Dashboard /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route exact path="/user" element={user ? <AddUser /> : <Login />} />
        <Route path="/user/:userId" element={user ? <EditUser /> : <Login />} />
        <Route exact path="/product" element={user ? <AddProduct /> : <Login />} />
        <Route path="/product/:productId" element={user ? <EditProduct /> : <Login />} />
        <Route path="/order/:orderId" element={user ? <EditOrder /> : <Login />} />
        <Route exact path="/:screen" element={user ? <Dashboard /> : <Login />} />

      </Routes>
      <Footer sx={{ pt: 4 }} />
    </BrowserRouter>
  );
}

export default App;
