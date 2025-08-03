import React, { useState } from 'react';
import styles from './styles/UserAvatar.module.css';

// No more hardcoded mapping needed - selectedTitle is now the actual title string from server

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
 * @param {boolean} props.showTitle - Whether to show the title
 */
const UserAvatar = ({ 
  user, 
  size = 'medium', 
  showName = true, 
  namePosition = 'right',
  className = '',
  showTitle = true
}) => {
  const [showPlayerCard, setShowPlayerCard] = useState(false);
  
  if (!user) return null;
  
  const { username, profileImg, selectedTitle, xp } = user;
  const initials = getInitials(username || 'Unknown');
  const sizeClass = styles[size] || styles.medium;
  const containerClass = showName ? styles[`container${namePosition.charAt(0).toUpperCase() + namePosition.slice(1)}`] : '';
  
  // Format the image URL to point to the server
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  
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

  
  return (
    <div className={`${styles.userAvatarContainer} ${containerClass} ${className}`}>
      <div 
        className={`${styles.avatar} ${sizeClass}`}
        onMouseEnter={() => setShowPlayerCard(true)}
        onMouseLeave={() => setShowPlayerCard(false)}
      >
        <div className={styles.avatarImageContainer}>
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

        {/* Player Card */}
        {showPlayerCard && (
          <div className={styles.playerCard}>
            <div className={styles.playerCardAvatar}>
              {formattedImageUrl ? (
                <img 
                  src={formattedImageUrl} 
                  alt={`${username}'s avatar`} 
                  className={styles.playerCardImage}
                />
              ) : (
                <div className={styles.playerCardInitials}>
                  {initials}
                </div>
              )}
            </div>
            <div className={styles.playerCardInfo}>
              <div className={styles.playerCardUsername}>
                {username || 'Unknown'}
              </div>
              {selectedTitle && (
                <div className={styles.playerCardTitle}>
                  {selectedTitle}
                </div>
              )}
              {xp !== undefined && (
                <div className={styles.playerCardXP}>
                  {xp.toLocaleString()} XP
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {showName && (
        <div className={styles.userInfo}>
          <div className={styles.username}>
            {username || 'Unknown'}
          </div>
          {showTitle && selectedTitle && (
            <div className={styles.userTitle}>
              {selectedTitle}
            </div>
          )}
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
