import React, { useEffect, useRef, useState } from "react";
import UploadWidget from "../widget/UploadWidget";
import Loading from "../Loading";
import "../../style/profile.css";
import "../../index.css";
import CenterHeader from "../CenterHeader";
import { getFeedPosts } from "../../fetch/helper";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Post from "../Post";
import { useCenterRef } from "../CenterRefContext";

function CenterComp({ isLoading }) {
  const [feedPosts, setFeedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [postLoading, setPostLoading] = useState(true);

  const centerRef = useCenterRef();

  const fetchFeedPosts = async () => {
    setPostLoading(true);
    try {
      const { posts, hasMore } = await getFeedPosts(page);
      if (page === 1) {
        setFeedPosts(posts);
        setHasMore(hasMore);
      } else {
        setFeedPosts((prevPosts) => [...prevPosts, ...posts]);
        setHasMore(hasMore);
      }
      if (posts.length < 4) {
        setHasMore(false);
      }
    } catch (error) {
      toast.error("Failed to load posts");
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedPosts(page);
  }, [page]);

  useEffect(() => {
    const centerElement = centerRef.current;
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

  return (
    <>
      {/* header */}
      <CenterHeader button1="For You" button2="Following" />
      <UploadWidget />
      {isLoading ? <Loading /> : ""}

      <div className="flex flex-col m-2 space-y-4 ">
        {postLoading ? (
          <Loading />
        ) : (
          feedPosts?.map((post) => <Post key={post._id} {...post} />)
        )}
      </div>
    </>
  );
}

export default CenterComp;
