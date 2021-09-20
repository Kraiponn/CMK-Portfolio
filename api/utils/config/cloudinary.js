import dotenv from "dotenv";
import multer from "multer";
import cloudinary from "cloudinary";
import ErrorRespose from "../handle/ErrorResponse";

// Loading environment values
dotenv.config();

// Config cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Config Uploader
const uploader = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(
        new ErrorRespose(
          "Please upload an image in type (.jpg|.jpeg|.png|.gif)",
          400
        ),
        false
      );
    }
  },
  limits: {
    fileSize: parseInt(process.env.FILE_UPLOAD_LIMIT_SIZE),
  },
});

export { uploader, cloudinary };
