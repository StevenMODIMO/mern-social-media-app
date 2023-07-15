require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const path = require("path")

const createToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET);
};

const signupUser = async (req, res) => {
  const { email, password, username,  } = req.body;
  if(!req.file) {
    return res.status(400).json({error: "Image is required"})
  }
  const image_path = path.normalize(req.file.path).replace(/\\/g, "/");
  try {
    const user = await User.signup(email, password, username, image_path);
    const token = createToken(user.username);
    const person = user.username;
    const id = user._id
    res.status(200).json({ id, person, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user.username);
    const person = user.username;
    const id = user._id
    res.status(200).json({ id, person, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
