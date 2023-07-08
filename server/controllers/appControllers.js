const App = require("../models/appModel");
const User = require("../models/userModel");

const getAllPosts = async (req, res) => {
  try {
    const getPosts = await App.find();
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createPost = async (req, res) => {
  const { post } = req.body;
  try {
    const newPost = await App.create({ posted_by: req.user, post: post });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json(error);
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const likePost = await App.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.status(200).json(likePost);
  } catch (error) {
    res.status(400).json(error);
  }
};

const unlikePost = async (req, res) => {
  const { id } = req.params;
  try {
    const unlikePost = await App.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: -1 } },
      { new: true }
    );
    res.status(200).json(unlikePost);
  } catch (error) {
    res.statua(400).json(error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletePost = await App.findOneAndDelete({ _id: id }, { new: true });
    res.status(200).json(deletePost);
  } catch (error) {
    res.status(400).json(error);
  }
};

const savePost = async (req, res) => {};

const unsavePost = async (req, res) => {};

const commentPost = async (req, res) => {};

const deleteComment = async (req, res) => {};

const likeComment = async (req, res) => {};

const unlikeComment = async (req, res) => {};

const followUser = async (req, res) => {};

const unfollowUser = async (req, res) => {};

const searchUsers = async (req, res) => {};

module.exports = {
  getAllPosts,
  createPost,
  likePost,
  unlikePost,
  deletePost,
  savePost,
  commentPost,
  likeComment,
  followUser,
  unfollowUser,
  searchUsers,
};
