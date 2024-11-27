import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
import cloudinary from "../lib/cloudinary.js";

/** GET USER  /user/:id */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select("-password -bookmark -email")
      .lean();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/** SEARCH USER */
export const searchUser = async (req, res) => {
  try {
    const { name } = req.params;
    const users = await User.find({
      $or: [
        { username: { $regex: `^${name}`, $options: "i" } },
        { name: { $regex: `^${name}`, $options: "i" } },
      ],
      // $options: 'i' makes it case-insensitive
    })
      .select("-password -bookmark -email")
      .lean();
    if (!users || users.length === 0)
      return res.status(404).json({ err: "user not found!" });
    return res.status(201).json(users);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// follow
/** put -> user/:id/follow */
export const followUser = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  if (userId !== id) {
    try {
      const user = await User.findById(id).select("-password -bookmark -email");

      const currentUser = await User.findById(userId);

      if (!user.follower.includes(userId)) {
        await user.updateOne({ $push: { follower: userId } });
        await currentUser.updateOne({ $push: { following: id } });
        console.log("user == = ", user);
        return res.status(200).json(user);
      } else {
        return res
          .status(403)
          .json({ message: "You already follow this user" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(403).json({ message: "You can't follow yourself" });
  }
};

// unfollow
/** put -> user/:id/unfollow */
export const unfollowUser = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  if (userId !== id) {
    try {
      const user = await User.findById(id).select("-password -bookmark -email");

      const currentUser = await User.findById(userId);

      if (user.follower.includes(userId)) {
        await user.updateOne({ $pull: { follower: userId } });
        await currentUser.updateOne({ $pull: { following: id } });
        return res.status(200).json(user);
      } else {
        return res.status(403).json({ message: "you don't follow this user" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(403).json({ message: "you can't unfollow yourself!" });
  }
};

/** UPDATE USER /updateUser */
export const updateUser = async (req, res) => {
  const { userId, name, bio, from } = req.body;
  const { userId: loggedInUserId, isAdmin } = req.user;
  try {
    if (loggedInUserId !== userId && !isAdmin) {
      return res.status(403).json({ message: "You can update your own data" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Update user details
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (from) user.from = from;

    if (req.files["profilePicturePath"]) {
      user.profilePicturePath = req.files["profilePicturePath"][0].path;
    }

    if (req.files["coverPicture"]) {
      user.coverPicture = req.files["coverPicture"][0].path;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFriendSuggestions = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const currentUser = await User.findById(userId).select("following").lean();

    const followingList = currentUser.following || [];

    // fetch three random user not in the following list
    const suggestions = await User.aggregate([
      { $match: { _id: { $nin: [...followingList, userId] } } }, // Exclude following and current user
      { $sample: { size: 3 } }, // Get 3 random users
      {
        $project: {
          username: 1,
          name: 1,
          _id: 1,
          profilePicturePath: 1,
          isAdmin: 1,
        },
      },
    ]);
    // .lean();
    return res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error fetching friend suggestions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user's all following at once -> /user/getAllFollowing
export const getAllFollowing = async (req, res) => {
  const { following } = req.body;
  try {
    const followings = await User.find({ _id: { $in: following } })
      .select("name username profilePicturePath isAdmin _id")
      .lean();
    res.status(200).json(followings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch friends data", error });
  }
};

// Get user's all follower at once -> /user/getAllFollower
export const getAllFollower = async (req, res) => {
  const { follower } = req.body;
  try {
    const followers = await User.find({ _id: { $in: follower } })
      .select("name username profilePicturePath isAdmin _id")
      .lean();
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch friends data", error });
  }
};

// delete -> /deleteUser/:userId
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (!req.user) {
    return res.status(401).json("Unauthorized");
  }

  const { _id: loggedInUserId, isAdmin } = req.user;
  if (userId === loggedInUserId || isAdmin) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedUser = await User.findByIdAndDelete(userId).session(session);
      if (!deletedUser) {
        await session.abortTransaction();
        return res.status(404).json("User not found");
      }

      await User.updateMany(
        { following: userId },
        { $pull: { following: userId } },
        { session }
      );

      await Post.deleteMany({ userId }).session(session);

      await session.commitTransaction();
      res.status(200).json("Account deleted successfully");
    } catch (err) {
      await session.abortTransaction();
      console.error("Error during user deletion:", err.message);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      session.endSession();
    }
  } else {
    return res.status(403).json("You can only delete your account!");
  }
};

export const getAllUsers = async (req, res) => {
  const { _id } = req.user;
  try {
    const users = await User.find({ _id: { $ne: _id } })
      .select("name username profilePicturePath isAdmin _id")
      .lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users data", error });
  }
};
