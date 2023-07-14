import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, password }),
    });

    const json = await response.json();

    if (response.ok) {
      setName("");
      setPassword("");
      navigate("/");
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }

    if (!response.ok) {
      setName("");
      setPassword("");
      setError(json.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white rounded shadow p-6 flex flex-col"
        onSubmit={handleSubmission}
        onFocus={() => setError(null)}
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={name}
          className="mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
        {error && <div className="bg-red-500 p-2 mt-4 text-white rounded">{error}</div>}
      </form>
    </div>
  );
}
