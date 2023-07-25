const router = require("express").Router();
const {
  getAllPosts,
  findByUsername,
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
  searchUsers,
  deleteUser,
  readNotification
} = require("../controllers/appControllers");
const { v4: uuidV4 } = require("uuid");
const uuid = uuidV4();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "posts");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuid + ext);
  },
});

const upload = multer({ storage: storage });

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getAllPosts);

router.get("/:username", findByUsername);

router.get("/users", getallUsers);

router.get("/user/:id", getSingleUser);

router.post("/post", upload.single("post_image"), createPost);

router.post("/like/:id", likePost);

router.post("/unlike/:id", unlikePost);

router.delete("/delete/:id", deletePost);

router.post("/save-post/:id", savePost);

router.post("/unsave-post/:id", unsavePost);

router.post("/comment/:id", commentPost);

router.get("/comments/:id", getComments);

router.post("/delete-comment/:post_id/:comment_id", deleteComment);

router.post("/like-comment/:post_id/:comment_id", likeComment);

router.post("/follow/:username", followUser);

router.post("/unfollow/:username", unfollowUser);

router.post("/search/:username", searchUsers);

router.delete("/delete-user/:id", deleteUser);

router.post("/read/:id", readNotification)

module.exports = router;
