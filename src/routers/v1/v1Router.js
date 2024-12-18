import express from "express";
import userRouter from "../v1/user.js";
import postRouter from "../v1/post.js";
const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
