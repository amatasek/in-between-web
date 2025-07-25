import React, { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch.jsx';
import lobbyStyles from './styles/Lobby.module.css';
import BaseModal from './common/BaseModal';
import baseModalStyles from './common/BaseModal.module.css';

const DEFAULT_SETTINGS = {
  useCustomName: false,
  customName: '',
  isPrivate: false,
  password: '',
  enableAceChoice: true,
  enableSecondChance: true,
};

const GameSettingsModal = ({ initialSettings = DEFAULT_SETTINGS, onSubmit, onClose }) => {
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS, ...initialSettings });
  const [errors, setErrors] = useState({});

  // Validation logic
  const validateSettings = (currentSettings) => {
    const newErrors = {};

    // Validate Custom Name
    if (currentSettings.useCustomName) {
      const name = currentSettings.customName || '';
      if (!name) {
        newErrors.customName = 'Custom name is required.';
      } else if (name.length < 4 || name.length > 26) {
        newErrors.customName = 'Name must be 4-26 characters.';
      } else if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
        newErrors.customName = 'Use letters, numbers, -, or _.';
      }
    }

    // Validate Password
    if (currentSettings.isPrivate) {
      const pass = currentSettings.password || '';
      if (!pass) {
        newErrors.password = 'Password is required.';
      } else if (pass.length < 3 || pass.length > 36) {
        newErrors.password = 'Password must be 3-36 characters.';
      }
    }
    return newErrors;
  };

  const handleChange = (key, value) => {
    setSettings(prev => {
      const updatedSettings = { ...prev, [key]: value };

      // Clear customName and its error if useCustomName is turned off
      if (key === 'useCustomName' && !value) {
        updatedSettings.customName = '';
        if (errors.customName) {
          setErrors(currentErrors => {
            const newErrors = { ...currentErrors };
            delete newErrors.customName;
            return newErrors;
          });
        }
      }

      // Clear password and its error if private is turned off
      if (key === 'isPrivate' && !value) {
        updatedSettings.password = '';
        if (errors.password) {
          setErrors(currentErrors => {
            const newErrors = { ...currentErrors };
            delete newErrors.password;
            return newErrors;
          });
        }
      }
      return updatedSettings;
    });

    // Clear specific error when user starts typing/toggling again
    if ((key === 'customName' || key === 'useCustomName') && errors.customName) {
      setErrors(currentErrors => {
        const newErrors = { ...currentErrors };
        delete newErrors.customName;
        return newErrors;
      });
    }
    if ((key === 'password' || key === 'isPrivate') && errors.password) {
      setErrors(currentErrors => {
        const newErrors = { ...currentErrors };
        delete newErrors.password;
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSettings(settings);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({}); // Clear errors on successful submit
      // Prepare the payload for submission
      const payload = {
        ...settings,
        customName: settings.useCustomName ? settings.customName : null,
      };
      delete payload.useCustomName; // Remove the toggle state key

      onSubmit(payload);
    }
  };

  return (
    <BaseModal
      title="Game Options"
      onClose={onClose}
      style={{ maxWidth: 600 }}
      footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={onClose}
            className={`${lobbyStyles.actionButton} ${lobbyStyles.cancelButton || ''}`}
            data-gamepad-focusable="true"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="gameSettingsForm"
            className={`${lobbyStyles.actionButton} ${lobbyStyles.createButton}`}
            disabled={Object.keys(errors).length > 0}
            data-gamepad-focusable="true"
          >
            Create Game
          </button>
        </div>
      }
    >
      <form id="gameSettingsForm" onSubmit={handleSubmit}>
        <div className={baseModalStyles.settingsContainer}>
          {/* Custom Game Name Setting */}
          <div className={baseModalStyles.settingItem}>
            <div className={baseModalStyles.settingDescription}>
              <h4>Custom Game Name</h4>
              <p>Set a custom name for your game lobby</p>
            </div>
            <div className={baseModalStyles.settingControls}>
              <ToggleSwitch
                isChecked={settings.useCustomName}
                onChange={e => handleChange('useCustomName', e.target.checked)}
              />
              {settings.useCustomName && (
                <input
                  type="text"
                  value={settings.customName || ''}
                  onChange={e => handleChange('customName', e.target.value)}
                  className={`${baseModalStyles.textInput}${errors.customName ? ' ' + baseModalStyles.inputError : ''}`}
                  placeholder="Game Name"
                  maxLength={26}
                  autoFocus
                  style={{ marginTop: 8 }}
                  data-gamepad-focusable="true"
                />
              )}
              {errors.customName && <span className="errorMessage">{errors.customName}</span>}
            </div>
          </div>

          {/* Private Game Setting */}
          <div className={baseModalStyles.settingItem}>
            <div className={baseModalStyles.settingDescription}>
              <h4>Private Game</h4>
              <p>Only players with the password can join</p>
            </div>
            <div className={baseModalStyles.settingControls}>
              <ToggleSwitch
                isChecked={settings.isPrivate}
                onChange={e => handleChange('isPrivate', e.target.checked)}
              />
              {settings.isPrivate && (
                <input
                  type="text"
                  value={settings.password || ''}
                  onChange={e => handleChange('password', e.target.value)}
                  className={`${baseModalStyles.textInput}${errors.password ? ' ' + baseModalStyles.inputError : ''}`}
                  placeholder="Password"
                  maxLength={36}
                  autoFocus={settings.isPrivate && !settings.useCustomName}
                  style={{ marginTop: 8 }}
                  data-gamepad-focusable="true"
                />
              )}
              {errors.password && <span className="errorMessage">{errors.password}</span>}
            </div>
          </div>

          {/* Ace Choice Setting */}
          <div className={baseModalStyles.settingItem}>
            <div className={baseModalStyles.settingDescription}>
              <h4>Enable Ace Choice</h4>
              <p>Allow players to choose high/low on Ace</p>
            </div>
            <div className={baseModalStyles.settingControls}>
              <ToggleSwitch
                isChecked={settings.enableAceChoice}
                onChange={e => handleChange('enableAceChoice', e.target.checked)}
              />
            </div>
          </div>

          {/* Second Chance Setting */}
          <div className={baseModalStyles.settingItem}>
            <div className={baseModalStyles.settingDescription}>
              <h4>Enable Second Chance</h4>
              <p>Allow players to ante up for a second chance</p>
            </div>
            <div className={baseModalStyles.settingControls}>
              <ToggleSwitch
                isChecked={settings.enableSecondChance}
                onChange={e => handleChange('enableSecondChance', e.target.checked)}
              />
            </div>
          </div>
        </div>
      </form>
    </BaseModal>
  );
};

export default GameSettingsModal;
