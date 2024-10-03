import React from "react";
import { useSelector } from "react-redux";
import backIcon from "../assets/next.svg";
import { Link } from "react-router-dom";
import tick from "../assets/tick.png";

function Profile() {
  const {
    name,
    username,
    email,
    profilePicturePath,
    coverPicture,
    follower,
    following,
    isAdmin,
    createdAt,
  } = useSelector((state) => state.auth.user) || {};

  return (
    <div className="col-span-5 flex-grow border-x border-purple-700 relative flex flex-col ">
      {/* header */}
      <div className="sticky bg-transparent backdrop-blur-md w-full h-[48px] top-0 flex font-style2 self-center text-center text-lg text-gray1 bg-slate-800 p-1 items-center gap-8">
        <Link to="/home">
          <img
            className="invert h-6 w-auto rotate-180"
            src={backIcon}
            alt="back"
          />
        </Link>
        <div className="text-start ">
          <p className="text-2xl flex items-center gap-1">
            {name}{" "}
            {isAdmin && (
              <img src={tick} className="h-5 w-auto" alt="purpletick" />
            )}{" "}
          </p>
          <p className="text-xs text-gray-400">114 posts</p>
        </div>
      </div>

      {/* main profile */}
      <div></div>
    </div>
  );
}

export default Profile;
