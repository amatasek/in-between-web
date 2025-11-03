import styles from './Username.module.css';

/**
 * Username utility functions for handling discriminators
 * Usernames are stored as "BaseName#1234" but typically displayed as just "BaseName"
 */

/**
 * Parse a username into base and discriminator parts
 * @param {string} username - Full username (e.g., "Ninja#4729")
 * @returns {{base: string, discriminator: string|null, full: string}}
 */
export function parseUsername(username) {
  if (!username) {
    return { base: '', discriminator: null, full: '' };
  }

  const parts = username.split('#');

  if (parts.length === 2 && /^\d{4}$/.test(parts[1])) {
    return {
      base: parts[0],
      discriminator: parts[1],
      full: username
    };
  }

  // Legacy username without discriminator
  return {
    base: username,
    discriminator: null,
    full: username
  };
}

/**
 * Get display name (typically hides discriminator)
 * @param {string} username - Full username
 * @param {boolean} showDiscriminator - Force show discriminator
 * @returns {string} Display name
 */
export function getDisplayName(username, showDiscriminator = false) {
  const { base, discriminator } = parseUsername(username);

  if (showDiscriminator && discriminator) {
    return `${base}#${discriminator}`;
  }

  return base;
}

/**
 * Get discriminator only
 * @param {string} username - Full username
 * @returns {string|null} Discriminator or null
 */
export function getDiscriminator(username) {
  const { discriminator } = parseUsername(username);
  return discriminator;
}

/**
 * Check if username has a discriminator
 * @param {string} username - Full username
 * @returns {boolean}
 */
export function hasDiscriminator(username) {
  return getDiscriminator(username) !== null;
}

/**
 * Minimal Username component for consistent display of usernames with optional discriminator
 *
 * @param {Object} props - Component props
 * @param {string} props.username - Full username (e.g., "Player#1234")
 * @param {boolean} props.showDiscriminator - Whether to show the discriminator (default: false)
 * @param {string} props.className - Additional CSS class for the container
 */
const Username = ({ username, showDiscriminator = false, className = '' }) => {
  if (!username) return null;

  const displayName = getDisplayName(username);
  const discriminator = getDiscriminator(username);

  return (
    <span className={`${styles.username} ${className}`}>
      {displayName}
      {showDiscriminator && discriminator && (
        <span className={styles.discriminator}>#{discriminator}</span>
      )}
    </span>
  );
};

export default Username;
