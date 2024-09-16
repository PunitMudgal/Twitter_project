import React from "react";
import "../style/authenticationStyle.css";
import { FiSearch } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsChatLeftText } from "react-icons/bs";

function Authentication({ Elem }) {
  return (
    <div className="flex w-full h-full">
      <div className=" bg-sky-600 w-[67%] min-h-screen flex items-center justify-center sm:hidden">
        <div className="bg-logo-image md:bg-cover" />
        <div className="flex flex-col gap-10 bg-opacity-15 bg-sky-950 p-[3%] font-semibold shadow-md md:gap-5 rounded-lg">
          <h1 className="text-5xl max-w-xl font-style3 md:text-xl">
            See what's happening in the world right now
          </h1>
          <ul className="ml-10 text-xl flex flex-col gap-6 md:text-xs md:ml-5">
            <li className="flex items-center gap-5">
              <FiSearch size="55px" /> <span>Follow your interests.</span>
            </li>
            <li className="flex items-center gap-5">
              <HiOutlineUsers size="55px" />{" "}
              <span>Hear what people are talking about.</span>
            </li>
            <li className="flex items-center gap-5">
              <BsChatLeftText size="50px" /> <span>Join the conversation.</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-900 flex-grow">
        <Elem />
      </div>
    </div>
  );
}

export default Authentication;
