import { signinUserService, signupUserService } from "../services/userService";

export async function getProfile(req, res) {
  return res.status(501).json({
    success: false,
    message: "Not implemented",
  });
}

export async function signUp(req, res) {
  try {
    const user = await signupUserService(req.body);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function signin(req, res) {
  try {
    const response = await signinUserService(req.body);
    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: response,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
