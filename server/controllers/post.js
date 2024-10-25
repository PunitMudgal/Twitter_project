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
    const { page = 1, limit = 4 } = req.qurey;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();
    res.status(200).json(posts);
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

    console.log(
      `Fetching posts for user ${userId}: page ${page}, limit ${limit}`
    );

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
// export async function likePost() {}
