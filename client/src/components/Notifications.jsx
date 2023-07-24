import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

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
      } else {
        console.log(json.error);
      }
    };
    getNotifications();
  }, []);
  return (
    <div className="pt-10 mt-5 h-screen">
      <h1 className="underline">Your Notifications</h1>
      <main>
        {notifications.map((not) => {
          const iso = not.createdAt;
          const date = new Date(iso).toLocaleDateString();
          const time = new Date(iso).toLocaleTimeString();

          return (
            <section className="font-bold m-2 bg-white rounded p-1">
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
            </section>
          );
        })}
      </main>
    </div>
  );
}
