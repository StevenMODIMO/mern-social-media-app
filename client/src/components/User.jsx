import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { BsImage } from "react-icons/bs"

export default function User() {
  const { user } = useAuth();
  const [info, setInfo] = useState({ followers: [], saved_post: [] });

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
        <div className="flex justify-center relative">
          <header>
            <form className="absolute left-48 top-16">
            <label className="flex">
            <BsImage />
            <input type="file" className="hidden" />
            </label>
            </form>
            <img
              src={`http://localhost:5000/${info.image_path}`}
              alt="Profile Image"
              className="h-20 rounded-md mr-2"
            />
            <h1 className="text-2xl text-center">{user.person}</h1>
          </header>
        </div>
        <section className="font-thin m-2 text-sm flex flex-col items-center">
          <div className="flex gap-2">
            <h1>Email:</h1>
            <div>{info.email}</div>
          </div>
          <div className="flex gap-2">
            <h1>User Id:</h1>
            <div>{info._id}</div>
          </div>
        </section>

        <section>
          <div className="flex gap-1 mx-auto bg-white p-1 w-fit rounded">
            <h1>Saved Posts:</h1>
            <div>{info.saved_post.length}</div>
          </div>
        </section>

        <section className="mt-4">
          <header className="flex gap-2 m-2">
          <h1>Followers: </h1>
          <div>{info.followers.length}</div>
          </header>
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
