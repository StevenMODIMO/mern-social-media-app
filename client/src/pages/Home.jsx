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
    <div className="h-fit bg-gray-100 pt-16 lg:grid grid-cols-2">
      <header className="flex justify-around shadow-lg gap-1 pt-2 text-2xl bg-gray-500 fixed w-full text-white lg:justify-start lg:w-fit lg:flex-col lg:h-screen">
        <div
          onClick={() => handleIconClick("search")}
          className={
            active == "search"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <BsSearch className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Search</h1>
        </div>
        <div
          onClick={() => handleIconClick("home")}
          className={
            active == "home"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <AiOutlineHome className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Home</h1>
        </div>
        <div
          onClick={() => handleIconClick("friends")}
          className={
            active == "friends"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <FaUserFriends className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Friends</h1>
        </div>
        <div
          onClick={() => handleIconClick("notifications")}
          className={
            active == "notifications"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <IoMdNotificationsOutline className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Notifications</h1>
        </div>
        <div
          onClick={() => handleIconClick("saved")}
          className={
            active == "saved"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <BsBookmark className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Saved</h1>
        </div>
        <div
          onClick={() => handleIconClick("tags")}
          className={
            active == "tags"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <AiOutlineTags className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Tags</h1>
        </div>
      </header>

      <main className="lg:ml-72">
        {active === "home" && <Posts />}
        {active === "search" && <Search />}
        {active === "friends" && <Friends />}
        {active === "notifications" && <Notifications />}
        {active === "saved" && <Saved />}
        {active === "tags" && <Tags />}
      </main>

      <section className="hidden lg:block lg:fixed lg:right-0 lg:w-80 lg:bg-white lg:h-screen">
      <div
          onClick={() => handleIconClick("search")}
          className={
            active == "search"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <BsSearch className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Search</h1>
        </div>
        <div
          onClick={() => handleIconClick("home")}
          className={
            active == "home"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <AiOutlineHome className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Home</h1>
        </div>
        <div
          onClick={() => handleIconClick("friends")}
          className={
            active == "friends"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <FaUserFriends className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Friends</h1>
        </div>
        <div
          onClick={() => handleIconClick("notifications")}
          className={
            active == "notifications"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <IoMdNotificationsOutline className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Notifications</h1>
        </div>
        <div
          onClick={() => handleIconClick("saved")}
          className={
            active == "saved"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <BsBookmark className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Saved</h1>
        </div>
        <div
          onClick={() => handleIconClick("tags")}
          className={
            active == "tags"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <AiOutlineTags className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Tags</h1>
        </div>
      </section>
    </div>
  );
}
