import IconButton from './common/IconButton';
import StoreIcon from './icons/StoreIcon';

const StoreButton = ({ onClick, ...props }) => {
  return (
    <IconButton
      onClick={onClick}
      icon={<StoreIcon style={{ color: 'white', width: 20, height: 20 }} />}
      aria-label="Store"
      variant="store"
      title="Store"
      {...props}
    />
  );
};

export default StoreButton;