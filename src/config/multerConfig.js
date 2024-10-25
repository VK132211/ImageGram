const multer = require("multer");
import { cloudinaryConfig } from "./cloudinaryConfig";

// Multer configuration to store file in memory
const storage = multer.memoryStorage();
export const upload = multer({ storage });

const cloudinary = cloudinaryConfig;

// Middleware to handle Cloudinary upload
export const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file provided" });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "ImageGram", // Specify folder name here
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(req.file.buffer); // Pass file buffer to Cloudinary upload stream
    });

    req.imageUrl = result.secure_url; // Set the Cloudinary URL on req for further use
    next();
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ message: "Cloudinary upload failed" });
  }
};
