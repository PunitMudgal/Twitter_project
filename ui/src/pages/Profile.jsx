import { useSelector } from "react-redux";
import backIcon from "../assets/next.svg";
import { Outlet, useNavigate, useParams, Link } from "react-router-dom";
import tick from "../assets/tick.png";
import defaultPhoto from "../assets/profile.png";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import message from "../assets/envelope.svg";
import FetchHook from "../fetch/fetchHook";
import Loading from "../components/Loading";

function Profile() {
  const {
    _id,
    name,
    username,
    profilePicturePath,
    coverPicture,
    follower,
    following,
    isAdmin,
    createdAt,
    bio,
    from,
  } = useSelector((state) => state.auth.friendProfile) || {};

  const LogedInUsername = useSelector((state) => state.auth?.user?._id);
  const { id } = useParams();
  const { isLoading, serverError } = FetchHook(id);
  let isSelf = LogedInUsername === id;
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  return (
    <>
      <div className=" relative flex flex-col col-span-5 flex-grow border-x border-purple-700 overflow-x-hidden overflow-y-auto ">
        {/* header */}
        <div className="sticky top-0 w-full bg-black bg-opacity5 backdrop-blur-md h-[48px] flex font-style2 self-center text-center text-lg text-gray1 p-1 items-center gap-8">
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
            <p className="text-xs text-gray-400">114 posts</p>
          </div>
        </div>

        {/* main profile */}
        <div className="flex-grow flex-1 h-full relative overflow-hidden">
          {/* background image  */}
          <div className="bg-zinc-800 w-full h-[27%] ">
            {coverPicture && (
              <img
                className="h-full w-full object-cover overflow-hidden "
                src={`http://localhost:1414/assets/${coverPicture}`}
                alt="cover"
              />
            )}
          </div>

          {/* Profile Photo */}
          <img
            onClick={() => navigate(profilePicturePath && `/${id}/photo`)}
            className="absolute top-[15%] left-4 h-36 w-36  object-cover border-4 border-gray-900 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105 hover:border-2 cursor-pointer"
            src={
              profilePicturePath
                ? `http://localhost:1414/assets/${profilePicturePath}`
                : defaultPhoto
            }
            alt="profile"
          />

          {/* Profile after image */}
          <div className="flex flex-col gap-2 w-full p-3 px-5 ">
            <div className="flex w-full justify-end items-center gap-3">
              {isSelf ? (
                <button
                  onClick={() => navigate(`/home/${id}/edit`)}
                  className="py-2 px-4 border font-semibold rounded-3xl"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <img src={message} className="h-7 w-auto invert" alt="msg" />
                  <button className="py-1 px-3 border font-semibold rounded-3xl bg-gray-300 text-black">
                    Follow
                  </button>
                </>
              )}
            </div>
            {/* name */}
            <div className="flex flex-wrap mt-4">
              <p className="text-xl font-bold ">{name}</p>
              {isAdmin && (
                <span className="border border-purple-500 rounded-3xl text-sm px-2 ml-2 flex gap-2 items-center">
                  <img src={tick} className="h-4 w-4 =" alt="" />
                  Admin
                </span>
              )}
              <p className=" w-full text-xs block text-gray2 gap-1 items-center">
                @{username}
              </p>
            </div>
            {bio && <p className="max-w-3xl text-gray-300 text-sm ">{bio}</p>}

            {/* Joined date & location */}
            <div>
              <p className="flex items-center w-full  text-sm text-gray2 gap-1 ">
                <IoCalendarOutline /> Joined {createdAt?.slice(0, 7)}
              </p>
              {from && (
                <p className="flex items-center w-full  text-sm text-gray2 gap-1 ">
                  <IoLocationOutline /> {from}
                </p>
              )}
            </div>
            {/* folower and following */}
            <div className="flex items-center gap-4 text-sm text-gray2 ">
              <p>
                {following?.length}{" "}
                <Link
                  to={`/home/${_id}/follower&following`}
                  className="text-gray2 hover:underline"
                >
                  Following
                </Link>
              </p>
              <p>
                {follower?.length}{" "}
                <Link
                  to={`/home/${_id}/follower&following`}
                  className="text-gray2 hover:underline"
                >
                  Follower
                </Link>
              </p>
            </div>
          </div>

          {/* posts */}
          <div className="flex flex-col m-2 space-y-4 ">
            <div className="h-72 w-full bg-slate-800">post 1</div>
            <div className="h-72 w-full bg-slate-800">post 2</div>
            <div className="h-72 w-full bg-slate-800">post 3</div>
            <div className="h-72 w-full bg-slate-800">post 4</div>
            <div className="h-72 w-full bg-slate-800">post 5</div>
            <div className="h-72 w-full bg-slate-800">post 6</div>
            <div className="h-72 w-full bg-slate-800">post 7</div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Profile;