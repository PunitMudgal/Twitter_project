import { useSelector } from "react-redux";

import addFriendIcon from "../../assets/addFriend.svg";
import chatIcon from "../../assets/chat.svg";
import Avatar from "../Avatar";
import tick from "../../assets/tick.png";
import { truncateUsername } from "../../store/authSlice";

function RightComp() {
  // ! temperory
  const { name, isAdmin, username, profilePicturePath } = useSelector(
    (state) => state.auth?.user || {}
  );

  return (
    <div className="col-span-3 p-3 pl-[9%] flex flex-col gap-4">
      <div className="flex flex-col justify-start w-auto border border-purple-700 p-2 rounded-md">
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
            <p className="text-gray2 text-xs">@{truncateUsername(username)}</p>
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
            <p className="text-gray2 text-xs">@{truncateUsername(username)}</p>
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
            <p className="text-gray2 text-xs">@{truncateUsername(username)}</p>
          </div>
          <img
            className="h-6 w-auto invert ml-auto"
            src={addFriendIcon}
            alt=""
          />
        </div>
      </div>

      {/* friends column */}
      <div className="border border-purple-700 p-2 rounded-md">
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
            <p className="text-gray2 text-xs">@{truncateUsername(username)}</p>
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
            <p className="text-gray2 text-xs">@{truncateUsername(username)}</p>
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
            <p className="text-gray2 text-xs">@{truncateUsername(username)}</p>
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
            <p className="text-gray2 text-xs">@{truncateUsername(username)}</p>
          </div>
          <img className="h-6 w-auto invert ml-auto" src={chatIcon} alt="" />
        </div>
      </div>

      {/* exrta column */}
      <div className="border border-purple-700 p-2 rounded-md">
        Buy Premium Now
      </div>
    </div>
  );
}

export default RightComp;
