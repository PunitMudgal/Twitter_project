import React, { useMemo } from "react";
import { truncateUsername } from "../../store/authSlice";
import tick from "../../assets/tick.png";
import Avatar from "../Avatar";
import toast from "react-hot-toast";
import { follow, unfollow } from "../../fetch/helper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFollowUnfollow from "../../store/useFollowUnfollow";

function FriendWidget({ _id, profilePicturePath, name, username, isAdmin }) {
  const currentUser = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const doesContain = currentUser.following.includes(_id);
  const { handleFollowUser, handleUnfollowUser } = useFollowUnfollow();

  return (
    <div className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ">
      <Avatar profilePhoto={profilePicturePath} userId={_id} />
      <div
        onClick={() => navigate(`/home/${_id}`)}
        className="flex flex-col cursor-pointer"
      >
        <p className="flex gap-1 items-center capitalize">
          {truncateUsername(name)}
          {isAdmin && <img src={tick} className="h-4 w-4" alt="purpletick" />}
        </p>
        <p className="text-gray2 text-xs">@{truncateUsername(username)}</p>
      </div>
      <button
        onClick={() => {
          if (doesContain) {
            handleUnfollowUser(_id);
          } else {
            handleFollowUser(_id);
          }
        }}
        className={`p-2 px-3 rounded-3xl ml-auto ${
          doesContain
            ? "border bg-transparent text-white hover:text-red-600 hover:border-red-600"
            : "text-black font-bold bg-white"
        }`}
      >
        {doesContain ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default FriendWidget;
