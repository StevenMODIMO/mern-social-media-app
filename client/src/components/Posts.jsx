import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import {
  AiOutlineFileImage,
  AiOutlineVideoCameraAdd,
  AiOutlineGif,
  AiOutlineLike,
  AiFillLike,
} from "react-icons/ai";
import { GoComment } from "react-icons/go";
import {
  BsEmojiSmile,
  BsThreeDots,
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import Comment from "./Comment";

export default function Posts() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [options, setOptions] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showCommentId, setShowCommentId] = useState(null);
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

  const likePost = async (id) => {
    const response = await fetch(`http://localhost:5000/app/like/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setPosts(json);
    }
  };

  const unlikePost = async (id) => {
    const response = await fetch(`http://localhost:5000/app/unlike/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setPosts(json);
    }
  };

  const savePost = async (id) => {
    const response = await fetch(`http://localhost:5000/app/save-post/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setPosts(json);
    }
  };

  

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

                <section className="flex justify-end gap-5">
                  <div>
                    {post.likes > 0 && (
                      <div
                        className="flex text-md gap-1"
                        onClick={() => unlikePost(post._id)}
                      >
                        <AiFillLike className="mt-1" />
                        <div>{post.likes}</div>
                      </div>
                    )}
                  </div>
                  {post.comments.length > 0 && (
                    <div className="flex text-md gap-1">
                      <p>{post.comments.length}</p>
                      <h1>Comments</h1>
                    </div>
                  )}
                  {post.saved > 0 && (
                    <div
                      className="flex text-md gap-1"
                    >
                      <BsBookmarkFill className="mt-1" />
                      <h1>{post.saved}</h1>
                    </div>
                  )}
                </section>

                <footer className="flex justify-around mt-4 p-1">
                  <div
                    className="flex text-md gap-1"
                    onClick={() => likePost(post._id)}
                  >
                    <AiOutlineLike className="mt-1" />
                    <div>Like</div>
                  </div>
                  <div
                    className="flex text-md gap-1"
                    onClick={() =>
                      setShowCommentId((prevId) =>
                        prevId === post._id ? null : post._id
                      )
                    }
                  >
                    <GoComment className="mt-1" />
                    <div>Comment</div>
                  </div>
                  <div
                    className="flex text-md gap-1"
                    onClick={() => savePost(post._id)}
                  >
                    <BsBookmark className="mt-1" />
                    <div>Save</div>
                  </div>
                  <div className="flex text-md gap-1"></div>
                </footer>

                {showCommentId === post._id && (
                  <Comment id={post._id} setPosts={setPosts} />
                )}
              </section>
            </div>
          );
        })}
      </main>
    </div>
  );
}
