import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { Outlet, useNavigate, useParams, Link } from "react-router-dom";

import backIcon from "../assets/next.svg";
import tick from "../assets/tick.png";
import defaultPhoto from "../assets/profile.png";
import message from "../assets/envelope.svg";
import useFetchHook from "../fetch/fetchHook";
import Loading from "../components/Loading";
import Post from "../components/Post";
import { useCenterRef } from "../components/CenterRefContext";
import { axiosInstance } from "../fetch/axios";
import useFollowUnfollow from "../store/useFollowUnfollow";
import { CreateConversations } from "../store/chatSlice";

function Profile() {
  const {
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
  } = useSelector((state) => state.user?.friendProfile) || {};
  // const currentUser = useSelector((state) => state.auth?.user);
  const { _id: LogedInUserId, following: currentUserFollowing } = useSelector(
    (state) => state.auth?.user
  );
  const { handleFollowUser, handleUnfollowUser } = useFollowUnfollow();

  const { id } = useParams();
  const { isLoading } = useFetchHook(id);
  const isSelf = LogedInUserId === id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const centerRef = useCenterRef();
  const doesContain = currentUserFollowing.includes(id);

  const [friendPosts, setFriendPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFriendPosts = async (page) => {
    setPostLoading(true);
    try {
      // const data = await getFriendPosts(id, token, page);
      const { data } = await axiosInstance.get(
        `/post/${id}/posts?page=${page}&limit=4`
      );
      if (page === 1) {
        setFriendPosts(data.posts);
        setHasMore(data.hasMore);
      } else {
        setFriendPosts((prevPosts) => [...prevPosts, ...data]);
      }

      if (data.length < 4) {
        setHasMore(false); // Stop fetching if no data returned
      }
    } catch (error) {
      toast.error("Failed to load posts");
    } finally {
      setPostLoading(false);
    }
  };

  /** Chat */
  const handleCreateChat = (friendId) => {
    dispatch(CreateConversations({ currentUserId: LogedInUserId, friendId }));
    navigate("/messenger");
  };

  useEffect(() => {
    fetchFriendPosts(page);
  }, [page]);

  useEffect(() => {
    setFriendPosts([]);
    setPage(1);
    setHasMore(true);
  }, [id]);

  useEffect(() => {
    const centerElement = centerRef?.current;
    if (!centerElement) {
      console.log("centerRef.current is null");
    }

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = centerElement;
      console.log("scroll of center component called");
      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        hasMore &&
        !postLoading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    centerElement?.addEventListener("scroll", handleScroll);

    return () => {
      centerElement?.removeEventListener("scroll", handleScroll);
    };
  }, [postLoading, hasMore]);

  if (isLoading) return <Loading />;
  return (
    <>
      {/* header */}
      <div className="sticky top-0 w-full bg-transparent bg-opacity-55 backdrop-blur-md h-[48px] flex font-style2 self-center text-center text-lg text-gray1 p-1 items-center gap-8">
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
      <div className="flex-grow flex-1 h-full relative overflow-x-hidden">
        {/* background image  */}
        <div className="bg-zinc-800 w-full h-[27%] ">
          {coverPicture && (
            <img
              onClick={() =>
                navigate(
                  coverPicture &&
                    `/${id}/photo/${encodeURIComponent(coverPicture)}`
                )
              }
              className="h-full w-full object-cover overflow-hidden object-center "
              src={coverPicture}
              alt="cover"
            />
          )}
        </div>

        {/* Profile Photo */}
        <img
          onClick={() =>
            navigate(
              profilePicturePath &&
                `/${id}/photo/${encodeURIComponent(profilePicturePath)}`
            )
          }
          className="absolute top-[16%] left-4 h-36 w-36  object-cover border-4 border-gray-900 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105 hover:border-2 cursor-pointer"
          src={profilePicturePath || defaultPhoto}
          alt="profile"
        />

        {/* Profile after image */}
        <div className="flex flex-col gap-2 w-full px-5 ">
          <div className="flex w-full justify-end items-center gap-3 pt-3">
            {isSelf ? (
              <button
                onClick={() => navigate(`/home/${id}/edit`)}
                className="py-2 px-4 border font-semibold rounded-3xl"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <img
                  src={message}
                  onClick={() => handleCreateChat(id)}
                  className="h-7 w-auto invert"
                  alt="msg"
                />

                <button
                  onClick={() => {
                    if (doesContain) {
                      handleUnfollowUser(id);
                    } else {
                      handleFollowUser(id);
                    }
                  }}
                  className="py-1 px-3 border font-semibold rounded-3xl bg-gray-300 text-black"
                >
                  {doesContain ? "Unfollow" : "Follow"}
                </button>
              </>
            )}
          </div>
          {/* name */}
          <div className="flex flex-wrap mt-4">
            <p className="text-xl font-bold ">{name}</p>
            {isAdmin && (
              <span
                onDoubleClick={() => navigate(`/home/${id}/admin/dashboard`)}
                className="border border-purple-500 rounded-3xl text-sm px-2 ml-2 flex gap-2 items-center"
              >
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
                to={`/home/${id}/follower&following`}
                className="text-gray2 hover:underline"
              >
                Following
              </Link>
            </p>
            <p>
              {follower?.length}{" "}
              <Link
                to={`/home/${id}/follower&following`}
                className="text-gray2 hover:underline"
              >
                Follower
              </Link>
            </p>
          </div>

          <div className="mt-4 flex items-center justify-around w-full text-gray-400 text-center">
            <p className="hover:bg-gray-600 hover:bg-opacity-45 flex-1 text-white underline underline-offset-8">
              Posts
            </p>
            <p className="hover:bg-gray-600 hover:bg-opacity-45 flex-1 text-gray-400">
              Replies
            </p>
            <p className="hover:bg-gray-600 hover:bg-opacity-45 flex-1 text-gray-400">
              Highlight
            </p>
            <p className="hover:bg-gray-600 hover:bg-opacity-45 flex-1 text-gray-400">
              Media
            </p>
          </div>
        </div>

        {/* posts */}
        <div className="flex flex-col m-2  ">
          {postLoading && page === 1 ? (
            <Loading />
          ) : (
            friendPosts?.map((friendData) => (
              <Post key={friendData._id} {...friendData} />
            ))
          )}
          {postLoading && page > 1 && <Loading />}
        </div>
        {hasMore && (
          <p
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="text-green-400 h-10 mb-1 p-1 w-full border-y text-center border-gray-500 font-style2 cursor-pointer"
          >
            Load More...
          </p>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Profile;
