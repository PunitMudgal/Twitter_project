import { useSelector } from "react-redux";

import Avatar from "../Avatar";
import tick from "../../assets/tick.png";
import chatIcon from "../../assets/chat.svg";
import searchIcon from "../../assets/search.svg";
import addFriendIcon from "../../assets/addFriend.svg";
import { truncateUsername } from "../../store/authSlice";
import { useEffect, useState } from "react";
import { getFriendSuggestion } from "../../helper/helper";
import Loading from "../Loading";

function RightComp() {
  const currentUserId = useSelector((state) => state.auth?.user?._id);
  const token = useSelector((state) => state.auth?.token);

  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(true);
  console.log("loading", suggestionLoading);
  useEffect(() => {
    const fetchSuggestedFriends = async () => {
      try {
        setSuggestionLoading(true);
        const response = await getFriendSuggestion(currentUserId, token);
        setSuggestedFriends(response);
      } catch (error) {
        console.error(error);
      } finally {
        setSuggestionLoading(false);
      }
    };

    if (currentUserId && token) {
      fetchSuggestedFriends();
    }
  }, [currentUserId, token]);

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
          <p className="font-semibold mb-2 text-lg">Friend Suggestions</p>

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
                  <img
                    className="h-6 w-auto invert ml-auto"
                    src={addFriendIcon}
                    alt=""
                  />
                </div>
              ))}
            </>
          )}
        </div>

        {/* friends column */}
        <div className=" border border-purple-700 p-2 rounded-md">
          <p className="font-semibold mb-2 text-lg">Friends</p>
          {/* 1 */}
          {/* <div className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ">
            <Avatar />
            <div className="flex flex-col">
              <p className="flex gap-1 items-center capitalize">
                {truncateUsername(name)}
                {isAdmin && (
                  <img src={tick} className="h-4 w-4" alt="purpletick" />
                )}
              </p>
              <p className="text-gray2 text-xs">
                @{truncateUsername(username)}
              </p>
            </div>
            <img className="h-6 w-auto invert ml-auto" src={chatIcon} alt="" />
          </div> */}
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
