import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

import { config } from "dotenv";

config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const userStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const postStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "posts",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const uploadUserImage = multer({ storage: userStorage });
export const uploadPostImage = multer({ storage: postStorage });
export default cloudinary;
