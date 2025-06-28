import React from 'react';
import StoreIcon from './icons/StoreIcon';
import IconButton from './common/IconButton';

const StoreButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      icon={<StoreIcon style={{ color: 'white', width: 20, height: 20 }} />}
      aria-label="Store"
      variant="store"
      title="Store"
    />
  );
};

export default StoreButton;