import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, text, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      name: user.name,
      username: user.username,
      profilePicturePath: user.profilePicturePath,
      picturePath: picturePath || "",
      text: text || "",
      likes: {},
      comments: [],
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
    const limit = parseInt(req.query.limit) || 4;

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
