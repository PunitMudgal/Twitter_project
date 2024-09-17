import jwt from "jsonwebtoken";

/** authorization middlewar */
export default async function Auth(req, res, next) {
  try {
    const token = req.headers.authorizatin.split(" ")[1];

    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed!" });
  }
}
