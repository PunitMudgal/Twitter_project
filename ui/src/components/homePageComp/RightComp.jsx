import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import tick from "../../assets/tick.png";
import chatIcon from "../../assets/chat.svg";
import Avatar from "../Avatar";
import { getAllFollowing, getFriendSuggestion } from "../../fetch/helper";
import Loading from "../Loading";
import "../../style/profile.css";
import FriendWidget from "../widget/FriendWidget";
import { setCurrentFollowing } from "../../store/authSlice";
import { truncateUsername } from "../../store/authSlice";
import Search from "../Search";
import useFollowUnfollow from "../../store/useFollowUnfollow";

function RightComp() {
  const { handleUnfollowUser } = useFollowUnfollow();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);
  const currentFollowing = useSelector((state) => state.auth?.currentFollowing);

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
      const response = await getFriendSuggestion();
      setSuggestedFriends(response);
    } catch (error) {
      console.error(error);
    } finally {
      setSuggestionLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      fetchSuggestedFriends();
    }
  }, [currentUser]);

  /** Fetch Following */
  const fetchFollowing = async () => {
    try {
      const data = await getAllFollowing(currentUser?.following);
      dispatch(setCurrentFollowing(data));
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.following?.length) {
      fetchFollowing(); // Call the async function
    }
  }, [currentUser?.following]);

  /** for popup animations in friends and suggestion list*/
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2, // delay between each item animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="col-span-3 flex flex-col gap-4 sticky top-0 overflow-hidden lg:hidden ">
      {/* search bar (top) */}
      <div className="sticky top-0 w-screen h-12 flex bg-black items-center ">
        <Search />
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
            <motion.div
              className="friends-list-container"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {suggestedFriends.map((friend) => (
                <motion.div
                  key={friend._id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }} // Optional: scale up on hover
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  <FriendWidget {...friend} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* friends column */}
        <motion.div
          className=" border border-purple-700 p-2 rounded-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="font-semibold mb-2 text-lg">
            Your Followings{" "}
            <span className="text-sm ">({currentFollowing?.length})</span>{" "}
          </p>

          {currentFollowing?.slice(0, 4).map((friend) => (
            <motion.div
              key={friend?._id}
              className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 "
              variants={itemVariants}
              whileHover={{ scale: 1.05 }} // Optional: scale up on hover
              transition={{ type: "spring", stiffness: 120 }}
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
                onClick={() => handleUnfollowUser(friend._id)}
                className="p-2 px-3 rounded-3xl ml-auto border bg-transparent text-white hover:text-red-600 hover:border-red-600"
              >
                Unfollow
              </button>
              <img
                className="h-6 w-auto invert ml-auto"
                src={chatIcon}
                alt="icon"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* exrta column */}
        <div className="border border-purple-700 p-2 rounded-md">
          Buy Premium Now
        </div>
      </div>
    </div>
  );
}

export default RightComp;
