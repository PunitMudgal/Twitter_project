import React from "react";
import Avatar from "../Avatar";
import {
  IoImageOutline,
  IoCalendarOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { MdGif } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
import { GrEmoji } from "react-icons/gr";

function UploadWidget() {
  return (
    <div className="p-4 border-b border-purple-700 w-full h-fit">
      <div className="flex gap-2 w-full items-center ">
        <Avatar className="flex-shrink-0 " />
        <input
          type="text"
          className="bg-transparent text-lg p-2 text-gray1 flex-grow "
          placeholder="What is happening?!"
        />
      </div>
      <div className="flex justify-between gap-5 pl-[3.4rem] pt-3  text-violet-400">
        <div className="flex gap-3 text-xl cursor-pointer">
          <IoImageOutline />
          <MdGif />
          <CgOptions />
          <GrEmoji />
          <IoCalendarOutline />
          <IoLocationOutline />
        </div>
        <button
          disabled
          className="bg-violet-500 text-gray-100 rounded-xl px-4 py-1 "
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default UploadWidget;
