import { useEffect, useState } from 'react';
import IconButton from './IconButton';
import { Settings } from 'lucide-react';
import PreferencesModal from '../PreferencesModal';

const PreferencesButton = ({ onModalStateChange, inGame = false }) => {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const openPreferences = () => {
    setIsPreferencesOpen(true);
  };

  const closePreferences = () => {
    setIsPreferencesOpen(false);
  };

  // Notify parent when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(isPreferencesOpen);
    }
  }, [isPreferencesOpen, onModalStateChange]);

  return (
    <>
      <IconButton
        onClick={openPreferences}
        icon={<Settings size={20} style={{ color: 'white' }} />}
        aria-label="Open Preferences"
        variant="preferences"
        title="Preferences"
        data-gamepad-focusable="true"
      />
      {/* Render the modal conditionally */}
      {isPreferencesOpen && (
        <PreferencesModal
          isOpen={isPreferencesOpen}
          onClose={closePreferences}
          defaultTab={inGame ? 'game' : 'profile'}
        />
      )}
    </>
  );
};

export default PreferencesButton;
