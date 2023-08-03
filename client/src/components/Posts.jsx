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
import Loader from "./Loader";

export default function Posts() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [options, setOptions] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState("");
  const [tagList, setTagList] = useState([]);
  const [showCommentId, setShowCommentId] = useState(null);
  const [loading, setLoading] = useState(false);
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
    const t = tags.split(",").map((tag) => tag.trim());
    const formData = new FormData();
    formData.append("post", post);
    formData.append("tags", t);
    formData.append("post_image", fileInputRef.current.files[0]);

    const response = await fetch("https://mern-social-server-tfxx.onrender.com/app/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });

    const json = await response.json();

    if (response.ok) {
      setPosts(json);
      setPost("");
      setImagePreview(null);
    } else {
      console.log(json.error);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const response = await fetch("https://mern-social-server-tfxx.onrender.com/app", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setPosts(json);
        setLoading(false);
      } else {
        console.log(json.error);
      }
    };
    getPosts();
  }, []);

  const likePost = async (id) => {
    const response = await fetch(`https://mern-social-server-tfxx.onrender.com/app/like/${id}`, {
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
    const response = await fetch(`https://mern-social-server-tfxx.onrender.com/app/unlike/${id}`, {
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
    const response = await fetch(`https://mern-social-server-tfxx.onrender.com/app/save-post/${id}`, {
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

  const handleTagInputChange = (e) => {
    setTags(e.target.value);
    setTagList(e.target.value.split(",").map((tag) => tag.trim()));
  };

  return (
    <section className="pt-10 mt-2">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <header>
            <form
              className="flex items-center sm:justify-center"
              onSubmit={handlePost}
              onFocus={toggleOptions}
              onBlur={toggleOptions}
            >
              <input
                value={post}
                onChange={(e) => setPost(e.target.value)}
                className="p-2 m-1 rounded-lg outline-none w-80 sm:w-96"
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

            {!disabled && (
              <form>
                <label>
                  {tags && (
                    <div className="ml-6">
                      {tagList.map((tag, index) => (
                        <span
                          key={index}
                          className="m-1 px-3 py-1 text-xs bg-gray-300 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h1 className="text-start ml-6 font-light">
                    (separate by commas ","):
                  </h1>
                  <input
                    value={tags}
                    onChange={handleTagInputChange}
                    type="text"
                    placeholder="Add tags"
                    className="border p-2 m-1 rounded-lg outline-none w-72"
                  />
                </label>
              </form>
            )}

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="h-32 w-32 mx-auto  rounded"
              />
            )}

            <main className="flex text-3xl gap-3 bg-white p-2 rounded-2xl m-2">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result);
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    } else {
                      setImagePreview(null);
                    }
                  }}
                />
                <AiOutlineFileImage
                  onClick={() => fileInputRef.current.click()}
                />
              </div>
              <div>
                <input type="file" className="hidden" />
                <GoLocation />
              </div>
            </main>
          </header>

          <main className="mt-5 lg:ml-24 lg:w-96">
            {posts.map((post) => {
              const tags = post.tags;
              const strings = tags.join(tags);
              const tags_array = strings.split(",");
              return (
                <div key={post._id} className="bg-white rounded m-4">
                  <section>
                    <header className="flex justify-between p-2 border-b border-gray-300">
                      <div className="flex">
                        <img
                          src={`https://mern-social-server-tfxx.onrender.com/username/${post.posted_by}`}
                          className="w-8 h-8 rounded-full"
                          alt="profile"
                        />
                        <h1 className="text-lg font-bold">{post.posted_by}</h1>
                      </div>
                    </header>
                    <div className="m-1 rounded">
                      <h1 className="p-4">{post.post}</h1>
                      {post.post_image_url && (
                        <img
                          src={`https://mern-social-server-tfxx.onrender.com/${post.post_image_url}`}
                          alt="Profile Image"
                          className="h-56 w-full rounded"
                        />
                      )}
                    </div>

                    {post.tags.length > 0 && (
                      <section className="flex ml-4">
                        {tags_array.map((tag, index) => {
                          return (
                            <div key={index}>
                              <h1 className="m-1 px-3 py-1 text-xs bg-gray-300 rounded w-fit">
                                #{tag}
                              </h1>
                            </div>
                          );
                        })}
                      </section>
                    )}

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
                        <div className="flex text-md gap-1">
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
      )}
    </section>
  );
}
