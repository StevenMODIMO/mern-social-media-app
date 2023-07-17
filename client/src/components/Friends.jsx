import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export default function Friends() {
    const [users, setUsers] = useState([])
    const { user } = useAuth()

    useEffect(() => {
        const getAllUsers = async () => {
            const response = await fetch(`http://localhost:5000/app/`)
        }
    })
    return (
        <div className="pt-10 mt-5">
            <h1 className="underline">Friends You Follow</h1>
        </div>
    )
}