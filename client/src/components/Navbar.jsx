import { Link } from "react-router-dom"
import { useAuth  } from "../context/AuthContext"

export default function Navbar() {
    const { dispatch } = useAuth()
    const logout = () => {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      };
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <button onClick={logout}>Logout</button>
        </div>
    )
}