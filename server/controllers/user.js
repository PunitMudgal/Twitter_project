import User from "../models/User.js";

/** GET USER  /user/:id */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
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
    }).lean(); // lean() to return plain JavaScript objects instead of Mongoose documents
    if (!users || users.length === 0)
      return res.status(404).send({ err: "user not found!" });
    return res.status(201).send(users);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

// follow
/** put -> user/:id/follow */
export const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.follower.includes(req.body.userId)) {
        await user.updateOne({ $push: { follower: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        return res.status(200).json({ message: "User has been followed" });
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
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.follower.includes(req.body.userId)) {
        await user.updateOne({ $pull: { follower: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        return res.status(200).json({ message: "user has been unfollowed" });
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
  try {
    if (req.body.userId === req.user.userId || req.body.isAdmin) {
      const body = req.body;

      // handling file uploads
      const picture = req.files["picture"] ? req.files["picture"][0] : null;
      const backgroundPhoto = req.files["backgroundPhoto"]
        ? req.files["backgroundPhoto"][0]
        : null;

      // if files are uploaded, include them in the update body
      if (picture) body.picture = `/assets/${picture.filename}`;
      if (backgroundPhoto)
        body.backgroundPhoto = `/assets/${backgroundPhoto.filename}`;

      //update user
      const updateInfo = await User.updateOne({ _id: req.body.userId }, body);
      if (updateInfo.modifiedCount > 0)
        return res.status(201).send({ msg: "record updated!", updateInfo });
      else return res.status(401).send({ error: "couldn't update user info" });
    } else return res.status(401).send({ error: "user not authorized!" });
  } catch (error) {
    return res.status(501).send({ error });
  }
};

export const getFriendSuggestions = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(req.user);
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
  const { userId: loggedInUserId, isAdmin } = req.user;
  if (userId === loggedInUserId || isAdmin) {
    try {
      await User.findByIdAndDelete(userId);
      res.status(200).json("Account deleted successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only delete your account!");
  }
};

export const getAllUsers = async (req, res) => {
  const { userId } = req.user;
  try {
    const users = await User.find({ _id: { $ne: userId } })
      .select("name username profilePicturePath isAdmin _id")
      .lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users data", error });
  }
};
