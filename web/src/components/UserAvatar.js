import React from 'react';
import styles from './styles/UserAvatar.module.css';

/**
 * UserAvatar component displays a user's profile image or their initials if no image is available.
 * It can be used in various contexts like the lobby, player list, results screen, etc.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - User object containing username and profileImg
 * @param {string} props.size - Size of the avatar ('small', 'medium', 'large')
 * @param {boolean} props.showName - Whether to display the username next to the avatar
 * @param {string} props.namePosition - Position of the username ('right', 'below')
 * @param {string} props.className - Additional CSS class for styling
 */
const UserAvatar = ({ 
  user, 
  size = 'medium', 
  showName = true, 
  namePosition = 'right',
  className = ''
}) => {
  if (!user) return null;
  
  const { username, profileImg } = user;
  const initials = getInitials(username || 'Unknown');
  const sizeClass = styles[size] || styles.medium;
  const containerClass = showName ? styles[`container${namePosition.charAt(0).toUpperCase() + namePosition.slice(1)}`] : '';
  
  // Format the image URL to point to the server
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  
  // Handle different URL formats
  let formattedImageUrl = null;
  if (profileImg) {
      // If the URL already starts with http, use it as is
      if (profileImg.startsWith('http')) {
        formattedImageUrl = profileImg;
      } 
      // If the URL contains /uploads/, replace it with /files/
      else if (profileImg.includes('/uploads/')) {
        // Extract just the filename from the path
        const filename = profileImg.split('/').pop();
        formattedImageUrl = `${API_URL}/files/images/${filename}`;
      }
      // Otherwise, just append the URL to the API_URL
      else {
        formattedImageUrl = `${API_URL}${profileImg}`;
      }
    }
  }
  
  console.log('[UserAvatar] Image URL:', { 
    raw: profileImg, 
    formatted: formattedImageUrl,
    apiUrl: API_URL
  });
  
  return (
    <div className={`${styles.userAvatarContainer} ${containerClass} ${className}`}>
      <div className={`${styles.avatar} ${sizeClass}`}>
        {formattedImageUrl ? (
          <img 
            src={formattedImageUrl} 
            alt={`${username}'s avatar`} 
            className={styles.avatarImage}
            onError={(e) => {
              console.error(`Failed to load profile image for ${username}:`, e);
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={styles.initialsPlaceholder}
          style={{ display: formattedImageUrl ? 'none' : 'flex' }}
        >
          {initials}
        </div>
      </div>
      
      {showName && (
        <div className={styles.username}>
          {username || 'Unknown'}
        </div>
      )}
    </div>
  );
};

// Helper function to get initials from a name
const getInitials = (name) => {
  if (!name) return '?';
  
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export default UserAvatar;
