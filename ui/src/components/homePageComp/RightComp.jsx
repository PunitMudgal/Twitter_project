import { useSelector } from "react-redux";

import Avatar from "../Avatar";
import tick from "../../assets/tick.png";
import chatIcon from "../../assets/chat.svg";
import searchIcon from "../../assets/search.svg";
import addFriendIcon from "../../assets/addFriend.svg";
import { truncateUsername } from "../../store/authSlice";

function RightComp() {
  // ! temperory
  const { name, isAdmin, username, profilePicturePath } = useSelector(
    (state) => state.auth?.user || {}
  );

  return (
    <div className="col-span-3 flex flex-col gap-4">
      {/* search bar (top) */}
      <div className="sticky top-0 w-full h-12 flex justify-center ">
        <div className=" ml-[9%] w-full flex items-center gap-2  bg-gray-800 p-1 my-1 rounded-3xl ">
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

      <div className=" ml-[9%] w-full flex flex-col gap-4">
        <div className=" flex flex-col justify-start w-auto border border-purple-700  p-3 rounded-md">
          <p className="font-semibold mb-2 text-lg">Friend Suggestions</p>

          {/* suggested friend ! will remove later these hardcoded */}
          {/* 1 */}
          <div className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ">
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
            <img
              className="h-6 w-auto invert ml-auto"
              src={addFriendIcon}
              alt=""
            />
          </div>

          {/* 2 */}
          <div className="flex gap-2 items-center p-2 text-sm font-semibold mt-auto rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ">
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
            <img
              className="h-6 w-auto invert ml-auto"
              src={addFriendIcon}
              alt=""
            />
          </div>

          {/* 3 */}
          <div className="flex gap-2 items-center p-2 text-sm font-semibold mt-auto rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ">
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
            <img
              className="h-6 w-auto invert ml-auto"
              src={addFriendIcon}
              alt=""
            />
          </div>
        </div>

        {/* friends column */}
        <div className=" border border-purple-700 p-2 rounded-md">
          <p className="font-semibold mb-2 text-lg">Friends</p>
          {/* 1 */}
          <div className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ">
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
          </div>
          {/* 1 */}
          <div className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ">
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
          </div>
          {/* 1 */}
          <div className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ">
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
          </div>
          {/* 1 */}
          <div className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ">
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
          </div>
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
