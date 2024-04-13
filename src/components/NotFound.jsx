import { Link } from "react-router-dom";

// ToDO finish this
export default function NotFound() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-10 p-10 bg-black">
      <h1 className="text-red-600 text-5xl text-center">
        The route you are searching for does not exist!
      </h1>
      <Link
        to="/"
        className="text-white text-xl py-2 px-4 rounded-full border-[4px] border-double border-red-600"
      >
        Go Home!
      </Link>
    </div>
  );
}
