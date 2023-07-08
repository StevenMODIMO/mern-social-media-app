export default function Home() {
    return (
        <div>
            <h1 className="text-center text-3xl">mern social media app</h1>
            <form className="flex flex-col">
                <label className="ml-12 m-2 underline">Create a Post</label>
                <input className="border border-blue-500 ml-12 rounded w-96 h-24" />
            </form>
        </div>
    )
}