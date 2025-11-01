import { useState } from 'react';
import { API_URL } from '../config';
import { parseUsername } from './Username';
import { useAuth } from '../contexts/AuthContext';
import styles from './styles/UsernameChange.module.css';

const UsernameChange = ({ currentUsername, onUsernameChanged }) => {
  const [newUsername, setNewUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();

  const { base: currentBase, discriminator: currentDiscriminator } = parseUsername(currentUsername);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!token) {
      setError('You must be logged in to change your username');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/username`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username: newUsername })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to change username');
        return;
      }

      const { base: newBase, discriminator: newDiscriminator } = parseUsername(data.username);
      setSuccess(`Username changed to ${newBase}#${newDiscriminator}`);
      setNewUsername('');

      // Notify parent component
      if (onUsernameChanged) {
        onUsernameChanged(data.username);
      }

      // Refresh page after 1.5 seconds to update all user data
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h4 style={{ margin: 0 }}>Username</h4>
        <span style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem' }}>
          {currentBase}
          {currentDiscriminator && <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>#{currentDiscriminator}</span>}
        </span>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            name="new-display-name"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            minLength={2}
            maxLength={32}
            pattern="[a-zA-Z0-9_\-]+"
            required
            disabled={loading}
            readOnly
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-form-type="other"
            data-lpignore="true"
            data-1p-ignore="true"
            data-bwignore="true"
            style={{
              flexGrow: 1,
              flexShrink: 1,
              minWidth: 0,
              padding: '8px 14px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.2s, background 0.2s',
              height: '36px'
            }}
            onFocus={(e) => {
              e.target.removeAttribute('readonly');
              e.target.style.borderColor = 'var(--btn-tertiary-start)';
              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
            onBlur={(e) => {
              e.target.setAttribute('readonly', true);
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          />
          <button
            type="submit"
            disabled={loading || !newUsername.trim() || newUsername.trim() === currentBase}
            style={{
              background: (loading || !newUsername.trim() || newUsername.trim() === currentBase)
                ? '#95a5a6'
                : 'linear-gradient(to right, var(--btn-tertiary-start), var(--btn-tertiary-end))',
              color: 'var(--text-white)',
              border: 'none',
              borderRadius: '34px',
              padding: '8px 16px',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: (loading || !newUsername.trim() || newUsername.trim() === currentBase) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '120px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              flexShrink: 0,
              height: '36px'
            }}
            onMouseEnter={(e) => {
              if (!e.target.disabled) {
                e.target.style.background = 'linear-gradient(to right, var(--btn-tertiary-hover-start), var(--btn-tertiary-hover-end))';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.target.disabled) {
                e.target.style.background = 'linear-gradient(to right, var(--btn-tertiary-start), var(--btn-tertiary-end))';
                e.target.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? 'Saving...' : 'Change'}
          </button>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', opacity: 0.6 }}>
          2-32 characters • Letters, numbers, underscores, hyphens
        </div>

        {error && <div style={{
          padding: '10px 14px',
          background: 'rgba(220, 38, 38, 0.1)',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          borderRadius: '6px',
          color: '#f87171',
          fontSize: '0.875rem'
        }}>{error}</div>}

        {success && <div style={{
          padding: '10px 14px',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '6px',
          color: '#86efac',
          fontSize: '0.875rem'
        }}>{success}</div>}
      </form>
    </>
  );
};

export default UsernameChange;
