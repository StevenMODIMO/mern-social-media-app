export default function Loader() {
  return (
    <button
      className="flex items-center justify-center w-full text-blue-500 h-96"
      disabled
    >
      <svg
        className="animate-spin h-20 w-20 mr-3 border-t-4 border-blue-900 rounded-full"
        viewBox="0 0 24 24"
      ></svg>
    </button>
  );
}
