import { useDispatch, useSelector } from "react-redux";

import Avatar from "../Avatar";
import tick from "../../assets/tick.png";
import chatIcon from "../../assets/chat.svg";
import searchIcon from "../../assets/search.svg";
import { setFriends, truncateUsername } from "../../store/authSlice";
import { useEffect, useState } from "react";
import {
  follow,
  getAllFriends,
  getFriendSuggestion,
  unfollow,
} from "../../fetch/helper";
import Loading from "../Loading";
import { toast } from "react-hot-toast";
import { RiRefreshLine } from "react-icons/ri";
import "../../style/profile.css";

function RightComp() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.token);
  const friends = useSelector((state) => state.auth?.friends);

  const [isRotating, setIsRotating] = useState(false);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(true);

  const handleRefreshClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 2000);
  };

  // friend suggestion
  const fetchSuggestedFriends = async () => {
    try {
      setSuggestionLoading(true);
      const response = await getFriendSuggestion(currentUser._id, token);
      setSuggestedFriends(response);
    } catch (error) {
      console.error(error);
    } finally {
      setSuggestionLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?._id && token) {
      fetchSuggestedFriends();
    }
  }, [currentUser?._id, token]);

  /** Fetch Friends */
  const fetchFriends = async () => {
    try {
      const data = await getAllFriends(currentUser.following, token);
      dispatch(setFriends(data)); // Set the data to the state
      console.log("data in rightcomp", data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.following?.length && token) {
      fetchFriends(); // Call the async function
    }
  }, [currentUser?.following, token]);

  // Follow
  const handleFollowUser = async (friendId) => {
    if (!currentUser?._id || !token) {
      return toast.error("User or token information is missing!");
    }
    try {
      const followPromise = follow(currentUser._id, friendId, token);
      await toast.promise(followPromise, {
        loading: "Loading...",
        success: "Followed successfully",
        error: (err) => err.response?.data?.message,
      });
      setSuggestedFriends((prev) =>
        prev.map((friend) =>
          friend._id === friendId ? { ...friend, isFollowing: true } : friend
        )
      );
      fetchFriends();
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
      setSuggestedFriends((prev) =>
        prev.map((friend) =>
          friend._id === friendId ? { ...friend, isFollowing: false } : friend
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="col-span-3 flex flex-col gap-4 sticky top-0 overflow-hidden ">
      {/* search bar (top) */}
      <div className="sticky top-0 w-screen h-12 flex bg-black items-center ">
        <div className=" mx-[4%] flex items-center gap-2  bg-gray-800 p-1 my-1 rounded-3xl ">
          <img
            src={searchIcon}
            alt="search"
            className="h-9 p-2 w-auto invert"
          />
          <input
            type="text"
            placeholder="Search"
            className="text-sm bg-transparent w-full p-1 "
          />
        </div>
      </div>

      <div className="ml-[4%] w-auto flex flex-col gap-4">
        {/* friends suggestion */}
        <div className="flex flex-col justify-start w-auto border border-purple-700  p-3 rounded-md">
          <div className="flex justify-between items-center font-semibold mb-2 text-lg">
            <p>Friend Suggestions</p>
            <RiRefreshLine
              onClick={() => {
                fetchSuggestedFriends();
                handleRefreshClick();
              }}
              className={`text-3xl p-1 rounded-full hover:bg-gray-800 bg-opacity-50 cursor-pointer ${
                isRotating ? "rotate-90-cw" : ""
              } `}
            />
          </div>

          {suggestionLoading ? (
            <Loading />
          ) : (
            <>
              {suggestedFriends.map((friend) => (
                <div
                  key={friend?._id}
                  className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 "
                >
                  <Avatar
                    profilePhoto={friend?.profilePicturePath}
                    userId={friend?._id}
                  />
                  <div className="flex flex-col">
                    <p className="flex gap-1 items-center capitalize">
                      {truncateUsername(friend?.name)}
                      {friend?.isAdmin && (
                        <img src={tick} className="h-4 w-4" alt="purpletick" />
                      )}
                    </p>
                    <p className="text-gray2 text-xs">
                      @{truncateUsername(friend?.username)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (currentUser.following.includes(friend._id)) {
                        handleUnfollowUser(friend._id);
                      } else {
                        handleFollowUser(friend._id);
                      }
                    }}
                    className={`p-2 px-3 rounded-3xl ml-auto ${
                      currentUser.following.includes(friend._id)
                        ? "border bg-transparent text-white hover:text-red-600 hover:border-red-600"
                        : "text-black font-bold bg-white"
                    }`}
                  >
                    {currentUser.following.includes(friend._id)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* friends column */}
        <div className=" border border-purple-700 p-2 rounded-md">
          <p className="font-semibold mb-2 text-lg">Your Friends</p>
          {friends?.slice(0, 4).map((friend) => (
            <div
              key={friend?._id}
              className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 "
            >
              <Avatar
                profilePhoto={friend?.profilePicturePath}
                userId={friend?._id}
              />
              <div className="flex flex-col">
                <p className="flex gap-1 items-center capitalize">
                  {truncateUsername(friend?.name)}
                  {friend?.isAdmin && (
                    <img src={tick} className="h-4 w-4" alt="purpletick" />
                  )}
                </p>
                <p className="text-gray2 text-xs">
                  @{truncateUsername(friend?.username)}
                </p>
              </div>
              <img
                className="h-6 w-auto invert ml-auto"
                src={chatIcon}
                alt="icon"
              />
            </div>
          ))}
        </div>

        {/* exrta column */}
        <div className="border border-purple-700 p-2 rounded-md">
          Buy Premium Now
        </div>
      </div>
    </div>
  );
}

export default RightComp;

// {currentUser.following.includes(friend._id) ? (
//   // unfollow button
//   <button
//     className="border bg-transparent text-white p-2 px-3 rounded-3xl ml-auto hover:text-red-600 hover:border-red-600 button-following "
//     onClick={() => {
//       if (currentUser?._id && friend?._id && token) {
//         handleUnfollowUser(
//           currentUser._id,
//           friend._id,
//           token
//         );
//       } else {
//         toast.error("User or token information is missing!");
//       }
//     }}
//   ></button>
// ) : (
//   // follow button
//   <button
//     onClick={() => {
//       if (currentUser?._id && friend?._id && token) {
//         handleFollowUser(currentUser._id, friend._id, token);
//       } else {
//         toast.error("User or token information is missing!");
//       }
//     }}
//     className="p-2 px-3 text-black font-bold bg-white rounded-3xl ml-auto"
//   >
//     Follow
//   </button>
// )}
