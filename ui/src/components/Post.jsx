import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import { FcLike } from "react-icons/fc";
import { BiRepost, BiComment } from "react-icons/bi";
import { MdBarChart, MdOutlineReport, MdOutlineBlock } from "react-icons/md";
import { GoBookmark, GoHeart } from "react-icons/go";
import { RiShare2Line, RiDeleteBin6Line } from "react-icons/ri";
import FilledBookmark from "../assets/bookmarkYellow.png";
import Bookmark from "../assets/bookmark.png";
import { CgProfile } from "react-icons/cg";
import { SlOptions } from "react-icons/sl";
import { useSelector } from "react-redux";
import {
  bookmarkPost,
  deletePost,
  extractDate,
  formatTimeTo12Hour,
  likeUnlikePost,
} from "../fetch/helper";
import "../style/profile.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { selectUser } from "../store/authSlice";

function Post({
  _id,
  user,
  picturePath,
  likes: initialLikes,
  commentCount,
  createdAt,
  text,
  repostCount,
  posts,
  setPosts,
}) {
  const [menu, setMenu] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const menuRef = useRef(null);

  const Currentuser = useSelector(selectUser);

  const { _id: currentUserId, bookmark } = Currentuser;

  const isAdmin = useSelector((state) => state.auth?.user?.isAdmin);
  let isSelf = currentUserId === user?._id;

  const navigate = useNavigate();
  const isLiked = Boolean(likes[currentUserId]);
  const isBookmarked = Boolean(bookmark?.includes(_id));

  const likeUnlikeHandle = async () => {
    const { post } = await likeUnlikePost(_id, currentUserId);
    setLikes(post.likes);
  };

  const handleDelete = async () => {
    try {
      const deletePromise = deletePost(_id, currentUserId);
      await toast.promise(deletePromise, {
        loading: "Deleting Post...",
        success: "Post deleted",
        error: "Deletion Failed",
      });
      const newPosts = posts.filter((post) => post._id !== _id);
      setPosts(newPosts);
    } catch (error) {
      toast.error("Failed to delete post");
      console.log(error);
    }
  };

  const handleBookmark = async () => {
    try {
      const bookmarkPromise = bookmarkPost(_id);
      await toast.promise(bookmarkPromise, {
        loading: "Loading...",
        success: "Done",
        error: "Bookmark Failed",
      });
    } catch (error) {}
  };

  const menuList = [
    ...(isAdmin || isSelf
      ? [{ name: "Delete", icon: <RiDeleteBin6Line />, action: handleDelete }]
      : []),
    { name: "Profile", icon: <CgProfile />, action: null },
    { name: "Block", icon: <MdOutlineBlock />, action: null },
    { name: "View Engagement", icon: <MdBarChart />, action: null },
    {
      name: "Bookmark Post",
      icon: <GoBookmark />,
      action: null,
    },
    { name: "Report", icon: <MdOutlineReport />, action: null },
  ];

  const postBtn = [
    { count: commentCount, icon: <BiComment />, action: null },
    { count: repostCount, icon: <BiRepost />, action: null },
    {
      count: Object.keys(likes).length,
      icon: isLiked ? <FcLike /> : <GoHeart />,
      action: likeUnlikeHandle,
    },
    {
      count: Math.floor(Math.random() * 50) + 1,
      icon: <MdBarChart />,
      action: null,
    },
  ];

  const bookmarkIcon = isBookmarked ? FilledBookmark : Bookmark;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false); // Close the menu
      }
    };

    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex items-start px-2 py-1 gap-2 w-full ">
        <Avatar profilePhoto={user?.profilePicturePath} userId={user?._id} />

        <div className="flex flex-col gap-1 w-full justify-start">
          <div className="relative mt-1 flex gap-2 text-sm place-item-center ">
            <p className=" font-semibold text-white">{user?.name}</p>
            <p className=" text-gray-400  ">@{user?.username}</p>
            <span className=" text-gray-400  ">
              {" "}
              &bull;
              {formatTimeTo12Hour(createdAt)}
              &bull; {extractDate(createdAt)}
            </span>
            <SlOptions
              onClick={() => setMenu(!menu)}
              className="ml-auto text-2xl p-1 rounded-full hover:bg-gray-500 hover:bg-opacity-50 "
            />
            {menu && (
              <ul
                ref={menuRef}
                className="absolute top-4 right-1 p-2 rounded-xl bg-black bg-opacity-50 backdrop-blur-sm shadow-menu shadow-white space-y-4 text-lg "
              >
                {menuList.map((item) => (
                  <li
                    key={item.name}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={item.action}
                  >
                    {item.icon} {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="mb-1">{text}</p>
          {picturePath && (
            <img
              onClick={() =>
                navigate(`/${_id}/photo/${encodeURIComponent(picturePath)}`)
              }
              src={picturePath}
              className="self-start rounded-2xl object-cover max-h-[520px] w-auto cursor-pointer"
              alt="post"
            />
          )}

          {/* post buttons */}
          <div className="flex items-center justify-between text-xs mt-2 w-full ">
            {postBtn.map((btn, index) => (
              <span
                key={index}
                onClick={btn.action}
                className="flex items-center gap-1  text-xl cursor-pointer"
              >
                {btn.icon}
                <span className="text-xs text-gray-400">{btn.count}</span>
              </span>
            ))}

            <div className="flex items-center gap-2 text-xl cursor-pointer ">
              <img
                onClick={handleBookmark}
                src={bookmarkIcon}
                className="h-[17px] w-auto"
              />
              <RiShare2Line />
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Post;
