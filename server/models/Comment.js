import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profilePicturePath: {
      default: "",
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    replies: {
      type: Map,
      of: String,
    },
  },
  { timestamp: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;