const router = require("express").Router();
const { signupUser, loginUser } = require("../controllers/userControllers");
const multer = require("multer")
const { v4: uuidV4 } = require("uuid")
const uuid = uuidV4()
const path = require("path")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "images/")
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, uuid + ext)
    },
})
const upload = multer({ storage: storage})

router.post("/signup",upload.single("image"), signupUser);

router.post("/login", loginUser);

module.exports = router;
