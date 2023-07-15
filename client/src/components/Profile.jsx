export default function Profile({ id, profile, email, username }) {
  return (
    <div className="absolute top-14 transition-all duration-150 ease-in-out right-4 bg-white text-gray-800 p-4 rounded shadow-lg z-20">
      <img
        src={`http://localhost:5000/${profile}`}
        alt="Profile Image"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <div className="text-center">
        <h2 className="text-lg font-semibold">{username}</h2>
        <p className="text-sm text-gray-500">{email}</p>
        <p className="text-xs text-gray-500">{id}</p>
      </div>
      <div className="mt-4 flex justify-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Edit Profile
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Delete Profile
        </button>
      </div>
    </div>
  );
}
