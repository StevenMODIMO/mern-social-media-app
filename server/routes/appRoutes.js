const router = require("express").Router();
const {
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
} = require("../controllers/appControllers");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getAllPosts)

router.post("/post", createPost);

router.post("/like/:id", likePost)

router.post("/unlike/:id", unlikePost)

router.delete("/delete/:id", deletePost)

module.exports = router;
