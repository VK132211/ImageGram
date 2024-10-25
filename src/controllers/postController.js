import { createPostService } from "../services/postService";

export async function createPost(req, res) {
  console.log(req.file);
  const post = createPostService({
    caption: req.body.caption,
    image: req.file.location,
  });
  return res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
}
