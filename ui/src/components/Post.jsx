import React, { useState } from "react";
import Avatar from "./Avatar";
import { GoHeart } from "react-icons/go";
import { FcLike } from "react-icons/fc";
import { BiRepost } from "react-icons/bi";
import { BiComment, BiEditAlt } from "react-icons/bi";
import { MdBarChart } from "react-icons/md";
import { GoBookmark } from "react-icons/go";
import { RiShare2Line, RiDeleteBin6Line } from "react-icons/ri";
import { SlOptions } from "react-icons/sl";
import { useSelector } from "react-redux";
import { likeUnlikePost } from "../fetch/helper";

function Post({
  _id,
  userId,
  picturePath,
  name,
  username,
  profilePicturePath,
  likes: initialLikes,
  comments,
  createdAt,
  text,
}) {
  const [menu, setMenu] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const currentUserId = useSelector((state) => state.auth?.user?._id);
  let isSelf = currentUserId === userId;
  const token = localStorage.getItem("token");

  const isLiked = Boolean(likes[currentUserId]);

  const likeUnlikeHandle = async () => {
    const { post } = await likeUnlikePost(_id, currentUserId, token);
    setLikes(post.likes);
  };

  return (
    <div className="flex items-start p-2 gap-2 border-t border-gray-600 w-full ">
      <Avatar profilePhoto={profilePicturePath} userId={userId} />

      <div className="flex flex-col gap-1 w-full justify-start">
        <div className="relative mt-1 flex gap-2 text-sm place-item-center ">
          <p className=" font-semibold text-white">{name}</p>
          <p className=" text-gray-400  ">@{username}</p>
          <span className=" text-gray-400  ">20h</span>
          <SlOptions
            onClick={() => setMenu(!menu)}
            className="ml-auto text-2xl p-1 rounded-full hover:bg-gray-500 hover:bg-opacity-50 "
          />
          {menu && isSelf && (
            <div className="absolute top-4 right-1 p-2 rounded-xl bg-slate-950 shadow shadow-white flex flex-col gap-2 z-10">
              <p className="flex items-center gap-2 text-red-600 ">
                <RiDeleteBin6Line /> Delete{" "}
              </p>
              <p className="flex items-center gap-2">
                <BiEditAlt /> Edit{" "}
              </p>
            </div>
          )}
        </div>
        <p className="mb-1 font-style3  ">{text}</p>
        {picturePath && (
          <img
            src={`http://localhost:1414/assets/${picturePath}`}
            className="self-start rounded-2xl object-cover max-h-[520px] w-auto"
            alt="post"
          />
        )}
        <div className="flex items-center justify-between text-xs py-2 w-full ">
          <span className="flex items-center gap-1 text-gray-400">
            <BiComment className="text-xl text-gray-500" />
            37{" "}
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <BiRepost className="text-2xl text-gray-500" />
            20
          </span>
          <span
            onClick={likeUnlikeHandle}
            className="flex items-center gap-1 text-gray-400 cursor-pointer"
          >
            {isLiked ? (
              <FcLike className="text-xl text-gray-500" />
            ) : (
              <GoHeart className="text-xl text-gray-500" />
            )}
            {Object.keys(likes).length}
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <MdBarChart className="text-xl text-gray-500" />
            114
          </span>
          <div className="flex gap-2 text-xl ">
            <GoBookmark />
            <RiShare2Line />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
