import React from 'react';

const StoreIcon = ({ className = 'h-6 w-6', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      {...props}
    >
      {/* Shopping bag */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m-2.25 9h12a1.5 1.5 0 001.5-1.5v-6a1.5 1.5 0 00-1.5-1.5h-12a1.5 1.5 0 00-1.5 1.5v6a1.5 1.5 0 001.5 1.5z"
      />
    </svg>
  );
};

export default StoreIcon;