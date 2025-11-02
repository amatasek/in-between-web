import { useState } from 'react';
import BaseModal from './common/BaseModal';
import ToggleSwitch from './ToggleSwitch';
import GamepadInput from './GamepadInput';
import styles from './styles/GameSettingsModal.module.css';

const DEFAULT_SETTINGS = {
  useCustomName: false,
  customName: '',
  isPrivate: false,
  password: '',
  enableAceChoice: true,
  enableSecondChance: true,
  numberOfBots: 0,
  anteAmount: '',
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

    // Validate Number of Bots
    const botCount = currentSettings.numberOfBots;
    if (botCount < 0 || botCount > 16) {
      newErrors.numberOfBots = 'Number of bots must be between 0 and 16.';
    }

    // Validate Ante Amount (only if provided)
    const anteAmount = currentSettings.anteAmount;
    if (anteAmount !== '' && anteAmount !== null && anteAmount !== undefined) {
      const numericAmount = parseInt(anteAmount);
      if (isNaN(numericAmount) || numericAmount < 1 || numericAmount > 100) {
        newErrors.anteAmount = 'Ante amount must be between 1 and 100.';
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
    if (key === 'numberOfBots' && errors.numberOfBots) {
      setErrors(currentErrors => {
        const newErrors = { ...currentErrors };
        delete newErrors.numberOfBots;
        return newErrors;
      });
    }
    if (key === 'anteAmount' && errors.anteAmount) {
      setErrors(currentErrors => {
        const newErrors = { ...currentErrors };
        delete newErrors.anteAmount;
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
        anteAmount: settings.anteAmount === '' ? 1 : parseInt(settings.anteAmount), // Default to 1 if empty
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
            className="btn btn-secondary"
            data-gamepad-focusable="true"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="gameSettingsForm"
            className="btn btn-primary"
            disabled={Object.keys(errors).length > 0}
            data-gamepad-focusable="true"
          >
            Create Game
          </button>
        </div>
      }
    >
      <form id="gameSettingsForm" onSubmit={handleSubmit}>
          {/* Custom Game Name Setting */}
          <div className={`panel-alt ${styles.gameSettingItem}`}>
            <div className={styles.settingDescription}>
              <h4>Custom Game Name</h4>
              <p>Set a custom name for your game lobby</p>
            </div>
            <div className={styles.settingControls}>
              <ToggleSwitch
                isChecked={settings.useCustomName}
                onChange={e => handleChange('useCustomName', e.target.checked)}
              />
              {settings.useCustomName && (
                <GamepadInput
                  title="Enter Game Name"
                  type="text"
                  value={settings.customName || ''}
                  onChange={e => handleChange('customName', e.target.value)}
                  className={`${styles.textInput}${errors.customName ? ` ${  styles.inputError}` : ''}`}
                  placeholder="Game Name"
                  maxLength={26}
                  style={{ marginTop: 8 }}
                />
              )}
              {errors.customName && <span className="errorMessage">{errors.customName}</span>}
            </div>
          </div>

          {/* Private Game Setting */}
          <div className={`panel-alt ${styles.gameSettingItem}`}>
            <div className={styles.settingDescription}>
              <h4>Private Game</h4>
              <p>Only players with the password can join</p>
            </div>
            <div className={styles.settingControls}>
              <ToggleSwitch
                isChecked={settings.isPrivate}
                onChange={e => handleChange('isPrivate', e.target.checked)}
              />
              {settings.isPrivate && (
                <GamepadInput
                  title="Enter Game Password"
                  type="text"
                  value={settings.password || ''}
                  onChange={e => handleChange('password', e.target.value)}
                  className={`${styles.textInput}${errors.password ? ` ${  styles.inputError}` : ''}`}
                  placeholder="Password"
                  maxLength={36}
                  style={{ marginTop: 8 }}
                />
              )}
              {errors.password && <span className="errorMessage">{errors.password}</span>}
            </div>
          </div>

          {/* Number of Bots Setting */}
          <div className={`panel-alt ${styles.gameSettingItem}`}>
            <div className={styles.settingDescription}>
              <h4>Number of Bots</h4>
              <p>Add AI players to your game (0-16)</p>
            </div>
            <div className={styles.settingControls}>
              <GamepadInput
                title="Number of AI Players"
                type="number"
                min="0"
                max="16"
                value={settings.numberOfBots === 0 ? '' : settings.numberOfBots}
                onChange={e => handleChange('numberOfBots', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                className={`${styles.textInput} no-validation${errors.numberOfBots ? ` ${  styles.inputError}` : ''}`}
                placeholder="0"
              />
              {errors.numberOfBots && <span className="errorMessage">{errors.numberOfBots}</span>}
            </div>
          </div>

          {/* Ante Amount Setting */}
          <div className={`panel-alt ${styles.gameSettingItem}`}>
            <div className={styles.settingDescription}>
              <h4>Ante Amount</h4>
              <p>Set the ante amount for each round (1-100)</p>
            </div>
            <div className={styles.settingControls}>
              <GamepadInput
                title="Ante Amount"
                type="number"
                min="1"
                max="100"
                value={settings.anteAmount}
                onChange={e => handleChange('anteAmount', e.target.value)}
                className={`${styles.textInput} no-validation${errors.anteAmount ? ` ${  styles.inputError}` : ''}`}
                placeholder="1"
              />
              {errors.anteAmount && <span className="errorMessage">{errors.anteAmount}</span>}
            </div>
          </div>

          {/* Ace Choice Setting */}
          <div className={`panel-alt ${styles.gameSettingItem}`}>
            <div className={styles.settingDescription}>
              <h4>Enable Ace Choice</h4>
              <p>Allow players to choose high/low on Ace</p>
            </div>
            <div className={styles.settingControls}>
              <ToggleSwitch
                isChecked={settings.enableAceChoice}
                onChange={e => handleChange('enableAceChoice', e.target.checked)}
              />
            </div>
          </div>

          {/* Second Chance Setting */}
          <div className={`panel-alt ${styles.gameSettingItem}`}>
            <div className={styles.settingDescription}>
              <h4>Enable Second Chance</h4>
              <p>Allow players to ante up for a second chance</p>
            </div>
            <div className={styles.settingControls}>
              <ToggleSwitch
                isChecked={settings.enableSecondChance}
                onChange={e => handleChange('enableSecondChance', e.target.checked)}
              />
            </div>
          </div>
      </form>
    </BaseModal>
  );
};

export default GameSettingsModal;
