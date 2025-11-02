
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
      icon={<DownloadIcon color="white" size={20} />}
      title={title}
      onClick={onClick}
      variant="default"
      {...restProps}
    />
  );
};

export default DownloadButton;
