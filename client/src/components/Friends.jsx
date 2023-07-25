import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Friends() {
  const [person, setPerson] = useState({});
  const [inputValue, setInputValue] = useState("");
  const { user } = useAuth();

  const getUser = async (name) => {
    const response = await fetch(`http://localhost:5000/app/${name}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json);
    } else {
      console.log(json.error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    getUser(inputValue);
  }, [inputValue]);

  return (
    <div className="pt-10 mt-5 h-screen">
      <form>
        <input
          type="text"
          value={inputValue}
          placeholder="Add tags"
          className="border p-2 m-1 rounded-lg outline-none w-72"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
