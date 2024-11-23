import React, { useCallback, useEffect, useState } from "react";
import UploadWidget from "../widget/UploadWidget";
import Loading from "../Loading";
import "../../style/profile.css";
import "../../index.css";
import CenterHeader from "../CenterHeader";
import { getFeedPosts, getFollowingPosts } from "../../fetch/helper";
import toast from "react-hot-toast";
import Post from "../Post";
import { useCenterRef } from "../CenterRefContext";
import { useSelector } from "react-redux";

function CenterComp({ isLoading }) {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("For You");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [postLoading, setPostLoading] = useState(true);

  const centerRef = useCenterRef();
  const loggedInUserId = useSelector((state) => state.auth?.user?._id);

  const fetchPosts = useCallback(async () => {
    setPostLoading(true);
    try {
      const fetchMethod =
        activeTab === "For You" ? getFeedPosts : getFollowingPosts;
      const { posts: newPosts, hasMore: morePostsAvailable } =
        await fetchMethod(page, loggedInUserId);

      setPosts((prevPosts) =>
        page === 1 ? newPosts : [...prevPosts, ...newPosts]
      );
      setHasMore(newPosts.length >= 4 && morePostsAvailable);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setPostLoading(false);
    }
  }, [activeTab, page, loggedInUserId]);

  useEffect(() => {
    fetchPosts();
  }, [activeTab, page]);

  useEffect(() => {
    const centerElement = centerRef.current;
    if (!centerElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = centerElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        hasMore &&
        !postLoading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const debouncedScroll = debounce(handleScroll, 200);
    centerElement.addEventListener("scroll", debouncedScroll);
    return () => centerElement.removeEventListener("scroll", debouncedScroll);
  }, [postLoading, hasMore, centerRef]);

  return (
    <>
      {/* header */}
      <CenterHeader
        button1="For You"
        button2="Following"
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />

      <UploadWidget />

      {isLoading && <Loading />}
      <div className="flex flex-col space-y-4">
        {postLoading ? (
          <Loading />
        ) : (
          posts.map((post) => (
            <Post key={post._id} {...post} posts={posts} setPosts={setPosts} />
          ))
        )}
      </div>
    </>
  );
}

export default CenterComp;

// Utility function for debounce
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
