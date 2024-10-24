import React from "react";
import Avatar from "./Avatar";

function Post({
  userId,
  picturePath,
  name,
  username,
  profilePicturePath,
  likes,
  comments,
  createdAt,
  text,
}) {
  return (
    <div className="flex items-start p-2 gap-1 ">
      <Avatar profilePhoto={profilePicturePath} userId={userId} />

      <div className="flex flex-col gap-1">
        <div className="flex gap-1 text-sm place-item-center ">
          <p className="font-semibold text-white">{name}</p>
          <p className=" text-gray-400  ">@{username}</p>
          <span className=" text-gray-400  ">20h</span>
        </div>
        <p className="mb-1">{text}</p>
        <img
          src={`http://localhost:1414/assets/${picturePath}`}
          className="rounded-2xl "
          alt="post"
        />
      </div>
    </div>
  );
}

export default Post;
