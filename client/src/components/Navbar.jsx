import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const { dispatch, user } = useAuth();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  const toggleLinks = () => setShowLinks(!showLinks);
  const hideLinks = () => setShowLinks(false);
  return (
    <div className="flex justify-between m-3
    m-3 text-2xl">
      <div>
        <Link to="/">Home</Link>
      </div>
      <section className="flex">
        {!user ? (
          <section className="flex">
            <div className="m-3">
              <Link to="/signup">Signup</Link>
            </div>
            <div className="m-3">
              <Link to="/login">Login</Link>
            </div>
          </section>
        ) : (
          <section className="flex">
            <div className="m-3">{user.person}</div>
            <button onClick={logout}>Logout</button>
          </section>
        )}
      </section>
    </div>
  );
}
