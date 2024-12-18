import express from "express";
import upload, { uploadToCloudinary } from "../src/config/multerConfig";
import { createPost, deletePost, getAllPosts, updatePost } from "../../controllers/postController.js";
import { validate } from "../../validators/zodValidator.js";
import { zodPostSchema } from "../../validators/zodPostSchema.js";
import { isAdmin, isAuthenticated } from "../../middlewares/authMiddleware.js";
const router = express.Router();
/**
 * @swagger
 * /posts:
 *  post:
 *      summary: Create a new post
 *      description: Create a new post
 *
 */
router.post("/", isAuthenticated, upload.single("image"), uploadToCloudinary, validate(zodPostSchema), createPost);

/**
 * @swagger
 * /posts:
 *  get:
 *      summary: Get all posts
 *      description: Get all posts by a user
 *
 */
router.get("/", getAllPosts);

router.delete("/:id", isAuthenticated, deletePost);

router.put("/:id", isAuthenticated, isAdmin, upload.single("image"), uploadToCloudinary, updatePost);

export default router;
