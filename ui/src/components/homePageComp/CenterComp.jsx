import React from "react";
import UploadWidget from "../widget/UploadWidget";
import spinner from "../../assets/spinner2.svg";

function CenterComp({ isLoading }) {
  return (
    <>
      <div className="col-span-5 flex-grow border-x border-purple-700 relative flex flex-col ">
        <div className="sticky w-full h-[48px] top-0 flex font-style2 self-center text-center text-lg text-gray1 border-purple-700 border-b ">
          <button className="flex-1 hover:bg-violet-600 hover:bg-opacity-20">
            For You
          </button>
          <button className="flex-1 hover:bg-violet-600 hover:bg-opacity-20">
            Following
          </button>
        </div>
        <UploadWidget />
        {isLoading ? (
          <img
            className="absolute top-32 left-[48%] h-12 w-auto p-1"
            src={spinner}
            alt="loader"
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default CenterComp;
