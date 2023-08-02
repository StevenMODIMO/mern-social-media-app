import { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineTags, AiOutlineUser } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { BsBookmark, BsSearch } from "react-icons/bs";
import Posts from "../components/Posts";
import Friends from "../components/Friends";
import Notifications from "../components/Notifications";
import User from "../components/User";
import Saved from "../components/Saved";

export default function Home() {
  const [active, setActive] = useState("home");
  const handleIconClick = (icon) => {
    setActive(icon);
  };

  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=fe4b5037713746e3ade3de7ee741b4e7"
      );
      const json = await response.json();

      if (response.ok) {
        setNews(json.articles);
      } else {
        console.log(json.error);
      }
    };
    getNews();
  }, []);
  return (
    <div className="h-fit bg-gray-100 pt-16 lg:grid grid-cols-2">
      <header className="flex justify-around shadow-lg gap-1 pt-2 text-2xl z-10 bg-gray-500 fixed w-full text-white lg:justify-start lg:w-fit lg:flex-col lg:h-screen lg:text-lg">
        <div
          onClick={() => handleIconClick("search")}
          className={
            active == "search"
              ? "border-b-4 border-blue-500 w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:border-hidden lg:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
              : "w-12 flex justify-center pb-1 lg:w-64 lg:gap-2 lg:justify-start lg:cursor-pointer lg:hover:bg-gray-800 transition-all duration-500 ease-in-out lg:m-2 lg:p-2 lg:rounded-3xl"
          }
        >
          <AiOutlineUser className="lg:mt-1 lg:ml-2" />
          <h1 className="hidden lg:block">Profile</h1>
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
      </header>

      <main className="lg:ml-72">
        {active === "home" && <Posts />}
        {active === "search" && <User />}
        {active === "friends" && <Friends />}
        {active === "notifications" && <Notifications />}
        {active === "saved" && <Saved />}
      </main>

      <section className="hidden lg:block lg:fixed lg:right-0 lg:w-2/6 lg:bg-white lg:h-full lg:overflow-y-auto">
        <header className="flex justify-end font-bold text-2xl mr-2 fixed bg-white w-96">
          <h1>News and Articles</h1>
        </header>
        <main className="mt-12">
          {news.map((n) => (
            <div key={n.title} className="my-4">
              <header>
                <img
                  src={n.urlToImage}
                  alt={n.url}
                  className="w-full h-40 object-cover"
                />
              </header>
              <section className="p-4">
                <div className="mb-2">
                  <h1 className="font-bold text-lg">Author</h1>
                  <h1>{n.author}</h1>
                </div>
                <div>
                  <h1 className="font-bold text-lg">{n.title}</h1>
                  <p>{n.content}</p>
                </div>
                <footer>
                  <a
                    href={n.url}
                    target="_blank"
                    className="bg-blue-500 p-1 rounded text-white"
                  >
                    View Original Article
                  </a>
                </footer>
              </section>
            </div>
          ))}
        </main>
      </section>
    </div>
  );
}
