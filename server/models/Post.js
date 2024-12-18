import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isQuote: {
      type: Boolean,
      default: false,
    },
    text: String,
    picturePath: {
      type: String,
      default: "",
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    repostCount: {
      type: Number,
      default: 0,
    },
    quoteCount: {
      type: Number,
      default: 0,
    },
    originalPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    isQuote: {
      type: Boolean,
      default: false,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null, // null means this is a root post, not a reply
    },
    rootPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null, // refers to the root post of the thread
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
