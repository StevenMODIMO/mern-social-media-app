import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Comment({ id, setPosts }) {
  const [comment, setComment] = useState("");
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
  return (
    <div>
      <div>
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
    </div>
  );
}
