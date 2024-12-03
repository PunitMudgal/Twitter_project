import { truncateUsername } from "../../store/authSlice";
import tick from "../../assets/tick.png";
import Avatar from "../Avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFollowUnfollow from "../../store/useFollowUnfollow";
import { CiMenuKebab } from "react-icons/ci";

function FriendWidget({
  _id,
  profilePicturePath,
  name,
  username,
  isAdmin,
  isContact,
  lastMessage,
}) {
  const currentUser = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();

  const doesContain = currentUser.following.includes(_id);
  const { handleFollowUser, handleUnfollowUser } = useFollowUnfollow();

  return (
    <div className="flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ">
      <Avatar
        profilePhoto={profilePicturePath}
        userId={_id}
        isContact={isContact}
      />
      <div
        onClick={() => !isContact && navigate(`/home/${_id}`)}
        className={`flex flex-col cursor-pointer ${
          isContact ? "md:hidden" : "flex"
        } `}
      >
        <p className="flex gap-1 items-center capitalize">
          {truncateUsername(name) || "Forever User"}
          {isAdmin && (
            <img
              src={tick}
              className="h-4 w-4"
              alt="purpletick hover:underline"
            />
          )}
        </p>
        <p className="text-gray2 text-xs">
          {lastMessage ? lastMessage : `@${truncateUsername(username)}`}
        </p>
      </div>
      {!isContact && (
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
      )}
    </div>
  );
}

export default FriendWidget;
