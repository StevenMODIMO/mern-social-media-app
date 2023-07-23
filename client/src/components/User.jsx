import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { BsImage, BsBookmarkFill } from "react-icons/bs";
import { AiFillLike, AiOutlineDelete } from "react-icons/ai";
import Loader from "./Loader"

export default function User() {
  const { user } = useAuth();
  const [info, setInfo] = useState({
    followers: [],
    saved_post: [],
    posts: [],
  });
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:5000/app", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setPosts(json);
        setLoading(false)
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
        setInfo(json);
        setFollowers(json.followers);
      } else {
        console.log(json.error);
      }
    };

    getUserInfo();
  }, []);

  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:5000/app/delete/${id}`, {
      method: "DELETE",
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

  const userPosts = info.posts.map((post) => post.post_id);
  const filtered = posts.filter((item) => userPosts.includes(item._id));
  console.log(filtered);
  return (
    <div className="pt-10 mt-5">
      {loading ? <Loader /> : <main>
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
          <div className="flex gap-1 mx-auto my-3 bg-white p-1 w-fit rounded">
            <h1>Created Posts:</h1>
            <div>{info.posts.length}</div>
          </div>
          <div className="flex gap-1 mx-auto my-3 bg-white p-1 w-fit rounded">
            <h1>Saved Posts:</h1>
            <div>{info.saved_post.length}</div>
          </div>
        </section>

        <section className="flex border-2 rounded">
          <div
            className={
              tab === 0
                ? "bg-blue-500 w-full p-1 rounded"
                : "w-full p-1 rounded"
            }
            onClick={() => setTab(0)}
          >
            Posts
          </div>
          <div
            className={
              tab === 1
                ? "bg-blue-500 w-full p-1 rounded"
                : "w-full p-1 rounded"
            }
            onClick={() => setTab(1)}
          >
            Followers
          </div>
        </section>

        {tab === 0 ? (
          <main>
            {filtered.map((post) => {
              return (
                <div key={post._id} className="bg-white rounded m-4 p-2">
                  <header
                    className="flex justify-end text-xl"
                    onClick={() => deletePost(post._id)}
                  >
                    <AiOutlineDelete />
                  </header>
                  <h1 className="p-4">{post.post}</h1>
                  {post.post_image_url && (
                    <img
                      src={`http://localhost:5000/${post.post_image_url}`}
                      alt="Profile Image"
                      className="h-44 w-44 mx-auto rounded"
                    />
                  )}
                  <section className="flex justify-end gap-5">
                    <div>
                      <div className="flex text-md gap-1">
                        <AiFillLike className="mt-1" />
                        <div>{post.likes}</div>
                      </div>
                    </div>
                    <div className="flex text-md gap-1">
                      <p>{post.comments.length}</p>
                      <h1>Comments</h1>
                    </div>
                    <div className="flex text-md gap-1">
                      <BsBookmarkFill className="mt-1" />
                      <h1>{post.saved}</h1>
                    </div>
                  </section>
                </div>
              );
            })}
          </main>
        ) : (
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
        )}
      </main>}
    </div>
  );
}
