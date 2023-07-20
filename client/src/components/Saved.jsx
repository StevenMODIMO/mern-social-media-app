import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { BsBookmarkFill, BsThreeDots } from "react-icons/bs";

export default function Saved() {
  const { user } = useAuth();
  const [info, setInfo] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:5000/app", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setPosts(json);
      } else {
        console.log(json.error);
      }
    };
    getPosts();
  }, []);

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
        setInfo(json.saved_post);
      } else {
        console.log(json.error);
      }
    };
    getUserInfo();
  }, []);

  const unsavePost = async (id) => {
    const response = await fetch(
      `http://localhost:5000/app/unsave-post/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const newInfo = info.filter(info => info.post_id !== id)
    setInfo(newInfo)
  };

  return (
    <div className="pt-10 mt-5">
      <h1 className="underline">Saved posts</h1>

      <main>
        {info.length === 0 ? (
          <p>No saved posts yet.</p>
        ) : (
          posts
            .filter((post) => info.some((item) => item.post_id === post._id))
            .map((post) => (
              <div key={post._id}>
                <header className="flex justify-between p-2 border-b border-gray-300">
                  <div className="flex">
                    <img
                      src={`http://localhost:5000/username/${post.posted_by}`}
                      className="w-8 h-8 rounded-full"
                      alt="profile"
                    />
                    <h1 className="text-lg font-bold">{post.posted_by}</h1>
                  </div>
                <div className="flex gap-1" onClick={() => unsavePost(post._id)}>
                  <h1>Unsave</h1>
                <BsBookmarkFill className="mt-1" />
                </div>
                </header>
                <div className="m-1 rounded">
                  <h1 className="p-4">{post.post}</h1>
                  {post.post_image_url && (
                    <img
                      src={`http://localhost:5000/${post.post_image_url}`}
                      alt="Profile Image"
                      className="h-48 w-full rounded"
                    />
                  )}
                </div>
              </div>
            ))
        )}
      </main>
    </div>
  );
}
