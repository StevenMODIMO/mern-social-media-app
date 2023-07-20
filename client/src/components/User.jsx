import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function User() {
  const { user } = useAuth();
  const [info, setInfo] = useState({ followers: [] });

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
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
        setInfo(json);
        setFollowers(json.followers);
      } else {
        console.log(json.error);
      }
    };

    getUserInfo();
  }, []);
  return (
    <div className="pt-10 mt-5">
      <main>
        <div className="flex justify-center">
          <header>
            <img
              src={`http://localhost:5000/${info.image_path}`}
              alt="Profile Image"
              className="h-20 rounded-md mr-2"
            />
            <h1 className="text-2xl text-center">{user.person}</h1>
          </header>
        </div>
        <section className="font-light">
          <div className="flex gap-2 text-lg">
            <h1>Email:</h1>
            <div>{info.email}</div>
          </div>
          <div className="flex gap-2">
            <h1>User Id:</h1>
            <div>{info._id}</div>
          </div>
        </section>

        <section>
          <h1 className="text-center text-lg">Followers</h1>
          {Array.isArray(info.followers) &&
            info.followers.map((follower) => {
              return (
                <div key={follower.username}>
                  <header className="flex">
                    <img
                      src={`http://localhost:5000/username/${follower.username}`}
                      alt="Profile Image"
                      className="h-8 rounded-md mr-2"
                    />
                    <h1>{follower.username}</h1>
                  </header>
                </div>
              );
            })}
        </section>
      </main>
    </div>
  );
}
