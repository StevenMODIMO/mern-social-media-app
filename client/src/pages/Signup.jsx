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
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    if (response.ok) {
      setName("");
      setEmail("");
      setPassword("");
      setImage("")
      navigate("/");
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }

    if (!response.ok) {
      setName("");
      setEmail("");
      setPassword("");
      setImage("")
      setError(json.error);
    }
  };
  return (
    <div>
      <main>
        <section></section>
        <form
          className="flex flex-col"
          onSubmit={handleSubmission}
          onFocus={() => setError(null)}
        >
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Submit</button>
          {error && <div className="bg-red-500 p-2 rounded">{error}</div>}
        </form>
      </main>
    </div>
  );
}
