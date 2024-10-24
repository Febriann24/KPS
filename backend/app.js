import multer from 'multer';
import path from 'path'; // Import path for handling file extensions

// Define storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the destination folder
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname; // Keep the original name as is
        cb(null, originalName); // Save the file with its original name
    }
});

// File filter to only accept PNG and JPG images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg']; // Accept both PNG and JPG
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only .png and .jpg files are allowed!'), false); // Reject the file
    }
};

// Create the multer instance with storage and file filter
const upload = multer({ 
    storage,
    fileFilter,
}).single('file'); // Specify the field name to expect

export default upload;
