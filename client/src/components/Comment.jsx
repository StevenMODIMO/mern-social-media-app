import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Comment({ id, setPosts }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const postComment = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/app/comment/${id}`, {
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
      const response = await fetch(`http://localhost:5000/app/comments/${id}`, {
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

  return (
    <div>
      <div>
        {comments.map((comment) => {
          return (
            <div key={comment._id}>
              <header className="flex">
                <img
                  src={`http://localhost:5000/username/${comment.commented_by}`}
                  className="h-10 rounded-full bg-gray-200 p-1"
                  alt="profile"
                />
                <h1 className="text-lg font-bold">{comment.commented_by}</h1>
              </header>
              <h1>{comment.comment}</h1>
            </div>
          );
        })}
      </div>
      <form onSubmit={postComment} className="flex items-center">
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
