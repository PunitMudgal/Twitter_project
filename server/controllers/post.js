import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { text, isQuote, parentId } = req.body;
    const { userId } = req.user;

    const picturePath = req.files?.["picturePath"]?.[0]?.path || "";

    const newPost = new Post({
      user: userId,
      picturePath,
      text: text || "",
      likes: {},
      rootPostId: parentId || null,
      parentId: parentId || null,
      isQuote: isQuote || false,
    });

    await newPost.save();

    const post = await Post.findById(newPost._id)
      .populate({
        path: "user",
        select: "name username profilePicturePath isAdmin",
      })
      .lean();

    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/** /getAll */
export async function getFeedPosts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;

    const posts = await Post.find()
      .populate({
        path: "user",
        select: "name username profilePicturePath isAdmin",
      })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .lean();

    const totalPosts = await Post.countDocuments();
    const hasMore = startIndex + posts.length < totalPosts;

    res.status(200).json({ posts, hasMore });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getFollowingPosts(req, res) {
  try {
    const { userId, following } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    console.log("Followings - - - - - - - -", following);
    const followings = following || [];
    console.log("Foll - owings - - - - - - - -", followings);

    // Fetch user following list
    // const user = await User.findById(userId).select("following").lean();
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // const posts = await Post.find({
    //   $or: [
    //     { userId: { $in: following } }, // posts from followed users
    //     { userId: userId }, // user's own posts
    //   ],
    // })
    //   .sort({ createdAt: -1 })
    //   .skip(skip)
    //   .limit(limit)
    //   .lean();
    const posts = await Post.find({ user: { $in: followings } })
      .populate({
        path: "user",
        select: "name username profilePicturePath isAdmin", // Populate user details
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Count total posts from following list and self
    const totalPosts = await Post.countDocuments({
      $or: [{ user: { $in: following } }, { user: userId }],
    });
    const hasMore = skip + posts.length < totalPosts;

    res.status(200).json({ posts, hasMore });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/** :userId/posts */
export async function getUserPosts(req, res) {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ user: userId })
      .populate({
        path: "user",
        select: "name username profilePicturePath isAdmin",
      })
      .sort({ createdAt: -1 }) // Sort by most recent
      .skip(skip) // Implement pagination
      .limit(limit) // Limit the number of posts per page
      .lean(); // Optimize performance with lean()

    const totalPosts = await Post.countDocuments({ user: userId });

    // Determine if there are more posts to fetch
    const hasMore = skip + posts.length < totalPosts;

    res.status(200).json({ posts, hasMore });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function likePost(req, res) {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    const isLiked = await post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    await post.save();
    res
      .status(200)
      .json({ message: isLiked ? "Post unliked" : "Post liked", post });
  } catch (error) {
    console.error("Error liking/unliking post:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function bookmarkPost(req, res) {
  const { postId } = req.params;
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = user.bookmark.includes(postId);

    if (isSaved) {
      user.bookmark = user.bookmark.filter((id) => id !== postId);
    } else {
      user.bookmark.push(postId);
    }
    await user.save();
    res.status(200).json({ message: isSaved ? "Post Removed" : "Post Saved" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getBookmarkedPosts(req, res) {
  const { bookmark } = req.user;
  try {
    if (bookmark.length === 0) {
      return res.status(200).json({ message: "No Bookmared Posts" });
    }

    const posts = await Post.find({ _id: { $in: bookmark } })
      .populate({
        path: "user",
        select: "name username profilePicturePath isAdmin",
      })
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function deletePost(req, res) {
  const { postId } = req.params;
  const { userId, isAdmin } = req.user;

  try {
    // Validate if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId && !isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);
    await User.updateMany(
      { bookmark: postId },
      { $pull: { bookmark: postId } },
      { multi: true }
    );
    return res.status(200).json({ message: "Post deleted", post });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// /** COMMENTS */
// const addComment = () => {
//   try {
//     const { text, isQuote } = req.body;
//   } catch (error) {}
// };
