require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message_from_server: "Hello Mern Social Media App Server" });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
  });
});
