import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { BiLogInCircle, BiDownArrow, BiLogOutCircle } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import Profile from "./Profile";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const { dispatch, user } = useAuth();
  const [profile, setProfile] = useState({});

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(
        `https://mern-social-server-tfxx.onrender.com/app/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setProfile(json);
      }
    };

    if (user) {
      getProfile();
    }
  }, [user]);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white z-50">
    {showProfile && (
      <Profile
        id={profile._id}
        profile={profile.image_path}
        email={profile.email}
        username={profile.username}
        followers={profile.followers}
      />
    )}
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-xl font-bold ml-2 sm:ml-3">
          <BsPeople className="mr-2" />
          <div>mernSocial</div>
        </Link>
        {!user ? (
          <section className="flex gap-3 mr-3 sm:mr-8">
            <div className="flex items-center">
              <TfiWrite className="mr-2" />
              <Link to="/signup">Signup</Link>
            </div>
            <div className="flex items-center">
              <BiLogInCircle className="mr-2" />
              <Link to="/login">Login</Link>
            </div>
          </section>
        ) : (
          <section className="flex gap-2 items-center sm:mr-4">
            <div className="flex items-center cursor-pointer">
              <img
                src={`https://mern-social-server-tfxx.onrender.com/${profile.image_path}`}
                alt="Profile Image"
                className="w-5 h-8 rounded-full mr-2"
              />
              <div >
                {user.person}
              </div>
            </div>
            <BiDownArrow onClick={() => setShowProfile(!showProfile)} />
            <div className="flex items-center mr-3 sm:mr-4">
              <AiOutlineLogout className="" />
              <button onClick={logout}>Logout</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
