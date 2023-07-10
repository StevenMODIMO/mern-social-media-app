const mongoose = require("mongoose");
const appSchema = new mongoose.Schema(
  {
    posted_by: String,
    post: String,
    post_image_url: String,
    comments: [
      {
        commented_by: String,
        comment: String,
        likes: { type: Number, default: 0 },
      },
    ],
    likes: { type: Number, default: 0 },
    saved: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("App", appSchema);
