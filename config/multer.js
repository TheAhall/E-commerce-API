//multer.js
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        filename = uniqueSuffix + path.extname(file.originalname)
    }
});

// Set up file filter to allow only image files
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only images are allowed!');
    }
};

// Initialize Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit: 1MB
    fileFilter: fileFilter
});

module.exports = upload;
