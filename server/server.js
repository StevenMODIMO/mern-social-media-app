require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const appRoutes = require("./routes/appRoutes");
const path = require("path");
const User = require("./models/userModel")

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/auth", userRoutes);
app.use("/app", appRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message_from_server: "Hello Mern Social Media App Server" });
});

app.get("/images/:filepath", (req, res) => {
  const imagePath = path.join(__dirname, "images", req.params.filepath  );
  res.sendFile(imagePath);
});

app.get("/posts/:filepath", (req, res) => {
  const imagePath = path.join(__dirname, "posts", req.params.filepath  );
  res.sendFile(imagePath);
});

app.get("/username/:username", async (req, res) => {
  const { username } = req.params
  try {
    const image = await User.findOne({ username: username })
    const imagePath = image.image_path
    const profileImage = path.join(__dirname, imagePath  );
  res.sendFile(profileImage);
  } catch(error) {
    res.status(400).json(error)
  }
})

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
  });
});
