import { useState } from "react";
import { AiOutlineHome, AiOutlineTags } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { BsBookmark, BsSearch } from "react-icons/bs";

export default function Home() {
  const [active, setActive] = useState(false);
  const handleIconClick = (icon) => {
    setActive(icon);
  };
  return (
    <div className="h-fit bg-gray-100 pt-16">
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

      <main className="pt-10 mt-5">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,
        </div>
      </main>
    </div>
  );
}
