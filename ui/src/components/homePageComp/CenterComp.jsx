import React from "react";
import UploadWidget from "../widget/UploadWidget";
import Loading from "../Loading";
import "../../style/profile.css";
import "../../index.css";
import CenterHeader from "../CenterHeader";

function CenterComp({ isLoading }) {
  return (
    <div className="col-span-5 flex-grow border-x  border-purple-700 relative flex flex-col overflow-x-hidden overflow-y-auto ">
      {/* header */}
      <CenterHeader button1="For You" button2="Following" />
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
