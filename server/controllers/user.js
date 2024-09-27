import User from "../models/User.js";

/** GET USER  /user/:id */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "this was id");
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/** UPDATE USER /updateUser */
export const updateUser = async (req, res) => {
  try {
    if (req.body.userId === req.user.userId || req.body.isAdmin) {
      const body = req.body;
      //update user
      const updateInfo = await User.updateOne({ _id: req.body.userId }, body);
      if (updateInfo.modifiedCount > 0)
        return res.status(201).send({ msg: "record updated!", updateInfo });
      else return res.status(401).send({ error: "couldn't update user info" });
    } else return res.status(401).send({ error: "user not authorized!" });
  } catch (error) {
    return res.status(501).send({ error });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({}); // Pass an empty filter to delete all documents
    return res.status(201).send({ msg: "Data deleted!" });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" });
  }
};
