import express from "express";
import dotenv from "dotenv";
import connectDb from "./dbConnection.js";
import authRoutes from "./router/auth.js";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

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

/** ROUTES WITH FILES */

// ROUTES
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.status(201).json("hello khushi...");
});

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
