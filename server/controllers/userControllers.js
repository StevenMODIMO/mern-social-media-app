require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET);
};

const signupUser = async (req, res) => {
  const { email, password, username, profile_url } = req.body;
  try {
    const user = await User.signup(email, password, username, profile_url);
    const token = createToken(user.username);
    const person = user.username;
    res.status(200).json({ person, token });
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
    res.status(200).json({ person, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
