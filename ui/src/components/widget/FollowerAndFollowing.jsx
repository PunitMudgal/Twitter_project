import React, { useEffect, useState } from "react";
import CenterHeader from "../CenterHeader";
import tick from "../../assets/tick.png";
import { useDispatch, useSelector } from "react-redux";
import backIcon from "../../assets/next.svg";
import { useNavigate, useParams } from "react-router-dom";
import { getAllFollower, getAllFollowing } from "../../fetch/helper";
import { setFollower, setFollowing } from "../../store/authSlice";
import toast from "react-hot-toast";
import FriendWidget from "./FriendWidget";

function FollowerAndFollowing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth?.user);
  const { name, username, isAdmin, following, follower } =
    useSelector((state) => state.auth.friendProfile) || {};
  const token = useSelector((state) => state.auth?.token);
  const followings = useSelector((state) => state.auth.following) || {};
  const followers = useSelector((state) => state.auth.follower) || {};

  const [activeTab, setActiveTab] = useState("following");

  /** Fetch Following */
  const fetchFollowing = async () => {
    try {
      const data = await getAllFollowing(following, token);
      dispatch(setFollowing(data));
    } catch (error) {
      toast.error("Error fetching following:", error);
    }
  };

  useEffect(() => {
    if (following?.length && token) {
      fetchFollowing(); // Call the async function
    }
  }, [following]);

  /** Fetch Followers */
  const fetchFollowers = async () => {
    try {
      const data = await getAllFollower(follower, token);
      dispatch(setFollower(data));
    } catch (error) {
      toast.error("Error fetching followers:", error);
    }
  };

  useEffect(() => {
    if (follower?.length && token) {
      fetchFollowers(); // Call the async function
    }
  }, [follower]);

  return (
    <div className="w-full h-full col-span-5 border-x  border-purple-700 ">
      {/* header */}
      <div className="flex flex-col">
        <div className="sticky top-0 w-full bg-black bg-opacity5 backdrop-blur-md h-[50px] flex font-style2 self-center text-center text-lg text-gray1 p-1 items-center gap-8">
          <img
            className="invert h-10 w-auto rotate-180 p-2 hover:bg-gray-950 hover:bg-opacity-15 rounded-full"
            src={backIcon}
            alt="back"
            onClick={() => navigate(-1)}
          />

          <div className="text-start ">
            <p className="text-2xl flex items-center gap-1">
              {name}{" "}
              {isAdmin && (
                <img src={tick} className="h-4 w-auto " alt="purpletick" />
              )}{" "}
            </p>
            <p className="text-xs text-gray-400">{username}</p>
          </div>
        </div>
        <CenterHeader
          button1="Followers"
          button2="Following"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="flex flex-col p-2 ">
        {activeTab === "following" ? (
          following?.length === 0 ? (
            <p className="text-center text-gray-300 font-style2">
              You are not following anyone
            </p>
          ) : (
            followings.map((user) => (
              <FriendWidget
                key={user._id}
                {...user}
                currentUserFollowing={currentUser.following}
              />
            ))
          )
        ) : follower?.length === 0 ? (
          <p className="text-center text-gray-300 font-style2">
            You have 0 followers
          </p>
        ) : (
          followers.map((user) => (
            <FriendWidget
              key={user._id}
              {...user}
              currentUserFollowing={currentUser.following}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default FollowerAndFollowing;
