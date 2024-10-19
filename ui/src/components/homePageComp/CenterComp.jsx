import React from "react";
import UploadWidget from "../widget/UploadWidget";
import Loading from "../Loading";
import "../../style/profile.css";
import "../../index.css";

function CenterComp({ isLoading }) {
  return (
    <div className="col-span-5 flex-grow border-x  border-purple-700 relative flex flex-col overflow-x-hidden overflow-y-auto ">
      {/* header */}
      <div className="sticky w-full min-h-[48px] top-0 flex font-style2 self-center text-center text-lg text-gray1 border-b border-purple-950 backdrop-blur-md z-20 ">
        <button className="flex-1 hover:bg-violet-600 hover:bg-opacity-20">
          For You
        </button>
        <button className="flex-1 hover:bg-violet-600 hover:bg-opacity-20">
          Following
        </button>
      </div>
      <UploadWidget />
      {isLoading ? <Loading /> : ""}

      <div className="flex flex-col m-2 space-y-4 ">
        <div className="h-72 w-full bg-slate-800">post</div>
        <div className="h-72 w-full bg-slate-800">post</div>
        <div className="h-72 w-full bg-slate-800">post</div>
        <div className="h-72 w-full bg-slate-800">post</div>
        <div className="h-72 w-full bg-slate-800">post</div>
        <div className="h-72 w-full bg-slate-800">post</div>
        <div className="h-72 w-full bg-slate-800">post</div>
      </div>
    </div>
  );
}

export default CenterComp;
