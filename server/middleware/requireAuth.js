require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ error: "Authorization token is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { username } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ username }).select("username");
    next();
  } catch (error) {
    res.status(400).json({ error: "Request is not authorized" });
  }
};


module.exports = requireAuth