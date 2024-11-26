import mongoose from "mongoose";

const UserScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 15,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 35,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    follower: {
      type: Array,
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    profilePicturePath: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    bookmark: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserScheme);
export default User;
