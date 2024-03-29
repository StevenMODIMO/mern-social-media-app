const mongoose = require("mongoose");
const validator = require("validator");
const bcrytp = require("bcrypt");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  username: String,
  image_path: String,
  followers: [
    {
      username: String,
    },
  ],
  following: [
    {
      username: String,
    },
  ],
  posts: [
    {
      post: String,
      post_image_url: String,
      comments: [
        {
          commented_by: String,
          comment: String,
          likes: { type: Number, default: 0 },
        },
      ],
      tags: [String],
      likes: { type: Number, default: 0 },
      saved: { type: Number, default: 0 },
      post_id: String,
    },
  ],
  saved_post: [
    {
      post_id: String,
    },
  ],
  notifications: [
    {
      title: String,
      message: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      read: { type: Boolean, default: false },
    },
  ],
});

userSchema.statics.signup = async function signup(
  email,
  password,
  username,
  image_path
) {
  if (!email || !password || !username) {
    throw Error("All fields must be filled.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must contain uppercase and lowercase letters ,numbers and special characters"
    );
  }

  const user = await this.findOne({ email });

  if (user) {
    throw Error("Email already in use");
  }

  const userName = await this.findOne({ username });

  if (userName) {
    throw Error("Username is taken");
  }

  const salt = await bcrytp.genSalt();
  const hash = await bcrytp.hash(password, salt);

  const notificationData = {
    title: "Account Created",
    message:
      "Your account has been successfully created. Explore mernSocial with freedom.",
    createdAt: new Date(),
  };

  const final = await this.create({
    email,
    password: hash,
    username,
    image_path,
    notifications: [notificationData],
  });

  return final;
};

userSchema.statics.login = async function login(username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("Incorrect Username");
  }

  const match = await bcrytp.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
