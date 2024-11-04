import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, text, picturePath, isQuote, parentId } = req.body;
    const user = await User.findById(userId).select(
      "name username profilePicturePath isAdmin"
    );
    const newPost = new Post({
      userId,
      name: user.name,
      username: user.username,
      profilePicturePath: user.profilePicturePath,
      isAdmin: user.isAdmin,
      picturePath: picturePath || "",
      text: text || "",
      likes: {},
      comments: [],
      rootPostId: parentId || null,
      parentId: parentId || null,
      isQuote: isQuote || false,
    });
    await newPost.save();
    const post = await Post.find();
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
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Fetch user following list
    const user = await User.findById(userId).select("following").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({
      $or: [
        { userId: { $in: user.following } }, // posts from followed users
        { userId: userId }, // user's own posts
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Count total posts from following list and self
    const totalPosts = await Post.countDocuments({
      $or: [{ userId: { $in: user.following } }, { userId: userId }],
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
    const limit = parseInt(req.query.limit) || 4;

    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 }) // Sort by most recent
      .skip((page - 1) * limit) // Implement pagination
      .limit(limit) // Limit the number of posts per page
      .lean(); // Optimize performance with lean()

    res.status(200).json(posts);
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
  const { userId } = req.body;

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

// export async function getBookmarkedPosts(req, res) {
//   const { userId } = req.params;
//   try {
//     const user = await User.findById(userId).select("bookmark").lean();
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const bookmarkedPosts = await Post.find({
//       _id: { $in: user.bookmark },
//     }).lean();
//     res.status(200).json(bookmarkedPosts);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// }

export async function getBookmarkedPosts(req, res) {
  const { bookmark } = req.body;
  try {
    const bookmarkedPosts = await Post.find({
      _id: { $in: bookmark },
    }).lean();
    res.status(200).json(bookmarkedPosts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function deletePost(req, res) {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    // Validate if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId === userId) {
      await post.deleteOne();
      return res.status(200).json({ message: "Post deleted" });
    }

    const user = await User.findById(userId);
    if (user && user.isAdmin) {
      await post.deleteOne();
      return res.status(200).json({ message: "Post deleted" });
    }

    res.status(403).json({ message: "Unauthorized" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
