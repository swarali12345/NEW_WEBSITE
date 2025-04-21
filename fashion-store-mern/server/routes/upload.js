const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only! Please upload a jpg, jpeg, png, or webp file.');
  }
}

// Upload configuration
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  try {
    // Return the server URL path to the image
    const serverUrl = req.protocol + '://' + req.get('host');
    const imagePath = `/uploads/${req.file.filename}`;
    const fullPath = `${serverUrl}${imagePath}`;
    
    res.send(fullPath);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Error uploading file');
  }
});

module.exports = router; 