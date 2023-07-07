import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/signup" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
