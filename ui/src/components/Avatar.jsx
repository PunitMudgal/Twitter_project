import React from "react";
import defaultPhoto from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

function Avatar({ profilePhoto, userId, isContact }) {
  const navigate = useNavigate();

  return (
    <img
      onClick={() => !isContact && navigate(`/home/${userId}`)}
      src={profilePhoto || defaultPhoto}
      alt="avatar"
      className="h-12 w-12 rounded-full object-cover cursor-pointer"
    />
  );
}

export default Avatar;
