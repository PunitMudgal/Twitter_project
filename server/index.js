import path from "path";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import connectDb from "./dbConnection.js";
import authRoutes from "./router/auth.js";
import userRoutes from "./router/user.js";
import Auth from "./middleware/auth.js";
import { updateUser } from "./controllers/user.js";

dotenv.config();
const app = express();

/** MIDDLEWARES */
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("common"));
app.disable("x-powered-by");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/** FILE STORAGE */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/** ROUTES WITH FILES */
app.patch("/user/update", Auth, upload.single("picture"), updateUser);

// ROUTES
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// DATABASE SETUP
const port = process.env.PORT || 8080;

connectDb().then(() => {
  try {
    app.listen(port, () => {
      console.log(`server started at ${process.env.BACKEND_SERVER_URL + port}`);
    });
  } catch (error) {
    console.log("cannot connect to the server", error);
  }
});
