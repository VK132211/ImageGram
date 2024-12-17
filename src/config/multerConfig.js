const multer = require("multer");
const cloudinary = require("./cloudinaryConfig");
const { Readable } = require("stream");

// Use memory storage to avoid storing files on disk
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;

// Upload image to Cloudinary
export const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const uploadStream = cloudinary.uploader.upload_stream(
    { resource_type: "auto" },  // Let Cloudinary automatically detect file type
    (error, result) => {
      if (error) {
        return res.status(500).json({ success: false, message: "Error uploading to Cloudinary", error });
      }

      // Add Cloudinary image URL to the request object for further use
      req.file.location = result.secure_url;
      next();
    }
  );

  // Convert buffer into a readable stream
  const stream = Readable.from(req.file.buffer);
  stream.pipe(uploadStream);
};
