

// frontend/src/components/Common/LoadingSpinner.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingSpinner = ({ size = 35, color = '#3b82f6' }) => {
  return (
    <div className="loading-spinner">
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default LoadingSpinner;