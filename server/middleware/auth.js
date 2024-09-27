import jwt from "jsonwebtoken";

/** authorization middlewar */
export default function Auth(req, res, next) {
  try {
    // Check if the authorization header exists
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing!" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed!" });
  }
}
