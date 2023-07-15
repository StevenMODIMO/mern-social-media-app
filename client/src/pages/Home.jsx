import { useState } from "react";
import { AiOutlineHome, AiOutlineTags } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { BsBookmark, BsSearch } from "react-icons/bs";
import Posts from "../components/Posts";
import Friends from "../components/Friends";
import Notifications from "../components/Notifications";
import Tags from "../components/Tags";
import Search from "../components/Search";
import Saved from "../components/Saved";

export default function Home() {
  const [active, setActive] = useState("home");
  const handleIconClick = (icon) => {
    setActive(icon);
  };
  return (
    <div className="h-screen bg-gray-100 pt-16">
      <header className="flex justify-around shadow-lg gap-1 pt-2 text-2xl bg-gray-500 fixed w-full text-white">
        <div
          onClick={() => handleIconClick("search")}
          className={
            active == "search"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1"
              : "w-12 flex justify-center pb-1"
          }
        >
          <BsSearch />
          <h1 className="hidden">Search</h1>
        </div>
        <div
          onClick={() => handleIconClick("home")}
          className={
            active == "home"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1"
              : "w-12 flex justify-center pb-1"
          }
        >
          <h1 className="hidden">Home</h1>
          <AiOutlineHome />
        </div>
        <div
          onClick={() => handleIconClick("friends")}
          className={
            active == "friends"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1"
              : "w-12 flex justify-center pb-1"
          }
        >
          <FaUserFriends />
          <h1 className="hidden">Friends</h1>
        </div>
        <div
          onClick={() => handleIconClick("notifications")}
          className={
            active == "notifications"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1"
              : "w-12 flex justify-center pb-1"
          }
        >
          <IoMdNotificationsOutline />
          <h1 className="hidden">Notifications</h1>
        </div>
        <div
          onClick={() => handleIconClick("saved")}
          className={
            active == "saved"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1"
              : "w-12 flex justify-center pb-1"
          }
        >
          <BsBookmark />
          <h1 className="hidden">Saved</h1>
        </div>
        <div
          onClick={() => handleIconClick("tags")}
          className={
            active == "tags"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1"
              : "w-12 flex justify-center pb-1"
          }
        >
          <AiOutlineTags />
          <h1 className="hidden">Tags</h1>
        </div>
      </header>

      <main>
        {active === "home" && <Posts />}
        {active === "search" && <Search />}
        {active === "friends" && <Friends />}
        {active === "notifications" && <Notifications />}
        {active === "saved" && <Saved />}
        {active === "tags" && <Tags />}
      </main>
    </div>
  );
}
