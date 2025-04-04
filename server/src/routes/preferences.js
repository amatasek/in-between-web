const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// We'll use the services injected by the middleware via req.services

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

// Get all user preferences
router.get('/', authenticateToken, async (req, res) => {
  try {
    const databaseService = req.services.database;
    const preferences = await databaseService.getPreferences(req.userId);
    res.json(preferences);
  } catch (error) {
    console.error('[Preferences] Error getting preferences:', error);
    res.status(500).json({ message: 'Failed to get preferences' });
  }
});

// We'll use the filesDir from app.locals, which is configured in index.js
const getFilesDir = (req) => {
  return req.app.locals.filesDir || path.join(__dirname, '../../../files');
};

console.log(`[Preferences] Will use files directory from app.locals`);

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Get the files directory from app.locals
    const filesDir = getFilesDir(req);
    
    // Create type-specific subdirectories
    let typeDir = '';
    
    if (file.mimetype.startsWith('image/')) {
      typeDir = 'images';
    } else if (file.mimetype.startsWith('audio/')) {
      typeDir = 'audio';
    } else {
      typeDir = 'other';
    }
    
    const destPath = path.join(filesDir, typeDir);
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    const userId = req.userId;
    const preferenceType = req.params.key;
    const fileExt = path.extname(file.originalname);
    const fileName = `${userId}_${preferenceType}_${Date.now()}${fileExt}`;
    cb(null, fileName);
  }
});

// File filter to restrict file types
const fileFilter = (req, file, cb) => {
  const preferenceType = req.params.key;
  
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

// Debug middleware to log request details
const logRequestDetails = (req, res, next) => {
  console.log('[Preferences] Request received:', {
    method: req.method,
    path: req.path,
    params: req.params,
    contentType: req.headers['content-type'],
    hasFile: req.file ? true : false,
    bodyKeys: Object.keys(req.body || {})
  });
  next();
};

// Test endpoint for file uploads
router.post('/test-upload', authenticateToken, (req, res) => {
  console.log('[Preferences] Test upload endpoint hit');
  
  // Use multer to handle the file upload
  const uploadHandler = upload.single('file');
  
  uploadHandler(req, res, (err) => {
    if (err) {
      console.error('[Preferences] Test upload error:', err);
      return res.status(400).json({ 
        message: err.message || 'Error uploading file'
      });
    }
    
    console.log('[Preferences] Test upload request details:', {
      body: req.body,
      file: req.file ? {
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size
      } : 'No file'
    });
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Return success response
    res.json({ 
      message: 'Test file upload successful',
      file: {
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      }
    });
  });
});

// Update a specific preference
router.post('/:key', authenticateToken, logRequestDetails, (req, res) => {
  const { key } = req.params;
  console.log(`[Preferences] Processing request for key: ${key}`);
  
  // Check if this is a file upload preference
  const isFileUpload = ['profileImg', 'twoSecondPotGif', 'twoSecondPotMp3'].includes(key);
  
  if (isFileUpload) {
    console.log(`[Preferences] Handling file upload for: ${key}`);
    // Handle file upload
    const uploadHandler = upload.single('file');
    
    uploadHandler(req, res, async (err) => {
      if (err) {
        console.error('[Preferences] Error uploading file:', err);
        return res.status(400).json({ 
          message: err.message || 'Error uploading file'
        });
      }
      
      console.log('[Preferences] Upload handler processed request:', {
        hasFile: req.file ? true : false,
        fileName: req.file ? req.file.originalname : 'none',
        fileSize: req.file ? req.file.size : 0
      });
      
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      try {
        const databaseService = req.services.database;
        
        // Generate the URL for the uploaded file
        // Extract just the filename and type directory
        const typeDir = req.file.mimetype.startsWith('image/') ? 'images' : 
                       req.file.mimetype.startsWith('audio/') ? 'audio' : 'other';
        const filename = req.file.filename;
        const fileUrl = `/files/${typeDir}/${filename}`;
        console.log(`[Preferences] Generated file URL: ${fileUrl}`);
        
        // Update the user's preference with the file URL
        const result = await databaseService.updatePreference(req.userId, key, fileUrl);
        
        res.json({ 
          message: 'File uploaded successfully',
          fileUrl: fileUrl,
          preferences: result.preferences
        });
      } catch (error) {
        console.error('[Preferences] Error saving file info:', error);
        res.status(500).json({ message: 'Error saving file information' });
      }
    });
  } else {
    // Handle regular preference update
    (async () => {
      try {
        // Check if we have a value in the request body
        const { value } = req.body;
        console.log(`[Preferences] Regular preference update for ${key}:`, { value });
        
        if (value === undefined) {
          console.error(`[Preferences] Value is missing for ${key} update`);
          return res.status(400).json({ message: 'Value is required for non-file preferences' });
        }
        
        const databaseService = req.services.database;
        const result = await databaseService.updatePreference(req.userId, key, value);
        
        res.json(result.preferences);
      } catch (error) {
        console.error('[Preferences] Error updating preference:', error);
        res.status(500).json({ message: 'Failed to update preference' });
      }
    })();
  }
});

module.exports = router;
