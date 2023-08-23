import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleSubmission = async (e) => {
    setLoading(true)
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
      setLoading(false)
    }

    if (!response.ok) {
      setName("");
      setEmail("");
      setPassword("");
      setImage("");
      setError(json.error);
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Alert />
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
        {loading ? <div className="bg-blue-500 text-white mx-auto rounded">
          <ProcessingButton />
        </div> :
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Submit
          </button>}
        {error && <div className="bg-red-500 p-2 mt-4 text-white rounded">{error}</div>}
      </form>
    </div>
  );
}

const ProcessingButton = () => {
  return (
    <button
      type="button"
      className="bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded"
      disabled
    >
      <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="blue"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="white"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm10 1.647A7.96 7.96 0 0120 12h-4c0 3.042-1.135 5.824-3 7.938l-3-1.647z"
        ></path>
      </svg>
    </button>
  );
};