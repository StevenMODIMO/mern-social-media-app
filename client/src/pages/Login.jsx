import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const { dispatch } = useAuth()
  const navigate = useNavigate()

  const handleSubmission = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username: name, password})
    })

    const json  = await response.json()

    if(response.ok) {
        setName("")
        setPassword("")
        navigate('/')
        localStorage.setItem("user", JSON.stringify(json))
        dispatch({ type: "LOGIN", payload: json });
    }

    if(!response.ok) {
        setName("")
        setPassword("")
        setError(json.error)
    }
   }
  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmission} onFocus={() => setError(null)}>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
    </div>
  );
}
