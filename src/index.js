const express = require("express");
const { default: connectDB } = require("./config/dbConfig");
import { createPost } from "../src/controllers/postController";
import upload, { uploadToCloudinary } from "../src/config/multerConfig";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json("Welcome");
});

app.post("/posts", upload.single("image"), uploadToCloudinary, createPost);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
