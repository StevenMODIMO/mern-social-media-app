import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import {
  AiOutlineFileImage,
  AiOutlineVideoCameraAdd,
  AiOutlineGif,
  AiOutlineLike,
  AiFillLike,
} from "react-icons/ai";
import { GoComment } from "react-icons/go"
import { BsEmojiSmile, BsThreeDots, BsBookmark } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

export default function Posts() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [options, setOptions] = useState(false);
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const toggleOptions = (event) => {
    setOptions(event.type === "focus");
  };

  useEffect(() => {
    setDisabled(post.trim().length === 0);
  }, [post]);

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post", post);
    formData.append("post_image", fileInputRef.current.files[0]);

    const response = await fetch("http://localhost:5000/app/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
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
            <input ref={fileInputRef} type="file" className="hidden" />
            <AiOutlineFileImage onClick={() => fileInputRef.current.click()} />
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

      <main className="mt-5">
        {posts.map((post) => {
          return (
            <div key={post._id} className="bg-white rounded m-4">
              <section>
                <header className="flex justify-between p-2 border-b border-gray-300">
                  <div className="flex">
                    <img
                      src={`http://localhost:5000/username/${post.posted_by}`}
                      className="w-8 h-8 rounded-full"
                      alt="profile"
                    />
                    <h1 className="text-lg font-bold">{post.posted_by}</h1>
                  </div>
                  <BsThreeDots className="text-lg mt-1" />
                </header>

                <div className="m-1 rounded">
                  <h1 className="p-4">{post.post}</h1>
                  {post.post_image_url && (
                    <img
                      src={`http://localhost:5000/${post.post_image_url}`}
                      alt="Profile Image"
                      className="h-56 w-full rounded"
                    />
                  )}
                </div>
                <footer className="flex justify-around mt-4 p-1">
                  <div className="flex text-md gap-1">
                  <AiOutlineLike className="mt-1" />
                  <div>Like</div>
                  </div>
                  <div className="flex text-md gap-1">
                    <GoComment className="mt-1" />
                    <div>Comment</div>
                  </div>
                  <div className="flex text-md gap-1">
                    <BsBookmark className="mt-1" />
                    <div>Save</div>
                  </div>
                  <div className="flex text-md gap-1"></div>
                </footer>
              </section>
            </div>
          );
        })}
      </main>
    </div>
  );
}
