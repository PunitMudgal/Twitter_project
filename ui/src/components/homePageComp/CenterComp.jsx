import React from "react";
import UploadWidget from "../widget/UploadWidget";
import spinner from "../../assets/spinner2.svg";

function CenterComp({ isLoading }) {
  return (
    <div className="col-span-5 flex-grow flex border-x border-purple-700 relative">
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
  );
}

export default CenterComp;
