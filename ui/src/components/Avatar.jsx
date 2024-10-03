import React from "react";
import { Link } from "react-router-dom";
import defaultPhoto from "../assets/profile.png";
import { useSelector } from "react-redux";

function Avatar() {
  const { profilePicturePath, isAdmin } = useSelector(
    (state) => state.auth?.user || {}
  );
  let profile;
  return (
    <Link>
      <img
        src={
          profilePicturePath
            ? `http://localhost:1414/assets/${profilePicturePath}`
            : defaultPhoto
        }
        alt="avatar"
        className={`h-12 w-12 rounded-full object-cover ${
          isAdmin ? "border-2 border-[#FFD700]" : ""
        } `}
      />
    </Link>
  );
}

export default Avatar;
