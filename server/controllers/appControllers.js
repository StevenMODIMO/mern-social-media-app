const App = require("../models/appModel");
const User = require("../models/userModel");

const getAllPosts = async (req, res) => {
  try {
    const getPosts = await App.find({}).sort({ createdAt: -1 });
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createPost = async (req, res) => {
  const username = req.user.username;
  const { post } = req.body;
  try {
    const newPost = await App.create({ posted_by: username, post: post });
    await User.findOneAndUpdate(
      { username },
      {
        $push: {
          posts: { post, post_id: newPost._id },
        },
      }
    );
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
    const user = likePost.posted_by;
    const post = await User.findOneAndUpdate(
      { username: user, "posts.post_id": id },
      { $inc: { "posts.$.likes": 1 } },
      { new: true }
    );
    res.status(200).json(post);
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
    const user = unlikePost.posted_by;
    const post = await User.findOneAndUpdate(
      { username: user, "posts.post_id": id },
      { $inc: { "posts.$.likes": -1 } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.statua(400).json(error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletePost = await App.findOneAndDelete({ _id: id }, { new: true });
    const user = deletePost.posted_by
    await User.findOneAndDelete({username: user},{ $pull: {
        posts: {
            post_id: id
        }
    }}, { new: true})
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

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await User.findOneAndDelete({ _id: id });
    res.status(200).json(del);
  } catch (error) {
    res.statsu(400).json(error);
  }
};

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
  deleteUser,
};
