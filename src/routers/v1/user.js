import express from "express";
import { getProfile, signin, signUp } from "../../controllers/userController";
import { validate } from "../../validators/zodValidator";
import { zodSignUpSchema } from "../../validators/zodSignupSchema";
import { zodSigninSchema } from "../../validators/zodSigninSchema";
const router = express.Router();

router.get("/profile", getProfile);

/**
 * @swagger
 * /users/signup:
 * post:
 *    summary:Signup a new user
 *    description:Singup a new user
 *
 */
router.post("/signup", validate(zodSignUpSchema), signUp);

/**
 * @swagger
 * /users/signin:
 *  post:
 *      summary: Signin a new user
 *      description: Signin a new user
 *
 */
router.post("/signin", validate(zodSigninSchema), signin);
export default router;
