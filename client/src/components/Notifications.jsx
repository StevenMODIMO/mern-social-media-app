import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { PiMarkerCircleDuotone } from "react-icons/pi";
import { BiRadioCircleMarked } from "react-icons/bi";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getNotifications = async () => {
      const response = await fetch(
        `http://localhost:5000/app/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setNotifications(json.notifications);
        console.log(json.notifications);
      } else {
        console.log(json.error);
      }
    };
    getNotifications();
  }, []);

  const markRead = async (id) => {
    const response = await fetch(`http://localhost:5000/app/read/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setNotifications(json.notifications);
    } else {
      console.log(json.error);
    }
  };

  return (
    <div className="pt-10 mt-5 h-screen">
      <h1 className="underline">Your Notifications</h1>
      <main>
        {notifications.map((not) => {
          const iso = not.createdAt;
          const date = new Date(iso).toLocaleDateString();
          const time = new Date(iso).toLocaleTimeString();
          return (
            <section
              key={not._id}
              className={
                not.read
                  ? "font-thin m-2 bg-white rounded p-1"
                  : "font-bold m-2 bg-white rounded p-1"
              }
            >
              <div>{not.title}</div>
              <div>{not.message}</div>
              <footer className="flex gap-1">
                <section className="flex gap-1">
                  <h1>On</h1>
                  <div>{date}</div>
                </section>
                <section className="flex gap-1">
                  <h1>At</h1>
                  <div>{time}</div>
                </section>
              </footer>
              {!not.read ? (
                <div
                  className="font-light flex justify-end cursor-pointer"
                  onClick={() => markRead(not._id)}
                >
                  <h1>Mark as Read</h1>
                  <PiMarkerCircleDuotone className="mt-1 text-lg" />
                </div>
              ) : (
                <div className="font-bold flex justify-end cursor-pointer">
                  <BiRadioCircleMarked className="mt-1 text-lg" />
                  <p>Read</p>
                </div>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
}
