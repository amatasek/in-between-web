import React, { useState, useRef } from 'react';
import styles from './styles/FileUpload.module.css';

const FileUpload = ({ 
  onUpload, 
  currentFileUrl, 
  acceptedFileTypes, 
  label,
  previewType = 'image' // 'image', 'audio', or 'none'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('[FileUpload] No file selected');
      return;
    }
    
    console.log('[FileUpload] File selected:', {
      name: file.name,
      type: file.type,
      size: file.size
    });
    
    setError(null);
    setIsUploading(true);
    
    try {
      console.log('[FileUpload] Calling onUpload function');
      const success = await onUpload(file);
      console.log('[FileUpload] Upload result:', success);
      
      if (!success) {
        console.error('[FileUpload] Upload failed');
        setError('Failed to upload file. Please try again.');
      } else {
        console.log('[FileUpload] Upload successful');
      }
    } catch (err) {
      console.error('[FileUpload] Error uploading file:', err);
      setError('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const renderPreview = () => {
    if (!currentFileUrl) return null;
    
    if (previewType === 'image') {
      return (
        <div className={styles.previewContainer}>
          <img 
            src={currentFileUrl} 
            alt="Preview" 
            className={styles.imagePreview} 
          />
        </div>
      );
    } else if (previewType === 'audio') {
      return (
        <div className={styles.previewContainer}>
          <audio 
            controls 
            src={currentFileUrl} 
            className={styles.audioPreview}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className={styles.fileUploadContainer}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        className={styles.fileInput}
      />
      
      <button 
        type="button" 
        onClick={handleButtonClick}
        className={styles.uploadButton}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : `Upload ${label}`}
      </button>
      
      {currentFileUrl && renderPreview()}
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
