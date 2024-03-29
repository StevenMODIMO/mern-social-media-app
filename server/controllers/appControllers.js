const App = require("../models/appModel");
const User = require("../models/userModel");
const path = require("path");

const getAllPosts = async (req, res) => {
  try {
    const getPosts = await App.find({}).sort({ createdAt: -1 });
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};


const getallUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createPost = async (req, res) => {
  const username = req.user.username;
  const { post, tags } = req.body;
  let image_path;

  if (req.file) {
    image_path = path.normalize(req.file.path).replace(/\\/g, "/");
  }

  try {
    const newPost = await App.create({
      posted_by: username,
      post: post,
      post_image_url: image_path,
      tags: tags,
    });
    await User.findOneAndUpdate(
      { username },
      {
        $push: {
          posts: { post, post_id: newPost._id, tags },
        },
      }
    );

    const notificationData = {
      title: "New Post",
      message: "You have created a new post.",
      createdAt: new Date(),
    };

    await User.findOneAndUpdate(
      { username },
      {
        $push: {
          notifications: notificationData,
        },
      }
    );

    const getPosts = await App.find({}).sort({ createdAt: -1 });
    res.status(200).json(getPosts);
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

    const notificationData = {
      title: "Post Liked",
      message: "Somebody liked your post.",
      createdAt: new Date(),
    };

    await User.findOneAndUpdate({ username: user}, {
      $push: {
        notifications: notificationData,
      }
    })
    
    const getPosts = await App.find({}).sort({ createdAt: -1 });
    res.status(200).json(getPosts);
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
    const getPosts = await App.find({}).sort({ createdAt: -1 });
    res.status(200).json(getPosts);
  } catch (error) {
    res.statua(400).json(error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletePost = await App.findOne({ _id: id });

    const user = deletePost.posted_by;

    await User.findOneAndUpdate(
      { username: user },
      {
        $pull: {
          posts: {
            post_id: id,
          },
        },
      },
      { new: true }
    );

    const notificationData = {
      title: "Post Removed",
      message: "You removed a post.",
      createdAt: new Date(),
    };

    await User.findOneAndUpdate({ username: user}, {
      $push: {
        notifications: notificationData,
      }
    })

    const getPosts = await App.find({}).sort({ createdAt: -1 });
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const savePost = async (req, res) => {
  const { id } = req.params;
  const username = req.user.username;
  try {
    const savePost = await User.findOneAndUpdate(
      { username },
      {
        $push: {
          saved_post: {
            post_id: id,
          },
        },
      },
      { new: true }
    );

    const appStats = await App.findOneAndUpdate(
      { _id: id },
      { $inc: { saved: 1 } },
      { new: true }
    );

    const user = appStats.posted_by;

    await User.findOneAndUpdate(
      { username: user, "posts.post_id": id },
      { $inc: { "posts.$.saved": 1 } }
    );

    const getPosts = await App.find({}).sort({ createdAt: -1 });
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const unsavePost = async (req, res) => {
  const { id } = req.params;
  const username = req.user.username;
  try {
    const unsave = await User.findOneAndUpdate(
      { username },
      {
        $pull: {
          saved_post: {
            post_id: id,
          },
        },
      },
      { new: true }
    );

    const appStats = await App.findOneAndUpdate(
      { _id: id },
      { $inc: { saved: -1 } },
      { new: true }
    );

    const user = appStats.posted_by;

    await User.findOneAndUpdate(
      { username: user, "posts.post_id": id },
      { $inc: { "posts.$.saved": -1 } }
    );

    const getPosts = await App.find({}).sort({ createdAt: -1 });
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const username = req.user.username;
  try {
    const commentPost = await App.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          comments: {
            commented_by: username,
            comment: comment,
          },
        },
      },
      { new: true }
    );

    const user = commentPost.posted_by;
    await User.findOneAndUpdate(
      { username: user, "posts.post_id": id },
      {
        $push: {
          "posts.$.comments": {
            commented_by: username,
            comment: comment,
          },
        },
      }
    );
    const getPosts = await App.find({}).sort({ createdAt: -1 });
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getComments = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await App.findOne({ _id: id });
    res.status(200).json(comments.comments);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteComment = async (req, res) => {
  const { post_id } = req.params;
  const { comment_id } = req.params;
  try {
    const deleteComment = await App.findOneAndUpdate(
      { _id: post_id },
      {
        $pull: {
          comments: {
            _id: comment_id,
          },
        },
      },
      { new: true }
    );

    const comments = await App.findOne({ _id: post_id });
    res.status(200).json(comments.comments);
  } catch (error) {
    res.status(400).json(error);
  }
};

const likeComment = async (req, res) => {
  const { post_id } = req.params;
  const { comment_id } = req.params;
  try {
    const like = await App.findOneAndUpdate(
      { _id: post_id, "comments._id": comment_id },
      { $inc: { "comments.$.likes": 1 } },
      { new: true }
    );
    const comments = await App.findOne({ _id: post_id });
    res.status(200).json(comments.comments);
  } catch (error) {
    res.status(400).json(error);
  }
};

const followUser = async (req, res) => {
  const user = req.user.username;
  const { username } = req.params;
  try {
    const follow = await User.findOneAndUpdate(
      { username: username },
      {
        $push: {
          followers: {
            username: user,
          },
        },
      },
      { new: true }
    );
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

const unfollowUser = async (req, res) => {
  const user = req.user.username;
  const { username } = req.params;
  try {
    const getUserInfo = await User.findOne({ username: user });
    const info = getUserInfo.username;
    const unfollow = await User.findOneAndUpdate(
      { username: username },
      {
        $pull: {
          followers: {
            username: info,
          },
        },
      },
      { new: true }
    );

    res.status(200).json(unfollow);
  } catch (error) {
    res.status(400).json(error);
  }
};



const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await User.findOneAndDelete({ _id: id });
    res.status(200).json(del);
  } catch (error) {
    res.status(400).json(error);
  }
};

const readNotification = async (req,res) => {
  const username = req.user.username
  const { id } = req.params
  try {
    const update = await User.findOneAndUpdate({ username, "notifications._id": id }, {
      $set: { "notifications.$.read": true}
    }, { new: true})

    const updated = await User.findOne({username })
    res.status(200).json(updated)
  } catch(error) {
    res.status(400).json(error)
  }
}


const findByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const users = await User.find({ username: { $regex: `^${username}`, $options: 'i' } });
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllPosts,
  getallUsers,
  getSingleUser,
  createPost,
  likePost,
  unlikePost,
  deletePost,
  savePost,
  unsavePost,
  commentPost,
  getComments,
  deleteComment,
  likeComment,
  followUser,
  unfollowUser,
  deleteUser,
  readNotification,
  findByUsername
};
