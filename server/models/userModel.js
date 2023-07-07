const mongoose = require("mongoose")
const validator = require("validator")
const bcrytp = require("bcrypt")

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    username: String,
    profile_url: String
})

userSchema.statics.signup = async function signup(email, password, username,profile_url) {
    if(!email || !password || !username) {
        throw Error("All fields must be filled.")
    }

    if(!validator.isEmail(email)) {
        throw Error("Invalid Email")
    }

    if(!validator.isStrongPassword(password)) {
        throw Error("Password must contain alaphanumeric and special characters")
    }

    const user = await this.findOne({ email })

    if(user) {
        throw Error("Email already in use")
    }

    const userName = await this.findOne({ username })

    if(userName) {
        throw Error("Username is taken")
    }

    const salt = await bcrytp.genSalt()
    const hash = await bcrytp.hash(password, salt)

    const final = await this.create({ email, password:hash, username, profile_url})

    return final
}

userSchema.statics.login = async function login(username, password) {
    if(!username || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ username })

    if(!user) {
        throw Error("Incorrect Username")
    }

    const match = await bcrytp.compare(password, user.password)

    if(!match) {
        throw Error("Incorrect password")
    }

    return user
}

module.exports = mongoose.model("User", userSchema)