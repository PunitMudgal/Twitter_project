import jwt from "jsonwebtoken";
import User from "../models/User.js";

/** authorization middlewar */
export default async function Auth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId)
      .select("-password -bio -from -coverPicture")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    req.user.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: "Error in Auth middleware!", error });
  }
}
