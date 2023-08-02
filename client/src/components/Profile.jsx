export default function Profile({ id, profile, email, username, followers }) {
  return (
    <div
      className="fixed top-14 right-4 bg-white text-gray-800 p-4 rounded shadow-lg"
    >
      <img
        src={`https://mern-social-media-5u52.onrender.com/${profile}`}
        alt="Profile Image"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <div className="text-center">
        <h2 className="text-lg font-semibold">{username}</h2>
        <p className="text-sm text-gray-500">{email}</p>
        <p className="text-xs text-gray-500">{id}</p>
      </div>
      <div>
        <section className="flex mx-auto my-2 font-light gap-2 bg-gray-100 w-fit p-1 rounded m-1">
          <div className="font-light">Followers:</div>
          <h1>{followers.length}</h1>
        </section>
      </div>
    </div>
  );
}
