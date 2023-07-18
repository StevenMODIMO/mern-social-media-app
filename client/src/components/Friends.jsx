import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Friends() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await fetch(`http://localhost:5000/app/users`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      } else {
        console.log(json.error);
      }
    };

    getAllUsers();
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserName = currentUser ? currentUser.person : "";

  const filteredUsers = users.filter(
    (user) => user.username !== currentUserName
  );

  const followUser = async (username) => {
    const response = await fetch(
      `http://localhost:5000/app/follow/${username}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setUsers(json);
    }
  };

  const isFollowing = (username) => {
    const currentUserFollowing = users.some((user) =>
      user.followers.some((follower) => follower.username === username)
    );
    return currentUserFollowing;
  };
  

  return (
    <div className="pt-10 mt-5">
      <h1 className="text-center text-3xl font-semibold mb-5">
        Search and Follow Friends.
      </h1>

      <header className="flex">
        <div className="bg-blue-500 text-white px-4 py-2 border-r w-full">Find Friends</div>
        <div className="bg-blue-500 text-white px-4 py-2 border-l w-full">Following</div>
      </header>

      <div className="flex flex-col">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="flex justify-between border p-4 rounded-md mb-4"
          >
            <header className="flex items-center mb-2">
              <img
                src={`http://localhost:5000/${user.image_path}`}
                alt="Profile Image"
                className="w-10 h-10 rounded-full mr-2"
              />
              <h1 className="text-lg font-semibold">{user.username}</h1>
            </header>
            <section>
              {isFollowing(user.username) ? (
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Unfollow
                </button>
              ) : (
                <button
                onClick={() => followUser(user.username)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Follow
                </button>
              )}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
