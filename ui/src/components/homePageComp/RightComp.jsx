import { useDispatch, useSelector } from "react-redux";

import Avatar from "../Avatar";
import tick from "../../assets/tick.png";
import chatIcon from "../../assets/chat.svg";
import searchIcon from "../../assets/search.svg";
import { setSearchResult, truncateUsername } from "../../store/authSlice";
import { useEffect, useState } from "react";
import {
  follow,
  getAllFollowing,
  getFriendSuggestion,
  searchUser,
  unfollow,
} from "../../fetch/helper";
import Loading from "../Loading";
import { toast } from "react-hot-toast";
import { RiRefreshLine } from "react-icons/ri";
import "../../style/profile.css";
import FriendWidget from "../widget/FriendWidget";

function RightComp() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.token);
  const searchResult = useSelector((state) => state.auth?.searchResult);

  const [isRotating, setIsRotating] = useState(false);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchMenu, setSearchMenu] = useState(false);

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
  }, [currentUser]);

  /** Fetch Following */
  const fetchFollowing = async () => {
    try {
      const data = await getAllFollowing(currentUser?.following, token);
      if (data) dispatch(setFollowings(data));
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.following?.length && token) {
      fetchFollowing(); // Call the async function
    }
  }, [currentUser?.following, token]);

  /** SEARCH USER */
  const submitSearch = async () => {
    if (searchText) {
      const data = await searchUser(searchText.toLocaleLowerCase(), token);
      dispatch(setSearchResult(data));
    }
  };

  useEffect(() => {
    if (searchMenu) {
      const timer = setTimeout(() => submitSearch(), 400);

      //clean up function
      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchText]);

  return (
    <div className="col-span-3 flex flex-col gap-4 sticky top-0 overflow-hidden ">
      {/* search bar (top) */}
      <div className="sticky top-0 w-screen h-12 flex bg-black items-center ">
        <div className=" mx-[4%] flex items-center gap-2  bg-gray-800 p-1 my-1 rounded-3xl ">
          <img
            src={searchIcon}
            alt="search"
            className="h-9 p-2 w-auto invert"
            onClick={submitSearch}
          />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            placeholder="Search"
            className="text-sm bg-transparent w-full p-1 focus:outline-2 outline-purple-600 "
            onFocus={() => setSearchMenu(true)}
            onBlur={() => setSearchMenu(false)}
          />
        </div>
        {searchMenu && (
          <div className="p-2 rounded absolute top-[50px] left-12 shadow-md shadow-gray-700 bg-slate-950 ">
            {!searchResult ? (
              <p>No Result Found!</p>
            ) : (
              searchResult.map((user) => (
                <FriendWidget
                  key={user._id}
                  {...user}
                  currentUserFollowing={currentUser.following}
                  setSuggestedFriends={setSuggestedFriends}
                  fetchFollowing={fetchFollowing}
                />
              ))
            )}
          </div>
        )}
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
                <div key={friend._id}>
                  <FriendWidget
                    {...friend}
                    currentUserFollowing={currentUser.following}
                    setSuggestedFriends={setSuggestedFriends}
                    fetchFollowing={fetchFollowing}
                  />
                </div>
              ))}
            </>
          )}
        </div>

        {/* friends column */}
        <div className=" border border-purple-700 p-2 rounded-md">
          <p className="font-semibold mb-2 text-lg">
            Your Friends{" "}
            <span className="text-sm ">({followings?.length})</span>{" "}
          </p>
          {followings?.slice(0, 4).map((friend) => (
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
