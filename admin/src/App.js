import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import NewUser from "./pages/NewUser";
import Footer from "./components/Footer";
import EditUser from "./pages/EditUser";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Dashboard /> : <Login />} />
        <Route path="/users" element={user ? <UserList /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/newUser" element={user ? <NewUser /> : <Login />} />
        <Route path="/user/:userId" element={user ? <EditUser /> : <Login />} />
      </Routes>
      <Footer sx={{ pt: 4 }} />
    </BrowserRouter>
  );
}

export default App;
