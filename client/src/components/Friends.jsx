import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export default function Friends() {
  const [person, setPerson] = useState([]);
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/app/users`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setUsers(json);
        setLoading(false);
      } else {
        console.log(json.error);
      }
    };
    getUsers();
  }, [user]); // Add 'user' as a dependency to refresh the users when the current user changes

  const getUser = async (name) => {
    setLoading(true);
    setInputValue(name);
    if (name.trim() !== "") {
      const response = await fetch(`http://localhost:5000/app/${name}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setPerson(json);
        setLoading(false);
      } else {
        console.log(json.error);
      }
    } else {
      setPerson([]);
    }
  };

  const handleInputChange = (event) => {
    getUser(event.target.value);
  };

  const filteredUsers = users.filter((u) => u.username !== user.person);
  const filterPeople = person.filter((u) => u.username !== user.person);

  useEffect(() => {
    inputValue.trim() === "" && setLoading(false)
  })

  return (
    <div className="pt-10 mt-5 h-screen">
      <form>
        <input
          type="text"
          value={inputValue}
          placeholder="Search for friends"
          className="border p-2 m-1 rounded-lg outline-none w-80"
          onChange={handleInputChange}
        />
      </form>

      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <section>
          <div className="mt-5">
            {filterPeople.map((p) => (
              <div
                key={p._id}
                className="bg-gray-100 p-4 m-2 flex rounded-lg shadow-md"
              >
                <img
                  src={`http://localhost:5000/${p.image_path}`}
                  alt="Profile Image"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <h2 className="text-xl font-bold">{p.username}</h2>
              </div>
            ))}
          </div>

          {inputValue.trim() === "" && (
            <main className="mt-5">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-4 m-2 flex justify-between rounded-lg shadow-md"
                >
                  <header className="flex">
                    <img
                      src={`http://localhost:5000/${user.image_path}`}
                      alt="Profile Image"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <h1 className="text-xl font-bold">{user.username}</h1>
                  </header>
                  <button className="bg-blue-500 p-1 text-sm text-white rounded">
                    Follow
                  </button>
                </div>
              ))}
            </main>
          )}
        </section>
      )}
    </div>
  );
}
