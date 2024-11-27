import React from "react";
import { useDispatch } from "react-redux";
import { removeCurrentFollowing, setAddCurrentFollowing } from "./authSlice";
import { follow, unfollow } from "../fetch/helper";
import toast from "react-hot-toast";
import { removeFollowing } from "./userSlice";

function useFollowUnfollow() {
  const dispatch = useDispatch();

  // follow
  const handleFollowUser = async (friendId) => {
    try {
      const followPromise = follow(friendId);
      toast.promise(followPromise, {
        loading: "Loading...",
        success: "Followed successfully",
        error: (error) => error.response?.data?.message || "An error occurred",
      });
      followPromise.then((data) => {
        // setFollowings((prev) => [...prev, data]);
        dispatch(setAddCurrentFollowing(data));
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in following");
    }
  };

  // unfollow
  const handleUnfollowUser = async (friendId) => {
    try {
      const unfollowPromise = unfollow(friendId);
      await toast.promise(unfollowPromise, {
        loading: "Loading...",
        success: "Unfollowed successfully",
        error: (err) => err.response?.data?.message,
      });
      unfollowPromise.then((data) => {
        dispatch(removeCurrentFollowing(data._id));
        dispatch(removeFollowing(data._id));
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in unfollowing");
    }
  };

  return { handleFollowUser, handleUnfollowUser };
}

export default useFollowUnfollow;
