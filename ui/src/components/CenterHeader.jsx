import React from "react";

function CenterHeader({ button1, button2, activeTab, setActiveTab }) {
  return (
    <div className="sticky w-full min-h-[48px] top-0 flex font-style2 self-center text-center text-lg text-gray1 border-b border-purple-950 backdrop-blur-md z-20 ">
      <button
        onClick={() => setActiveTab("follower")}
        className={`${
          activeTab === "follower"
            ? "text-white underline underline-offset-8  "
            : ""
        } flex-1 hover:bg-violet-600 hover:bg-opacity-20`}
      >
        {button1}
      </button>
      <button
        onClick={() => setActiveTab("following")}
        className={`${
          activeTab === "following"
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
