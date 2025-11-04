import IconButton from './common/IconButton';
import { ShoppingBag } from 'lucide-react';

const StoreButton = ({ onClick, ...props }) => {
  return (
    <IconButton
      onClick={onClick}
      icon={<ShoppingBag size={20} style={{ color: 'white' }} />}
      aria-label="Store"
      variant="store"
      title="Store"
      {...props}
    />
  );
};

export default StoreButton;