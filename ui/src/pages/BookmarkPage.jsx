import React, { useEffect, useState } from "react";
import { getBookmarkedPosts } from "../fetch/helper";
import { useSelector } from "react-redux";
import { selectUser } from "../store/authSlice";
import toast from "react-hot-toast";
import backIcon from "../assets/next.svg";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Post from "../components/Post";

function BookmarkPage() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchBookmarkedPosts = async () => {
    try {
      setLoading(true);
      const data = await getBookmarkedPosts();
      setPosts(data);
    } catch (error) {
      console.error(error);
      toast.error("Error while fetching data: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && FetchBookmarkedPosts();
  }, [user.id]);

  return (
    <>
      {/* header */}
      <div className="sticky top-0 w-full bg-transparent bg-opacity-55 backdrop-blur-md h-[48px] font-style2 text-gray1 p-1 flex gap-2 items-center">
        <img
          className="invert h-10 w-auto rotate-180 p-2 hover:bg-gray-950 hover:bg-opacity-15 rounded-full"
          src={backIcon}
          alt="back"
          onClick={() => navigate(-1)}
        />

        <p className="text-start font-semibold text-xl">Bookmarks</p>
      </div>

      {/* posts */}
      {loading ? (
        <Loading />
      ) : (
        posts?.map((post) => <Post key={post._id} {...post} />)
      )}
    </>
  );
}

export default BookmarkPage;
