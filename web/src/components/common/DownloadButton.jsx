import IconButton from './IconButton';
import { Download } from 'lucide-react';

/**
 * A standardized download button component
 *
 * @param {Object} props Component props
 * @param {function} props.onClick Handler for when the button is clicked
 * @param {string} props.title Custom tooltip text (optional)
 */
const DownloadButton = ({
  onClick,
  title = "Download",
  ...restProps
}) => {
  return (
    <IconButton
      icon={<Download size={20} style={{ color: 'white' }} />}
      title={title}
      onClick={onClick}
      variant="default"
      {...restProps}
    />
  );
};

export default DownloadButton;
