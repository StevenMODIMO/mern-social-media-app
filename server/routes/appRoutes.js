const router = require("express").Router();
const {
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
  deleteComment,
  likeComment,
  unlikeComment,
  followUser,
  unfollowUser,
  searchUsers,
  deleteUser,
} = require("../controllers/appControllers");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getAllPosts);

router.get("/users", getallUsers);

router.get("/user/:id", getSingleUser);

router.post("/post", createPost);

router.post("/like/:id", likePost);

router.post("/unlike/:id", unlikePost);

router.delete("/delete/:id", deletePost);

router.post("/save-post/:id", savePost);

router.delete("/unsave-post/:id", unsavePost);

router.post("/comment/:id", commentPost);

router.post("/delete-comment/:post_id/:comment_id", deleteComment);

router.post("/like-comment/:post_id/:comment_id", likeComment);

router.post("/unlike-comment/:post_id/:comment_id", unlikeComment);

router.post("/follow/:username", followUser);

router.post("/unfollow/:username", unfollowUser);

router.post("/search/:username", searchUsers);

router.delete("/delete-user/:id", deleteUser);

module.exports = router;
