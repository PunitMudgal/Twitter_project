import React from "react";
import "../style/authenticationStyle.css";
import searchIcon from "../assets/search.svg";
import communitiesIcon from "../assets/communities.svg";
import chatIcon from "../assets/chat.svg";

// import {
//   SearchOutlined,
//   PeopleAltOutlined,
//   MarkUnreadChatAltOutlined,
// } from "@mui/icons-material";

function Authentication() {
  return (
    <div className="whole-background w-[67%] min-h-screen flex items-center justify-center sm:hidden">
      <div className="bg-logo-image md:bg-cover" />
      <div className="flex flex-col gap-10 bg-opacity-5 backdrop-blur-sm border border-blue-500 bg-gray-50 p-[3%] font-semibold shadow-md md:gap-5 rounded-lg">
        <h1 className="text-5xl max-w-xl font-style3 md:text-xl">
          See what's happening in the world right now
        </h1>
        <ul className="ml-10 text-xl flex flex-col gap-6 md:text-xs md:ml-5 ">
          <li className="flex items-center gap-5">
            <img className="h-10 invert w-auto" src={searchIcon} alt="search" />
            <span>Follow your interests.</span>
          </li>
          <li className="flex items-center gap-5">
            <img
              className="h-10 invert w-auto"
              src={communitiesIcon}
              alt="communiti icon"
            />
            <span>Hear what people are talking about.</span>
          </li>
          <li className="flex items-center gap-5">
            <img className="h-10 invert w-auto" src={chatIcon} alt="chat" />
            <span>Join the conversation.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Authentication;
