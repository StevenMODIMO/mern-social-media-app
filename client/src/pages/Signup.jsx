import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", name);
    formData.append("email", email);
    formData.append("password", password);
    const response = await fetch("https://mern-social-server-tfxx.onrender.com/auth/signup", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    if (response.ok) {
      setName("");
      setEmail("");
      setPassword("");
      setImage("");
      navigate("/");
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }

    if (!response.ok) {
      setName("");
      setEmail("");
      setPassword("");
      setImage("");
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
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <input
          type="file"
          name="image"
          className="mb-4"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Username"
          value={name}
          className="mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          className="mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => setEmail(e.target.value)}
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
