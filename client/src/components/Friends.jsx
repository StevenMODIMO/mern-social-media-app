import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Friends() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [followers, setFollowers] = useState([]);
  const [activeTab, setActivetab] = useState(0);
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

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/app/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const json = await response.json();
          setFollowers(json.followers);
        } else {
          console.log("Failed to fetch followers:", response.status);
        }
      } catch (error) {
        console.log("Error occurred while fetching followers:", error);
      }
    };

    getFollowers();
  }, []);

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
      setUsers(json.followers);
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
        <div
          onClick={() => setActivetab(0)}
          className={
            activeTab === 0
              ? "bg-blue-500 text-white px-4 py-2 border-r w-full"
              : "px-4 py-2 w-full bg-white border border-blue"
          }
        >
          Find Friends
        </div>
        <div
          onClick={() => setActivetab(1)}
          className={
            activeTab === 1
              ? "bg-blue-500 text-white px-4 py-2 border-r w-full"
              : "px-4 py-2 w-full bg-white border border-blue"
          }
        >
          Followers
        </div>
      </header>

      {activeTab == 0 ? (
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
                    Follows You
                  </button>
                ) : (
                  <button
                    onClick={() => followUser(user.username)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Follow You
                  </button>
                )}
              </section>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <main>
            {followers.map((follower) => {
              return (
                <div key={follower._id} className="flex justify-between p-2 m-2">
                  <div className="flex mt-1">
                  <img
                      src={`http://localhost:5000/username/${follower.username}`}
                      className="w-8 h-8 rounded-full"
                      alt="profile"
                    />
                  <h1 className="text-lg font-bold">{follower.username}</h1>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Follow Back</button>
                </div>
              );
            })}
          </main>
        </div>
      )}
    </div>
  );
}
