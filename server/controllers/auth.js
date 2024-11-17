import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/** VERIFY USER */
export async function verifyUser(req, res, next) {
  try {
    const { email } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await User.findOne({ email });
    if (!exist) return res.status(404).send({ error: "user not found!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "error in finding user!" });
  }
}

/** GET ALL USERS */
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** REGISTER USER */
export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const checkEmail = await User.findOne({ email });
    const checkUsername = await User.findOne({ username });
    if (checkEmail || checkUsername)
      return res.status(400).send({ err: "user already exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // crerate new user
    const newUser = new User({
      name: "User" + Math.floor(Math.random() * 5000),
      email: email.toLowerCase(),
      password: passwordHash,
      username: username.toLowerCase(),
      bio: "",
      from: "",
    });

    // save new user & generate token
    newUser
      .save()
      .then(async () => {
        const user = await User.findOne({ username })
          .select("_id email username isAdmin")
          .lean();
        const token = jwt.sign(
          { userId: user._id, email, username, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "48h" }
        );
        res.status(201).json(token);
      })
      .catch((error) =>
        res.status(500).send({ err: "unable to save user", error })
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** LOGIN USER */
export async function login(req, res) {
  const { emailOrUsername, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername.toLowerCase() },
      ],
    });

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
