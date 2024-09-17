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
      type: Array,
      default: [],
    },
    picturePath: {
      type: String,
      default: "",
    },
    location: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserScheme);
export default User;
