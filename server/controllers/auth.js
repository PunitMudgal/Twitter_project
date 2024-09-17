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
    const {
      name,
      email,
      username,
      password,
      follower,
      following,
      picturePath,
      location,
    } = req.body;

    const checkEmail = await User.findOne({ email });
    if (checkEmail) return res.status(400).send({ err: "user already exists" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: passwordHash,
      username,
      picturePath,
      follower,
      following,
      location,
    });

    newUser
      .save()
      .then(res.status(201).send({ msg: "user registered successful" }))
      .catch((error) =>
        res.status(500).send({ err: "unable to save user", error })
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** LOGIN USER */
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "user doesnot exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET
    );
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}
// tomorrow i'm gonna try to run this backend code in postman
