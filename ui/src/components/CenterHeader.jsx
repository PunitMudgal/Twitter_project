import React from "react";
import { useCenterRef } from "./CenterRefContext";

function CenterHeader({ button1, button2, activeTab, setActiveTab }) {
  const centerRef = useCenterRef();

  const handleScrollToTop = () => {
    centerRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="sticky w-full min-h-[48px] top-0 flex font-style2 self-center text-center text-lg text-gray1 border-b border-purple-950 backdrop-blur-md z-20 ">
      <button
        onClick={() => {
          handleScrollToTop();
          setActiveTab("For You");
        }}
        className={`${
          activeTab === "For You"
            ? "text-white underline underline-offset-8  "
            : ""
        } flex-1 hover:bg-violet-600 hover:bg-opacity-20`}
      >
        {button1}
      </button>
      <button
        onClick={() => {
          handleScrollToTop();
          setActiveTab("Following");
        }}
        className={`${
          activeTab === "Following"
            ? "text-white underline underline-offset-8 "
            : ""
        } flex-1 hover:bg-violet-600 hover:bg-opacity-20`}
      >
        {button2}
      </button>
    </div>
  );
}

export default CenterHeader;
