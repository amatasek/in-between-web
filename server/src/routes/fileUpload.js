const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create type-specific subdirectories
    let typeDir = '';
    
    if (file.mimetype.startsWith('image/')) {
      typeDir = 'images';
    } else if (file.mimetype.startsWith('audio/')) {
      typeDir = 'audio';
    } else {
      typeDir = 'other';
    }
    
    const destPath = path.join(uploadsDir, typeDir);
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    const userId = req.userId;
    const preferenceType = req.params.preferenceType;
    const fileExt = path.extname(file.originalname);
    const fileName = `${userId}_${preferenceType}_${Date.now()}${fileExt}`;
    cb(null, fileName);
  }
});

// File filter to restrict file types
const fileFilter = (req, file, cb) => {
  const preferenceType = req.params.preferenceType;
  
  if (preferenceType === 'profileImg' && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else if (preferenceType === 'twoSecondPotGif' && file.mimetype === 'image/gif') {
    cb(null, true);
  } else if (preferenceType === 'twoSecondPotMp3' && 
            (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type for this preference'), false);
  }
};

// Configure multer with storage and file filter
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    // Get the auth service from the injected services
    const authService = req.services.auth;
    const decoded = authService.verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Handle file upload for preferences
router.post('/upload/:preferenceType', authenticateToken, (req, res) => {
  const uploadHandler = upload.single('file');
  
  uploadHandler(req, res, async (err) => {
    if (err) {
      console.error('[FileUpload] Error uploading file:', err);
      return res.status(400).json({ 
        message: err.message || 'Error uploading file'
      });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    try {
      const { preferenceType } = req.params;
      const databaseService = req.services.database;
      
      // Generate the URL for the uploaded file
      const fileUrl = `/uploads/${req.file.destination.split('/uploads/')[1]}/${req.file.filename}`;
      
      // Update the user's preference with the file URL
      await databaseService.updatePreference(req.userId, preferenceType, fileUrl);
      
      res.json({ 
        message: 'File uploaded successfully',
        fileUrl: fileUrl
      });
    } catch (error) {
      console.error('[FileUpload] Error saving file info:', error);
      res.status(500).json({ message: 'Error saving file information' });
    }
  });
});

module.exports = router;
