import React from "react";
import UploadWidget from "../widget/UploadWidget";
import Loading from "../Loading";
import "../../style/profile.css";
import "../../index.css";
import CenterHeader from "../CenterHeader";

function CenterComp({ isLoading }) {
  return (
    <>
      {/* header */}
      <CenterHeader button1="For You" button2="Following" />
      <UploadWidget />
      {isLoading ? <Loading /> : ""}

      <div className="flex flex-col m-2 space-y-4 "></div>
    </>
  );
}

export default CenterComp;
