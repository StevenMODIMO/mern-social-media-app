import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { BsBookmarkFill } from "react-icons/bs"

export default function Saved() {
    const { user } = useAuth()
    const [info, setInfo ] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
          const response = await fetch("http://localhost:5000/app", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
    
          const json = await response.json();
    
          if (response.ok) {
            setPosts(json);
          } else {
            console.log(json.error);
          }
        };
        getPosts();
      }, []);

    useEffect(() => {
        const getUserInfo = async () => {
            const response = await fetch(`http://localhost:5000/app/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if(response.ok) {
                setInfo(json.saved_post)
            } else {
                console.log(json.error)
            }
        }
        getUserInfo()
    }, [])

    const unsavePost = async (id) => {
        const response = await fetch(
          `http://localhost:5000/app/unsave-post/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
    
        const json = await response.json();
    
        if (response.ok) {
          
        }
      };


    return (
        <div className="pt-10 mt-5">
            <h1 className="underline">Saved posts</h1>

            <main>
                {info.map(info => {
                    return (
                        <div key={info._id}>
                            <div>{info.post_id}</div>
                            <BsBookmarkFill className="mt-1" />
                        </div>
                    )
                })}
            </main>
        </div>
    )
}