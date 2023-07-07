const router = require("express").Router()
const { signupUser, loginUser } = require("../controllers/userControllers")

router.post("/signup", signupUser)

router.post("/login", loginUser)

module.exports = router