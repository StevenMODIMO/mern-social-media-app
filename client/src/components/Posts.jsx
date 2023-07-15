import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  AiOutlineFileImage,
  AiOutlineVideoCameraAdd,
  AiOutlineGif,
} from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

export default function Posts() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [options, setOptions] = useState(false);
  const { user } = useAuth();
  const toggleOptions = (event) => {
    setOptions(event.type === "focus");
  };

  useEffect(() => {
    setDisabled(post.trim().length === 0);
  }, [post]);
  const handlePost = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/app/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ post }),
    });

    const json = await response.json();

    if (response.ok) {
      setPost("");
    } else {
      console.log(json.error);
    }
  };

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

  return (
    <div className="pt-10 mt-2">
      <header>
        <form
          className="flex items-center"
          onSubmit={handlePost}
          onFocus={toggleOptions}
          onBlur={toggleOptions}
        >
          <input
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="p-2 m-1 rounded-lg outline-none w-80"
            placeholder="post something ..."
          />
          <button
            disabled={disabled}
            className={
              disabled
                ? "opacity-50 h-7 rounded-md m-1 p-1 text-sm border border-gray-500"
                : "bg-blue-500 h-7 rounded-md m-1 p-1 text-sm"
            }
          >
            Post
          </button>
        </form>
        <main className="flex text-3xl justify-around bg-white p-2 rounded-2xl m-2">
          <div>
            <input type="file" className="hidden" />
            <AiOutlineFileImage />
          </div>
          <div>
            <input type="file" className="hidden" />
            <AiOutlineVideoCameraAdd />
          </div>
          <div>
            <input type="file" className="hidden" />
            <BsEmojiSmile />
          </div>
          <div>
            <input type="file" className="hidden" />
            <GoLocation />
          </div>
          <div>
            <input type="file" className="hidden" />
            <AiOutlineGif />
          </div>
        </main>
      </header>

      <main>
        {posts.map((post) => {
          return (
            <div key={post._id}>
              <header>
                <h1>{post.posted_by}</h1>
                <h1>{post.post}</h1>
              </header>
            </div>
          );
        })}
      </main>
    </div>
  );
}
