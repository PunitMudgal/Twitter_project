import cors from "cors";
import path from "path";
import multer from "multer";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { uploadPostImage, uploadUserImage } from "./lib/cloudinary.js";
import Auth from "./middleware/auth.js";
import cookieParser from "cookie-parser";
import authRoutes from "./router/auth.js";
import userRoutes from "./router/user.js";
import postRouter from "./router/post.js";
import connectDb from "./lib/dbConnection.js";
import messageRouter from "./router/message.js";
import { updateUser } from "./controllers/user.js";
import { createPost } from "./controllers/post.js";
import conversationRouter from "./router/conversation.js";

dotenv.config();
const app = express();

/** MIDDLEWARES */
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "10mb" })); // To handle Base64 strings
app.use(morgan("common"));
app.disable("x-powered-by");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/** FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/assets");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

/** ROUTES WITH FILES */
app.patch(
  "/user/update",
  Auth,
  uploadUserImage.fields([
    { name: "profilePicturePath", maxCount: 1 },
    { name: "coverPicture", maxCount: 1 },
  ]),
  updateUser
);

app.post(
  "/post",
  Auth,
  uploadPostImage.fields([{ name: "picturePath", maxCount: 1 }]),
  createPost
);

// ROUTES
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);

// DATABASE SETUP
const port = process.env.PORT || 8080;

connectDb().then(() => {
  try {
    app.listen(port, () => {
      console.log(`server started at ${process.env.BACKEND_SERVER_URL + port}`);
    });
  } catch (error) {
    console.log(
      "cannot connect to the server, Please check your Internet Server",
      error
    );
  }
});
