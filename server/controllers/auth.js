import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateToken } from "../lib/generateToken.js";

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

    if (newUser) {
      const token = generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        userId: newUser._id,
        name: newUser.name,
        username: newUser.username,
        profilePicturePath: newUser.profilePicturePath,
        isAdmin: newUser.isAdmin,
        token: token,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
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

    const token = generateToken(user._id, res);

    res.status(200).json({
      userId: user._id,
      name: user.name,
      username: user.username,
      profilePicturePath: user.profilePicturePath,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
