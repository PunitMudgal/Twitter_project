import React from "react";
import defaultPhoto from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

function Avatar({ profilePhoto, userId }) {
  const navigate = useNavigate();

  return (
    <img
      onClick={() => navigate(`/home/${userId}`)}
      src={
        profilePhoto
          ? `http://localhost:1414/assets/${profilePhoto}`
          : defaultPhoto
      }
      alt="avatar"
      className="h-12 w-12 rounded-full object-cover cursor-pointer"
    />
  );
}

export default Avatar;
