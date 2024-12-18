import multer from "multer";
import cloudinary from "./cloudinaryConfig";
import { Readable } from "stream";

const storage = multer.memoryStorage();

// Initialize multer with memory storage
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Validate file type (only jpeg and png are allowed)
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      return cb(new Error("File type not supported"));
    }
    cb(null, true); // Accept file
  },
});

// Middleware to upload image to Cloudinary
export const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Create a unique filename using timestamp and random number
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

  // Set custom public_id (filename) to make it unique
  const publicId = `${file.fieldname}-${uniqueSuffix}`;

  const uploadStream = cloudinary.uploader.upload_stream(
    {
      resource_type: "auto", // Let Cloudinary automatically detect the file type
      public_id: publicId, // Set the custom public_id for uniqueness
      overwrite: true, // Optionally, prevent overwriting of existing files with the same public_id
    },
    (error, result) => {
      if (error) {
        return res.status(500).json({ success: false, message: "Error uploading to Cloudinary", error });
      }

      // Attach Cloudinary URL and public_id to the request file object for later use
      req.file.location = result.secure_url;
      req.file.public_id = result.public_id;
      next(); // Move to next middleware/handler
    }
  );

  // Convert buffer into a readable stream and pipe to Cloudinary
  const stream = Readable.from(req.file.buffer);
  stream.pipe(uploadStream);
};

// Export the multer upload instance to be used as middleware
export default upload;
