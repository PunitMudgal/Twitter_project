import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col h-screen">
        <div className=" max-w-[400px] text-center">
          <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
            404
          </h2>
          <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
            Oops! That page can’t be found
          </h4>
          <p className="mb-8 text-lg text-white">
            The page you are looking for it maybe deleted
          </p>
          <Link
            to={"/home"}
            className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-black"
          >
            Go To Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
