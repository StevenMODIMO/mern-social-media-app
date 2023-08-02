import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AiOutlineLike, AiOutlineDelete } from "react-icons/ai";

export default function Comment({ id, setPosts }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const postComment = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://mern-social-server-tfxx.onrender.com/app/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ comment }),
    });

    const json = await response.json();

    if (response.ok) {
      setComment("");
      setPosts(json);
    }
  };

  useEffect(() => {
    setDisabled(comment.trim().length === 0);
  }, [comment]);

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(`https://mern-social-server-tfxx.onrender.com/app/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setComments(json);
      }
    };
    getComments();
  }, [id]);

  const likeComment = async (comment_id) => {
    const response = await fetch(
      `https://mern-social-server-tfxx.onrender.com/app/like-comment/${id}/${comment_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setComments(json);
    } else {
      console.log(json.error);
    }
  };

  const deleteComment = async (comment_id) => {
    const response = await fetch(
      `https://mern-social-server-tfxx.onrender.com/app/delete-comment/${id}/${comment_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setComments(json);
    } else {
      console.log(json.error);
    }
  };

  return (
    <div className="m-1 bg-gray-100">
      <div>
        {comments.map((comment) => {
          return (
            <div key={comment._id} className="m-4 p-1 rounded">
              <header className="flex">
                <img
                  src={`https://mern-social-server-tfxx.onrender.com/username/${comment.commented_by}`}
                  className="h-10 rounded-full bg-gray-200 p-1"
                  alt="profile"
                />
                <h1 className="text-lg font-bold">{comment.commented_by}</h1>
              </header>
              <div className="flex justify-between">
                <h1>{comment.comment}</h1>
                <section className="flex gap-2 text-lg">
                  <AiOutlineLike onClick={() => likeComment(comment._id)} />
                  <AiOutlineDelete onClick={() => deleteComment(comment._id)} />
                </section>
              </div>
              <footer className="flex">
                <div>{comment.likes}</div>
                <div>Likes</div>
              </footer>
            </div>
          );  
        })}
      </div>
      <form onSubmit={postComment} className="flex items-center bg-white">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          className="p-2 m-1 rounded-lg outline-none w-60 bg-gray-100"
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
    </div>
  );
}
