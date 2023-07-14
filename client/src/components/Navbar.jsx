import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi"
import { TfiWrite } from "react-icons/tfi"

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
    <div className="text-lg">
      <div className="flex justify-between">
        <Link to="/" className="flex">
          <BsPeople className="mt-1" />
          <div>mernSocial</div>
        </Link>
        {!user ? (
            <section className="flex gap-3">
              <div className="flex">
                <TfiWrite className="mt-1" />
                <Link to="/signup">Signup</Link>
              </div>
              <div className="flex">
                <BiLogInCircle className="mt-1" />
                <Link to="/login">Login</Link>
              </div>
            </section>
        ) : (
          <section className="flex gap-2">
            <div>
            <div>{user.person}</div>
            </div>
            <div className="flex">
            <BiLogOutCircle className="mt-1" />
            <button onClick={logout}>Logout</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
