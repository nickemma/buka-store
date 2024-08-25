import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = 'uploads/';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up the multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   cb(null, path.join(__dirname, '../uploads')); // Specify the directory to save uploaded images
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Define a file filter to allow only specific file types (e.g., images)
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG files are allowed!'));
  }
};

// Set up the multer instance with storage, file filter, and file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
  fileFilter: fileFilter,
});

export default upload;
