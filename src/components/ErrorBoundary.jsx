import { Link } from "react-router-dom";

export default function ErrorBoundary() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-10 p-10 bg-black">
      <h1 className="text-red-600 text-4xl text-center">
        Oops! We are having some technical difficulties, please try again later!
      </h1>
      <Link
        to="/"
        className=" text-white text-xl py-2 px-4 rounded-full border-[4px] border-double border-red-600"
      >
        Go Home!
      </Link>
    </div>
  );
}
