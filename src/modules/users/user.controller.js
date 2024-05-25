import userModel from "../../../db/models/user.model.js";
import postModel from "../../../db/models/post.model.js";
import commentModel from "../../../db/models/comment.model.js";
import bcrypt from "bcryptjs";

// =========================================== REGISTRATION ===========================================

export const registration = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ msg: "userName, email, and password are required" });
  }

  try {
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ msg: "SignUp Successful", user });
  } catch (error) {
    res.status(500).json({ msg: "Error during registration", error });
  }
};

// =========================================== LOGIN ===========================================

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const user = await userModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    res.status(200).json({ msg: "Login Successful", user });
  } catch (error) {
    res.status(500).json({ msg: "Error during login", error });
  }
};

// =========================================== LOG OUT ===========================================

export const logOut = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.destroy({
    where: { email },
  });
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  res.status(201).json({ msg: "LogOut Successfull", user });
};

// =========================================== GET USER POST WITH COMMENTS ===========================================

export const getUserPostWithComments = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user
    const user = await userModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Find the post of the user
    const post = await postModel.findOne({
      where: { authorId: id },
      include: {
        model: commentModel,
        attributes: ["id", "content"],
      },
    });

    if (!post) {
      return res.status(404).json({ msg: "Post not found for this user" });
    }

    res.status(200).json({ user, post });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error getting user, post, and comments", error });
  }
};
