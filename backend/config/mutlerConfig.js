// const multer = require("multer");
// const path = require("path");

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../uploads')); // Use relative path and ensure the folder exists
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate a unique suffix
//     cb(null, uniqueSuffix + '-' + file.originalname); // Avoid filename conflicts
//   }
// });

// // Initialize multer with the storage configuration
// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
//   fileFilter: function (req, file, cb) { // Optional: filter file types
//     const fileTypes = /jpeg|jpg|png|gif/; // Define allowed file types
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = fileTypes.test(file.mimetype);
    
//     if (extname && mimetype) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only images are allowed!"));
//     }
//   }
// });

// module.exports = upload;