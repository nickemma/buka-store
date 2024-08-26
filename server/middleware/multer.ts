import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Extend the params type to include folder and format
interface CustomParams {
  folder: string;
  format: (req: any, file: any) => Promise<string>;
  public_id: (req: any, file: any) => string;
}

// Set up Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'uploads',
    format: async (req: any, file: any) => 'png', // Or dynamically choose file format
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  } as CustomParams, // Type assertion here
});

const upload = multer({ storage: storage });

export default upload;
