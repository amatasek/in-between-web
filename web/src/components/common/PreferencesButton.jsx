import React, { useState } from 'react';
import GearIcon from '../icons/GearIcon';
import PreferencesModal from '../PreferencesModal';
import IconButton from './IconButton';

const PreferencesButton = () => {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const openPreferences = () => {
    setIsPreferencesOpen(true);
  };

  const closePreferences = () => {
    setIsPreferencesOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={openPreferences}
        icon={<GearIcon style={{ color: 'white', width: 20, height: 20 }} />}
        aria-label="Open Preferences"
        variant="preferences"
        title="Preferences"
        data-gamepad-focusable="true"
      />
      {/* Render the modal conditionally */}
      {isPreferencesOpen && <PreferencesModal isOpen={isPreferencesOpen} onClose={closePreferences} />}
    </>
  );
};

export default PreferencesButton;
