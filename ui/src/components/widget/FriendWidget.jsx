import React from "react";
import { truncateUsername } from "../../store/authSlice";
import tick from "../../assets/tick.png";
import Avatar from "../Avatar";
import toast from "react-hot-toast";
import { follow, unfollow } from "../../fetch/helper";
import { useSelector } from "react-redux";

function FriendWidget({
  _id,
  profilePicturePath,
  name,
  username,
  isAdmin,
  currentUserFollowing,
  setSuggestedFriends,
  fetchFollowing,
}) {
  const token = useSelector((state) => state.auth?.token);
  const currentUser = useSelector((state) => state.auth?.user);

  // Follow
  const handleFollowUser = async (friendId) => {
    if (!currentUser?._id || !token) {
      return toast.error("User or token information is missing!");
    }
    try {
      const followPromise = follow(currentUser._id, friendId, token);
      toast.promise(followPromise, {
        loading: "Loading...",
        success: "Followed successfully",
        error: (err) => err.response?.data?.message,
      });
      // setSuggestedFriends((prev) =>
      //   prev.map((friend) =>
      //     friend._id === friendId
      //       ? { ...friend, _id, profilePicturePath, name, username, isAdmin }
      //       : friend
      //   )
      // );
      fetchFollowing();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // unfollow
  const handleUnfollowUser = async (friendId) => {
    if (!currentUser?._id || !token) {
      return toast.error("User or token information is missing!");
    }
    try {
      const unfollowPromise = unfollow(currentUser._id, friendId, token);
      await toast.promise(unfollowPromise, {
        loading: "Loading...",
        success: "Unfollowed successfully",
        error: (err) => err.response?.data?.message,
      });
      // setSuggestedFriends((prev) =>
      //   prev.map((friend) =>
      //     friend._id === friendId ? { ...friend, isFollowing: false } : friend
      //   )
      // );
      fetchFollowing();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ">
      <Avatar profilePhoto={profilePicturePath} userId={_id} />
      <div className="flex flex-col">
        <p className="flex gap-1 items-center capitalize">
          {truncateUsername(name)}
          {isAdmin && <img src={tick} className="h-4 w-4" alt="purpletick" />}
        </p>
        <p className="text-gray2 text-xs">@{truncateUsername(username)}</p>
      </div>
      <button
        onClick={() => {
          if (currentUserFollowing.includes(_id)) {
            handleUnfollowUser(_id);
          } else {
            handleFollowUser(_id);
          }
        }}
        className={`p-2 px-3 rounded-3xl ml-auto ${
          currentUserFollowing.includes(_id)
            ? "border bg-transparent text-white hover:text-red-600 hover:border-red-600"
            : "text-black font-bold bg-white"
        }`}
      >
        {currentUserFollowing.includes(_id) ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default FriendWidget;
